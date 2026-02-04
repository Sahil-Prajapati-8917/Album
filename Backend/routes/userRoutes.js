const express = require('express');
const { protect } = require('../middleware/auth');
const {
  validateRegistration,
  validateLogin,
  validateProfileUpdate,
  rateLimit
} = require('../middleware/validation');
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getMe
} = require('../controllers/userController');

 
const router = express.Router();

// Public routes with validation and rate limiting
router.post('/register', rateLimit(5, 15 * 60 * 1000), validateRegistration, registerUser);
router.post('/login', rateLimit(10, 15 * 60 * 1000), validateLogin, loginUser);

// Protected routes with validation
router.get('/me', protect, getMe);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, validateProfileUpdate, updateUserProfile);

module.exports = router;
