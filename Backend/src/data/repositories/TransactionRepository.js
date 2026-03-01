const BaseRepository = require('./BaseRepository');
const Transaction = require('../models/Transaction');

class TransactionRepository extends BaseRepository {
  constructor() {
    super(Transaction);
  }
}

module.exports = new TransactionRepository();
