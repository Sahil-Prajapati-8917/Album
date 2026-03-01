const express = require('express');
const { protect } = require('../../common/middleware/auth');
const {
  validateRegistration,
  validateLogin,
  validateProfileUpdate,
  rateLimit
} = require('../../common/middleware/validation');
const {
  registerUser,
  loginUser,
  adminLogin,
  getUserProfile,
  updateUserProfile,
  getMe
} = require('../controllers/userController');


const router = express.Router();

// Public routes with validation and rate limiting
router.post('/register', rateLimit(5, 15 * 60 * 1000), validateRegistration, registerUser);
router.post('/login', rateLimit(10, 15 * 60 * 1000), validateLogin, loginUser);
router.post('/admin-login', rateLimit(3, 15 * 60 * 1000), validateLogin, adminLogin);

// Protected routes with validation
router.get('/me', protect, getMe);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, validateProfileUpdate, updateUserProfile);

module.exports = router;
