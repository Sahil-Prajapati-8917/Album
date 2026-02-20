const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  accountType: {
    type: String,
    enum: ['photographer', 'lab'],
    required: [true, 'Account type is required']
  },
  credits: {
    type: Number,
    default: 0
  },
  creditValidity: {
    type: Date
  },
  personalName: {
    type: String,
    trim: true,
    default: ''
  },
  studioName: {
    type: String,
    trim: true,
    default: ''
  },
  mobileNumber: {
    type: String,
    trim: true,
    default: ''
  },
  state: {
    type: String,
    trim: true,
    default: ''
  },
  city: {
    type: String,
    trim: true,
    default: ''
  },
  // Photographer Specific Fields
  specialty: {
    type: String,
    trim: true,
    default: ''
  },
  // Lab Specific Fields
  ownerName: {
    type: String,
    trim: true,
    default: ''
  },
  teamSize: {
    type: String,
    trim: true,
    default: ''
  },
  photographersServed: {
    type: String,
    trim: true,
    default: ''
  },
  gstNumber: {
    type: String,
    trim: true,
    default: ''
  },
  // Legacy / Other
  address: {
    type: String,
    trim: true,
    default: ''
  },
  profilePicture: {
    type: String,
    default: ''
  },
  socialMedia: {
    instagram: {
      type: String,
      trim: true,
      default: ''
    },
    facebook: {
      type: String,
      trim: true,
      default: ''
    },
    youtube: {
      type: String,
      trim: true,
      default: ''
    },
    whatsapp: {
      type: String,
      trim: true,
      default: ''
    },
    twitter: {
      type: String,
      trim: true,
      default: ''
    }
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  try {
    // Hash password with cost of 12
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to check password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to get user data without password
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

module.exports = mongoose.model('User', userSchema);
