// Email validation regex
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

// Validate email format
const validateEmail = (email) => {
  return emailRegex.test(email);
};

// Normalize email — strip gmail dots and + suffixes to prevent duplicate accounts
const normalizeEmail = (email) => {
  if (!email || typeof email !== 'string') return '';
  email = email.toLowerCase().trim();

  const [local, domain] = email.split('@');
  if (!local || !domain) return email;

  // For Gmail, strip dots and + aliases
  if (domain === 'gmail.com' || domain === 'googlemail.com') {
    const cleanLocal = local.split('+')[0].replace(/\./g, '');
    return `${cleanLocal}@${domain}`;
  }

  return email;
};

// Sanitize a string to prevent XSS — strip HTML tags
const sanitizeString = (str) => {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers like onclick=
    .trim();
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

  // Ensure email is a string (prevent NoSQL injection objects)
  if (typeof email !== 'string' || typeof password !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Invalid input format'
    });
  }

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
    req.body.personalName = sanitizeString(personalName).substring(0, 100);
  }

  // Normalize email to prevent duplicate accounts
  req.body.email = email.toLowerCase().trim();

  next();
};

// Validate login data
const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  // Ensure inputs are strings (prevent NoSQL injection objects)
  if (typeof email !== 'string' || typeof password !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Invalid input format'
    });
  }

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

  // Normalize email
  req.body.email = email.toLowerCase().trim();

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
    req.body.personalName = sanitizeString(personalName);
  }

  if (studioName !== undefined) {
    if (typeof studioName !== 'string' || studioName.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Studio name must be a string with maximum 100 characters'
      });
    }
    req.body.studioName = sanitizeString(studioName);
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
    req.body.address = sanitizeString(address);
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

// Validate album creation data
const validateAlbumCreation = (req, res, next) => {
  const { clientName, functionDate, functionType } = req.body;

  if (!clientName || typeof clientName !== 'string' || clientName.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Client name is required'
    });
  }

  if (!functionDate || typeof functionDate !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Function date is required'
    });
  }

  if (!functionType || typeof functionType !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Function type is required'
    });
  }

  // Sanitize inputs to prevent XSS
  req.body.clientName = sanitizeString(clientName).substring(0, 200);
  req.body.functionType = sanitizeString(functionType).substring(0, 100);
  if (req.body.songName) {
    req.body.songName = sanitizeString(req.body.songName).substring(0, 200);
  }

  next();
};

// Validate billing purchase data
const validateBillingPurchase = (req, res, next) => {
  const { planName } = req.body;

  if (!planName || typeof planName !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Plan name is required'
    });
  }

  // Don't trust client-sent credits or amount — server will look up from plan definitions
  // Remove these from body to prevent override
  delete req.body.credits;
  delete req.body.amount;

  next();
};

// Rate limiting middleware (simple in-memory implementation)
const rateLimit = (maxRequests = 5, windowMs = 15 * 60 * 1000) => {
  const requests = new Map();

  // Periodic cleanup to prevent memory leak
  setInterval(() => {
    const now = Date.now();
    const windowStart = now - windowMs;
    for (const [key, times] of requests.entries()) {
      const filtered = times.filter(time => time > windowStart);
      if (filtered.length === 0) {
        requests.delete(key);
      } else {
        requests.set(key, filtered);
      }
    }
  }, windowMs); // Clean up every window period

  return (req, res, next) => {
    const key = req.ip;
    const now = Date.now();
    const windowStart = now - windowMs;

    // Clean old requests for this key
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
  validateAlbumCreation,
  validateBillingPurchase,
  normalizeEmail,
  sanitizeString,
  rateLimit
};
