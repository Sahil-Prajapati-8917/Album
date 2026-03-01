const localDiskStorageService = require('./LocalDiskStorageService');

/**
 * Storage Service Factory
 * Returns the configured storage provider based on environment variables.
 */
function getStorageProvider() {
    const provider = process.env.STORAGE_PROVIDER || 'local';

    switch (provider.toLowerCase()) {
        case 's3':
            try {
                return require('./S3StorageService');
            } catch (error) {
                console.error('Failed to load S3StorageService, falling back to local disk:', error);
                return localDiskStorageService;
            }
        case 'local':
        default:
            return localDiskStorageService;
    }
}

module.exports = getStorageProvider();
