const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
    createAlbum,
    getMyAlbums,
    getAlbumById,
    updateAlbum,
    deleteAlbum
} = require('../controllers/albumController');

router.route('/')
    .post(protect, createAlbum)
    .get(protect, getMyAlbums);

router.route('/:id')
    .get(getAlbumById) // Public view doesn't necessarily need protect if it's via ID
    .put(protect, updateAlbum)
    .delete(protect, deleteAlbum);

module.exports = router;
