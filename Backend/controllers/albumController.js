const Album = require('../models/Album');
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');

// Create new album — with ATOMIC credit deduction
exports.createAlbum = async (req, res) => {
    try {
        let {
            clientName,
            functionDate,
            functionType,
            photographerId,
            songName,
            frontCover,
            backCover,
            totalSheets
        } = req.body;

        // Process uploaded files if req.files exists
        let innerSheetsUrls = [];
        if (req.files) {
            if (req.files.frontCover && req.files.frontCover[0]) {
                frontCover = `/uploads/albums/${req.files.frontCover[0].filename}`;
            }
            if (req.files.backCover && req.files.backCover[0]) {
                backCover = `/uploads/albums/${req.files.backCover[0].filename}`;
            }
            if (req.files.innerSheets && req.files.innerSheets.length > 0) {
                innerSheetsUrls = req.files.innerSheets.map(file => `/uploads/albums/${file.filename}`);
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

        // ATOMIC credit deduction — prevents race condition (BILL-02)
        // Only deducts if credits > 0; returns null if insufficient
        const user = await User.findOneAndUpdate(
            {
                _id: req.user.id,
                credits: { $gt: 0 },
                // Also check credit validity (BILL-06)
                $or: [
                    { creditValidity: { $gte: new Date() } },
                    { creditValidity: null },
                    { creditValidity: { $exists: false } }
                ]
            },
            { $inc: { credits: -1 } },
            { new: true }
        );

        if (!user) {
            return res.status(403).json({
                success: false,
                message: 'Insufficient credits or credits expired. Please recharge.'
            });
        }

        // Generate unique album ID using UUID (ALB-02)
        const albumId = `PF-${uuidv4().split('-')[0].toUpperCase()}`;

        const album = new Album({
            albumId,
            clientName,
            functionDate,
            functionType,
            photographerId: photographerId === 'none' ? null : photographerId,
            userId: req.user.id,
            songName,
            frontCover,
            backCover,
            spreads,
            totalSheets
        });

        await album.save();

        res.status(201).json({
            success: true,
            message: 'Album created successfully',
            data: album
        });
    } catch (error) {
        console.error('Create Album Error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get all albums for logged in user — with pagination (PERF-04)
exports.getMyAlbums = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const skip = (page - 1) * limit;

        // Exclude spreads from list response for performance (PERF-05)
        const [albums, total] = await Promise.all([
            Album.find({ userId: req.user.id })
                .select('-spreads')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            Album.countDocuments({ userId: req.user.id })
        ]);

        res.status(200).json({
            success: true,
            data: albums,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get single album by ID (public for viewing, but no owner-sensitive data)
exports.getAlbumById = async (req, res) => {
    try {
        // ATOMIC view increment (PERF-01) — single DB operation instead of read+write
        const album = await Album.findOneAndUpdate(
            { albumId: req.params.id },
            { $inc: { views: 1 } },
            { new: true }
        );

        if (!album) {
            return res.status(404).json({ success: false, message: 'Album not found' });
        }

        res.status(200).json({
            success: true,
            data: album
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Update album — with field whitelist (ALB-03)
exports.updateAlbum = async (req, res) => {
    try {
        // First verify ownership
        const existingAlbum = await Album.findOne({ albumId: req.params.id, userId: req.user.id });
        if (!existingAlbum) {
            return res.status(404).json({ success: false, message: 'Album not found or unauthorized' });
        }

        // Whitelist only allowed fields — prevents userId override & prototype pollution
        const allowedFields = [
            'clientName', 'functionDate', 'functionType', 'photographerId',
            'songName', 'frontCover', 'backCover', 'totalSheets',
            'status', 'priority', 'label'
        ];

        const sanitizedUpdates = {};
        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                sanitizedUpdates[field] = req.body[field];
            }
        }

        // Process uploaded files for updates
        let innerSheetsUrls = [];
        if (req.files) {
            if (req.files.frontCover && req.files.frontCover[0]) {
                sanitizedUpdates.frontCover = `/uploads/albums/${req.files.frontCover[0].filename}`;
            }
            if (req.files.backCover && req.files.backCover[0]) {
                sanitizedUpdates.backCover = `/uploads/albums/${req.files.backCover[0].filename}`;
            }
            if (req.files.innerSheets && req.files.innerSheets.length > 0) {
                innerSheetsUrls = req.files.innerSheets.map(file => `/uploads/albums/${file.filename}`);

                // If new inner sheets are provided, update the spreads
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
        }

        if (sanitizedUpdates.photographerId === 'none') {
            sanitizedUpdates.photographerId = null;
        }

        const album = await Album.findOneAndUpdate(
            { albumId: req.params.id, userId: req.user.id },
            sanitizedUpdates,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: 'Album updated successfully',
            data: album
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Delete album
exports.deleteAlbum = async (req, res) => {
    try {
        const album = await Album.findOneAndDelete({ albumId: req.params.id, userId: req.user.id });
        if (!album) {
            return res.status(404).json({ success: false, message: 'Album not found or unauthorized' });
        }

        res.status(200).json({
            success: true,
            message: 'Album deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
