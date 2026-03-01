const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const StorageService = require('./StorageService');

const writeFileAsync = promisify(fs.writeFile);
const unlinkAsync = promisify(fs.unlink);

class LocalDiskStorageService extends StorageService {
    constructor() {
        super();
        this.uploadDir = path.join(__dirname, '..', '..', '..', 'uploads', 'albums');
        if (!fs.existsSync(this.uploadDir)) {
            fs.mkdirSync(this.uploadDir, { recursive: true });
        }
    }

    async uploadFile(file) {
        // file is expected to be a multer memory storage file object: 
        // { originalname, buffer, mimetype, ... }
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        const filename = `album-${uniqueSuffix}${ext}`;
        const filePath = path.join(this.uploadDir, filename);

        await writeFileAsync(filePath, file.buffer);

        // Return the path that the client will use to access the file
        return `/uploads/albums/${filename}`;
    }

    async deleteFile(filePath) {
        try {
            // Extact filename from the URL path, e.g., /uploads/albums/album-123.jpg -> album-123.jpg
            const filename = path.basename(filePath);
            const fullPath = path.join(this.uploadDir, filename);
            if (fs.existsSync(fullPath)) {
                await unlinkAsync(fullPath);
            }
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    }
}

// Export an instance by default to be used as a singleton service
module.exports = new LocalDiskStorageService();
