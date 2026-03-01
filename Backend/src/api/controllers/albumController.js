const albumService = require('../../core/services/AlbumService');

// Create new album
exports.createAlbum = async (req, res) => {
    try {
        const album = await albumService.createAlbum(req.user.id, req.body, req.files);
        res.status(201).json({
            success: true,
            message: 'Album created successfully',
            data: album
        });
    } catch (error) {
        console.error('Create Album Error:', error);
        res.status(error.statusCode || 500).json({ 
            success: false, 
            message: error.message || 'Server error' 
        });
    }
};

// Get all albums for logged in user
exports.getMyAlbums = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;

        const result = await albumService.getMyAlbums(req.user.id, page, limit);

        res.status(200).json({
            success: true,
            data: result.albums,
            pagination: result.pagination
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({ 
            success: false, 
            message: error.message || 'Server error' 
        });
    }
};

// Get single album by ID
exports.getAlbumById = async (req, res) => {
    try {
        const album = await albumService.getAlbumById(req.params.id);

        res.status(200).json({
            success: true,
            data: album
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({ 
            success: false, 
            message: error.message || 'Server error' 
        });
    }
};

// Update album
exports.updateAlbum = async (req, res) => {
    try {
        const album = await albumService.updateAlbum(req.params.id, req.user.id, req.body, req.files);

        res.status(200).json({
            success: true,
            message: 'Album updated successfully',
            data: album
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({ 
            success: false, 
            message: error.message || 'Server error' 
        });
    }
};

// Delete album
exports.deleteAlbum = async (req, res) => {
    try {
        await albumService.deleteAlbum(req.params.id, req.user.id);

        res.status(200).json({
            success: true,
            message: 'Album deleted successfully'
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({ 
            success: false, 
            message: error.message || 'Server error' 
        });
    }
};
