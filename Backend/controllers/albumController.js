const Album = require('../models/Album');
const User = require('../models/User');

// Create new album
exports.createAlbum = async (req, res) => {
    try {
        const {
            clientName,
            functionDate,
            functionType,
            photographerId,
            songName,
            frontCover,
            backCover,
            spreads,
            totalSheets
        } = req.body;

        // Check user credits
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (user.credits <= 0) {
            return res.status(403).json({ success: false, message: 'Insufficient credits. Please recharge.' });
        }

        const albumId = `ALBUM-${Date.now().toString().slice(-4)}`;

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

        // Decrement user credits
        user.credits -= 1;
        await user.save();

        res.status(201).json({
            success: true,
            message: 'Album created successfully',
            data: album
        });
    } catch (error) {
        console.error('Create Album Error:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// Get all albums for logged in user
exports.getMyAlbums = async (req, res) => {
    try {
        const albums = await Album.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: albums
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// Get single album by ID (public or private)
exports.getAlbumById = async (req, res) => {
    try {
        const album = await Album.findOne({ albumId: req.params.id });
        if (!album) {
            return res.status(404).json({ success: false, message: 'Album not found' });
        }

        // Increment views
        album.views += 1;
        await album.save();

        res.status(200).json({
            success: true,
            data: album
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// Update album
exports.updateAlbum = async (req, res) => {
    try {
        let album = await Album.findOne({ albumId: req.params.id, userId: req.user.id });
        if (!album) {
            return res.status(404).json({ success: false, message: 'Album not found or unauthorized' });
        }

        const updates = req.body;
        if (updates.photographerId === 'none') updates.photographerId = null;

        album = await Album.findOneAndUpdate(
            { albumId: req.params.id },
            updates,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: 'Album updated successfully',
            data: album
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
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
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};
