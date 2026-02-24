const User = require('../models/User');
const { generateToken } = require('../middleware/auth');
const { normalizeEmail, sanitizeString } = require('../middleware/validation');

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const {
      email,
      password,
      personalName,
      accountType, // 'photographer' | 'lab'
      // Common location fields
      city,
      state,
      country,
      district,
      // Photographer fields
      studioName,
      specialty,
      // Lab fields
      ownerName,
      teamSize,
      photographersServed,
      gstNumber,
      // Legacy
      mobileNumber,
      address
    } = req.body;

    if (!accountType || !['photographer', 'lab'].includes(accountType)) {
      return res.status(400).json({
        success: false,
        message: 'Valid accountType (photographer or lab) is required.'
      });
    }

    // Check if user exists (also check normalized email to prevent duplicates)
    const normalizedEmail = normalizeEmail(email);
    const userExists = await User.findOne({
      $or: [
        { email: email.toLowerCase().trim() },
        { normalizedEmail: normalizedEmail }
      ]
    });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Determine initial credits and validity
    let initialCredits = 0;
    const validityDate = new Date();
    validityDate.setDate(validityDate.getDate() + 7); // 7 days from today

    if (accountType === 'photographer') {
      initialCredits = 5;
    } else if (accountType === 'lab') {
      initialCredits = 10;
    }

    // Create user with sanitized inputs
    const user = await User.create({
      email: email.toLowerCase().trim(),
      normalizedEmail,
      password,
      personalName: sanitizeString(personalName || ''),
      accountType,
      credits: initialCredits,
      creditValidity: validityDate,
      city: sanitizeString(city || ''),
      state: sanitizeString(state || ''),
      country: sanitizeString(country || ''),
      district: sanitizeString(district || ''),
      studioName: sanitizeString(studioName || ''),
      specialty: sanitizeString(specialty || ''),
      ownerName: sanitizeString(ownerName || ''),
      teamSize: teamSize || '',
      photographersServed: photographersServed || '',
      gstNumber: sanitizeString(gstNumber || ''),
      mobileNumber: mobileNumber ? mobileNumber.trim() : '',
      address: sanitizeString(address || '')
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      data: {
        user,
        token
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
};

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      // Generic error — don't reveal if email exists (prevents enumeration)
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      // Same generic error
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      success: true,
      data: {
        user,
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};

// @desc    Admin login
// @route   POST /api/users/admin-login
// @access  Public
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ success: false, message: 'Invalid input' });
    }

    // Find user and verify they have admin role
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user || user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials or insufficient privileges'
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials or insufficient privileges'
      });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      data: { user, token }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

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
    const user = await User.findById(req.user._id);

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
