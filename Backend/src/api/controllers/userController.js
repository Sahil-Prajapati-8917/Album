const authService = require('../../core/services/AuthService');
const userRepository = require('../../data/repositories/UserRepository');

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { user, token } = await authService.registerUser(req.body);

    res.status(201).json({
      success: true,
      data: {
        user,
        token
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Server error during registration'
    });
  }
};

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.loginUser(email, password);

    res.json({
      success: true,
      data: {
        user,
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Server error during login'
    });
  }
};

// @desc    Admin login
// @route   POST /api/users/admin-login
// @access  Public
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.adminLogin(email, password);

    res.json({
      success: true,
      data: { user, token }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(error.statusCode || 500).json({ 
        success: false, 
        message: error.message || 'Server error' 
    });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = await userRepository.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching profile'
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const user = await userRepository.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Whitelist allowed update fields
    const allowedFields = [
      'personalName', 'studioName', 'mobileNumber', 'address',
      'profilePicture', 'socialMedia', 'city', 'state', 'country', 'district'
    ];

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        if (field === 'socialMedia') {
          user.socialMedia = {
            ...user.socialMedia,
            ...req.body.socialMedia
          };
        } else {
          user[field] = req.body[field];
        }
      }
    }

    await user.save();

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating profile'
    });
  }
};

// @desc    Get current user (for frontend state)
// @route   GET /api/users/me
// @access  Private
const getMe = async (req, res) => {
  try {
    res.json({
      success: true,
      data: req.user
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  adminLogin,
  getUserProfile,
  updateUserProfile,
  getMe
};
