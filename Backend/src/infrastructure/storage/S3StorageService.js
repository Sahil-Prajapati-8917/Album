const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const path = require('path');
const StorageService = require('./StorageService');

class S3StorageService extends StorageService {
    constructor() {
        super();
        const region = process.env.AWS_REGION || 'us-east-1';
        
        // Configuration for S3 Client
        // Note: If credentials are not provided, it will look for environment variables 
        // AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY automatically.
        const config = {
            region,
        };

        // For local development with MinIO or LocalStack
        if (process.env.AWS_ENDPOINT) {
            config.endpoint = process.env.AWS_ENDPOINT;
            config.forcePathStyle = true;
        }

        this.s3Client = new S3Client(config);
        this.bucketName = process.env.AWS_BUCKET_NAME;
    }

    async uploadFile(file) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        const filename = `albums/album-${uniqueSuffix}${ext}`;

        try {
            const upload = new Upload({
                client: this.s3Client,
                params: {
                    Bucket: this.bucketName,
                    Key: filename,
                    Body: file.buffer,
                    ContentType: file.mimetype,
                },
            });

            await upload.done();

            // Return the S3 URL
            // If using a custom domain or CloudFront, this could be structured differently
            if (process.env.CLOUDFRONT_URL) {
                return `${process.env.CLOUDFRONT_URL}/${filename}`;
            }
            
            return `https://${this.bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${filename}`;
        } catch (error) {
            console.error('S3 Upload Error:', error);
            throw new Error('Failed to upload file to S3');
        }
    }

    async deleteFile(filePath) {
        try {
            // Extract the key from the URL
            // This assumes the filePath is a full URL or contains the key at the end
            // A more robust way would be to store the key in the database
            const key = filePath.split(`${this.bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/`)[1] 
                       || filePath.split(`${process.env.CLOUDFRONT_URL}/`)[1]
                       || filePath.split('albums/')[1] ? `albums/${filePath.split('albums/')[1]}` : null;

            if (!key) {
                console.warn('Could not extract S3 key from filePath:', filePath);
                return;
            }

            const command = new DeleteObjectCommand({
                Bucket: this.bucketName,
                Key: key,
            });

            await this.s3Client.send(command);
        } catch (error) {
            console.error('S3 Delete Error:', error);
            // We don't necessarily want to throw here to avoid breaking the delete flow 
            // if the file is already gone or permissions changed
        }
    }
}

module.exports = new S3StorageService();
