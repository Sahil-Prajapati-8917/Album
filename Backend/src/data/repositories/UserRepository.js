const BaseRepository = require('./BaseRepository');
const User = require('../models/User');

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  // Add any user-specific methods here if needed in the future
}

module.exports = new UserRepository();
