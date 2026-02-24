const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { validateAlbumCreation, rateLimit } = require('../middleware/validation');
const {
    createAlbum,
    getMyAlbums,
    getAlbumById,
    updateAlbum,
    deleteAlbum
} = require('../controllers/albumController');

router.route('/')
    .post(protect, rateLimit(30, 60 * 1000), validateAlbumCreation, createAlbum) // Max 30 albums/min
    .get(protect, getMyAlbums);

router.route('/:id')
    .get(getAlbumById) // Public view for album viewers
    .put(protect, validateAlbumCreation, updateAlbum)
    .delete(protect, deleteAlbum);

module.exports = router;
