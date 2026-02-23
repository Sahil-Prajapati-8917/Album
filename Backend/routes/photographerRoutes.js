const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
    createPhotographer,
    getMyPhotographers,
    updatePhotographer,
    deletePhotographer
} = require('../controllers/photographerController');

router.route('/')
    .post(protect, createPhotographer)
    .get(protect, getMyPhotographers);

router.route('/:id')
    .put(protect, updatePhotographer)
    .delete(protect, deletePhotographer);

module.exports = router;
