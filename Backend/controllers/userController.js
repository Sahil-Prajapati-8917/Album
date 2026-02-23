const User = require('../models/User');
const { generateToken } = require('../middleware/auth');

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
  console.log(`Registration request received for: ${req.body.email}`);
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

    // Check if user exists
    const userExists = await User.findOne({ email });
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

    // Create user
    const user = await User.create({
      email,
      password,
      personalName: personalName || '',
      accountType,
      credits: initialCredits,
      creditValidity: validityDate,
      city: city || '',
      state: state || '',
      country: country || '',
      district: district || '',
      studioName: studioName || '', // Acts as Lab Name for labs
      specialty: specialty || '',
      ownerName: ownerName || '',
      teamSize: teamSize || '',
      photographersServed: photographersServed || '',
      gstNumber: gstNumber || '',
      mobileNumber: mobileNumber || '',
      address: address || ''
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

    // Check for user email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
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
      message: error.message || 'Server error during login'
    });
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
      message: error.message || 'Server error fetching profile'
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

    // Update fields
    const {
      personalName,
      studioName,
      mobileNumber,
      address,
      profilePicture,
      socialMedia
    } = req.body;

    if (personalName !== undefined) user.personalName = personalName;
    if (studioName !== undefined) user.studioName = studioName;
    if (mobileNumber !== undefined) user.mobileNumber = mobileNumber;
    if (address !== undefined) user.address = address;
    if (profilePicture !== undefined) user.profilePicture = profilePicture;
    if (socialMedia !== undefined) {
      user.socialMedia = {
        ...user.socialMedia,
        ...socialMedia
      };
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
      message: error.message || 'Server error updating profile'
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
      message: error.message || 'Server error'
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getMe
};
