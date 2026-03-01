const BaseRepository = require('./BaseRepository');
const Album = require('../models/Album');

class AlbumRepository extends BaseRepository {
  constructor() {
    super(Album);
  }

  // Add any album-specific methods here
}

module.exports = new AlbumRepository();
