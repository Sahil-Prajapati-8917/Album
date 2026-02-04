// Email validation regex
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

// Validate email format
const validateEmail = (email) => {
  return emailRegex.test(email);
};

// Validate password strength
const validatePassword = (password) => {
  // At least 6 characters
  if (!password || password.length < 6) {
    return { isValid: false, message: 'Password must be at least 6 characters long' };
  }
  return { isValid: true };
};

// Validate registration data
const validateRegistration = (req, res, next) => {
  const { email, password, personalName } = req.body;

  // Check required fields
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required'
    });
  }

  // Validate email format
  if (!validateEmail(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please enter a valid email address'
    });
  }

  // Validate password
  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    return res.status(400).json({
      success: false,
      message: passwordValidation.message
    });
  }

  // Sanitize personal name if provided
  if (personalName) {
    req.body.personalName = personalName.trim().substring(0, 100); // Limit length
  }

  next();
};

// Validate login data
const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  // Check required fields
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required'
    });
  }

  // Validate email format
  if (!validateEmail(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please enter a valid email address'
    });
  }

  next();
};

// Validate profile update data
const validateProfileUpdate = (req, res, next) => {
  const { personalName, studioName, mobileNumber, address } = req.body;

  // Sanitize and validate string fields
  if (personalName !== undefined) {
    if (typeof personalName !== 'string' || personalName.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Personal name must be a string with maximum 100 characters'
      });
    }
    req.body.personalName = personalName.trim();
  }

  if (studioName !== undefined) {
    if (typeof studioName !== 'string' || studioName.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Studio name must be a string with maximum 100 characters'
      });
    }
    req.body.studioName = studioName.trim();
  }

  if (mobileNumber !== undefined) {
    if (typeof mobileNumber !== 'string' || mobileNumber.length > 20) {
      return res.status(400).json({
        success: false,
        message: 'Mobile number must be a string with maximum 20 characters'
      });
    }
    req.body.mobileNumber = mobileNumber.trim();
  }

  if (address !== undefined) {
    if (typeof address !== 'string' || address.length > 500) {
      return res.status(400).json({
        success: false,
        message: 'Address must be a string with maximum 500 characters'
      });
    }
    req.body.address = address.trim();
  }

  // Validate social media links if provided
  if (req.body.socialMedia) {
    const socialMediaFields = ['instagram', 'facebook', 'youtube', 'whatsapp', 'twitter'];
    
    for (const field of socialMediaFields) {
      if (req.body.socialMedia[field] !== undefined) {
        if (typeof req.body.socialMedia[field] !== 'string' || req.body.socialMedia[field].length > 255) {
          return res.status(400).json({
            success: false,
            message: `${field} link must be a string with maximum 255 characters`
          });
        }
        req.body.socialMedia[field] = req.body.socialMedia[field].trim();
      }
    }
  }

  next();
};

// Rate limiting middleware (simple in-memory implementation)
const rateLimit = (maxRequests = 5, windowMs = 15 * 60 * 1000) => {
  const requests = new Map();

  return (req, res, next) => {
    const key = req.ip;
    const now = Date.now();
    const windowStart = now - windowMs;

    // Clean old requests
    if (requests.has(key)) {
      const userRequests = requests.get(key).filter(time => time > windowStart);
      requests.set(key, userRequests);
    }

    // Check current requests
    const currentRequests = requests.get(key) || [];
    
    if (currentRequests.length >= maxRequests) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests. Please try again later.'
      });
    }

    // Add current request
    currentRequests.push(now);
    requests.set(key, currentRequests);

    next();
  };
};

module.exports = {
  validateRegistration,
  validateLogin,
  validateProfileUpdate,
  rateLimit
};
