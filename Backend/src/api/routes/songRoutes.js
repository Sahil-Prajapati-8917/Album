const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');
const { protect } = require('../../common/middleware/auth');

router.get('/search', protect, songController.search);
router.post('/download', protect, songController.download);

module.exports = router;