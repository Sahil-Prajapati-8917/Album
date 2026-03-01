const BaseRepository = require('./BaseRepository');
const Photographer = require('../models/Photographer');

class PhotographerRepository extends BaseRepository {
  constructor() {
    super(Photographer);
  }
}

module.exports = new PhotographerRepository();
