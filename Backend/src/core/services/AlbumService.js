const albumRepository = require('../../data/repositories/AlbumRepository');
const userRepository = require('../../data/repositories/UserRepository');
const crypto = require('crypto');
const storageService = require('../../infrastructure/storage');

class AlbumService {
    // ... rest of the code, but replace uuidv4() call
    async createAlbum(userId, albumData, files) {
        let {
            clientName,
            functionDate,
            functionType,
            photographerId,
            songName,
            musicUrl,
            musicStartTime,
            frontCover,
            backCover,
            totalSheets
        } = albumData;

        // Process uploaded files if files exist
        let innerSheetsUrls = [];
        if (files) {
            if (files.frontCover && files.frontCover[0]) {
                frontCover = await storageService.uploadFile(files.frontCover[0]);
            }
            if (files.backCover && files.backCover[0]) {
                backCover = await storageService.uploadFile(files.backCover[0]);
            }
        }

        // Handle innerSheets (mix of new files and existing URLs)
        if (albumData.innerSheetsOrder || (files && files.innerSheets)) {
            let newInnerSheets = files ? (files.innerSheets || []) : [];
            let existingInnerSheets = albumData.existingInnerSheets || [];
            let order = albumData.innerSheetsOrder || [];

            // Ensure they are arrays
            if (!Array.isArray(existingInnerSheets)) existingInnerSheets = [existingInnerSheets];
            if (!Array.isArray(order)) order = [order];

            let fileIndex = 0;
            let urlIndex = 0;

            for (const type of order) {
                if (type === 'FILE') {
                    if (newInnerSheets[fileIndex]) {
                        const url = await storageService.uploadFile(newInnerSheets[fileIndex++]);
                        innerSheetsUrls.push(url);
                    }
                } else if (type === 'URL') {
                    if (existingInnerSheets[urlIndex]) {
                        innerSheetsUrls.push(existingInnerSheets[urlIndex++]);
                    }
                }
            }

            // Fallback for older clients
            if (order.length === 0 && newInnerSheets.length > 0) {
                for (const file of newInnerSheets) {
                    const url = await storageService.uploadFile(file);
                    innerSheetsUrls.push(url);
                }
            }
        }

        // Generate spreads from innerSheetsUrls
        const spreads = [];
        for (let i = 0; i < innerSheetsUrls.length; i += 2) {
            spreads.push({
                id: Math.floor(i / 2) + 1,
                leftPage: { image: innerSheetsUrls[i] || null, caption: "" },
                rightPage: { image: innerSheetsUrls[i + 1] || null, caption: "" }
            });
        }

        const calculatedTotalSheets = innerSheetsUrls.length;
        const requiredCredits = 1; // Assuming 1 credit per album based on original logic

        // ATOMIC credit deduction — prevents race condition (BILL-02)
        // Only deducts if credits > requiredCredits; returns null if insufficient
        const user = await userRepository.findOneAndUpdate(
            {
                _id: userId,
                credits: { $gte: requiredCredits },
                // Also check credit validity (BILL-06)
                $or: [
                    { creditValidity: { $gte: new Date() } },
                    { creditValidity: null },
                    { creditValidity: { $exists: false } }
                ]
            },
            { $inc: { credits: -requiredCredits } },
            { new: true }
        );

        if (!user) {
            const error = new Error('Insufficient credits or credits expired. Please recharge.');
            error.statusCode = 403;
            throw error;
        }

        // Generate unique album ID using crypto randomBytes (ALB-02)
        const albumId = `PF-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;

        try {
            const album = await albumRepository.create({
                albumId,
                clientName,
                functionDate,
                functionType,
                photographerId: photographerId === 'none' ? null : photographerId,
                userId: userId,
                songName,
                musicUrl,
                musicStartTime,
                frontCover,
                backCover,
                spreads,
                totalSheets: totalSheets || calculatedTotalSheets
            });

            return album;
        } catch (error) {
            // Rollback the credit deduction if album creation fails
            await userRepository.findByIdAndUpdate(userId, { $inc: { credits: requiredCredits } });
            throw error;
        }
    }

    async getMyAlbums(userId, page = 1, limit = 50) {
        const skip = (page - 1) * limit;

        const [albums, total] = await Promise.all([
            albumRepository.find(
                { userId },
                { select: '-spreads', sort: { createdAt: -1 }, skip, limit }
            ),
            albumRepository.countDocuments({ userId })
        ]);

        return {
            albums,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        };
    }

    async getAlbumById(albumId) {
        // ATOMIC view increment (PERF-01) — single DB operation instead of read+write
        const album = await albumRepository.findOneAndUpdate(
            { albumId },
            { $inc: { views: 1 } },
            { 
                new: true,
                populate: [
                    { path: 'photographerId', select: 'name mobile city state address status' },
                    { path: 'userId', select: 'studioName personalName mobileNumber city' }
                ]
            }
        );

        if (!album) {
            const error = new Error('Album not found');
            error.statusCode = 404;
            throw error;
        }

        return album;
    }

    async updateAlbum(albumId, userId, albumData, files) {
        // First verify ownership
        const existingAlbum = await albumRepository.findOne({ albumId, userId });
        if (!existingAlbum) {
            const error = new Error('Album not found or unauthorized');
            error.statusCode = 404;
            throw error;
        }

        // Whitelist only allowed fields — prevents userId override & prototype pollution
        const allowedFields = [
            'clientName', 'functionDate', 'functionType', 'photographerId',
            'songName', 'musicUrl', 'musicStartTime', 'frontCover', 'backCover', 'totalSheets',
            'status', 'priority', 'label'
        ];

        const sanitizedUpdates = {};
        for (const field of allowedFields) {
            if (albumData[field] !== undefined) {
                sanitizedUpdates[field] = albumData[field];
            }
        }

        // Process uploaded files for updates
        let innerSheetsUrls = [];
        if (files) {
            if (files.frontCover && files.frontCover[0]) {
                sanitizedUpdates.frontCover = await storageService.uploadFile(files.frontCover[0]);
            }
            if (files.backCover && files.backCover[0]) {
                sanitizedUpdates.backCover = await storageService.uploadFile(files.backCover[0]);
            }
        }

        // Handle innerSheets (mix of new files and existing URLs)
        if (albumData.innerSheetsOrder || (files && files.innerSheets)) {
            let newInnerSheets = files ? (files.innerSheets || []) : [];
            let existingInnerSheets = albumData.existingInnerSheets || [];
            let order = albumData.innerSheetsOrder || [];

            // Ensure they are arrays
            if (!Array.isArray(existingInnerSheets)) existingInnerSheets = [existingInnerSheets];
            if (!Array.isArray(order)) order = [order];

            let fileIndex = 0;
            let urlIndex = 0;

            for (const type of order) {
                if (type === 'FILE') {
                    if (newInnerSheets[fileIndex]) {
                        const url = await storageService.uploadFile(newInnerSheets[fileIndex++]);
                        innerSheetsUrls.push(url);
                    }
                } else if (type === 'URL') {
                    if (existingInnerSheets[urlIndex]) {
                        innerSheetsUrls.push(existingInnerSheets[urlIndex++]);
                    }
                }
            }

            // Fallback for older clients
            if (order.length === 0 && newInnerSheets.length > 0) {
                for (const file of newInnerSheets) {
                    const url = await storageService.uploadFile(file);
                    innerSheetsUrls.push(url);
                }
            }

            // Update the spreads
            const spreads = [];
            for (let i = 0; i < innerSheetsUrls.length; i += 2) {
                spreads.push({
                    id: Math.floor(i / 2) + 1,
                    leftPage: { image: innerSheetsUrls[i] || null, caption: "" },
                    rightPage: { image: innerSheetsUrls[i + 1] || null, caption: "" }
                });
            }
            sanitizedUpdates.spreads = spreads;
        }

        if (sanitizedUpdates.photographerId === 'none') {
            sanitizedUpdates.photographerId = null;
        }

        const album = await albumRepository.findOneAndUpdate(
            { albumId, userId },
            sanitizedUpdates,
            { new: true, runValidators: true }
        );

        return album;
    }

    async deleteAlbum(albumId, userId) {
        const album = await albumRepository.findOneAndDelete({ albumId, userId });
        if (!album) {
            const error = new Error('Album not found or unauthorized');
            error.statusCode = 404;
            throw error;
        }
        return album;
    }
}

module.exports = new AlbumService();
