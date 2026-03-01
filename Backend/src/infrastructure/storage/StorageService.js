class StorageService {
    /**
     * Uploads a file and returns its access URL or path
     * @param {Object} file - A file object (e.g., from multer.memoryStorage)
     * @returns {Promise<string>} The URL or path to access the file
     */
    async uploadFile(file) {
        throw new Error('Method not implemented');
    }

    /**
     * Deletes a file given its URL or path
     * @param {string} filePath - The URL or path of the file to delete
     * @returns {Promise<void>}
     */
    async deleteFile(filePath) {
        throw new Error('Method not implemented');
    }
}

module.exports = StorageService;
