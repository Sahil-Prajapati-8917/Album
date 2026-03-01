class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async findById(id, options = {}) {
    let query = this.model.findById(id);
    if (options.select) query = query.select(options.select);
    if (options.populate) query = query.populate(options.populate);
    return await query.exec();
  }

  async findOne(filter, options = {}) {
    let query = this.model.findOne(filter);
    if (options.select) query = query.select(options.select);
    if (options.populate) query = query.populate(options.populate);
    return await query.exec();
  }

  async find(filter = {}, options = {}) {
    let query = this.model.find(filter);
    
    if (options.select) query = query.select(options.select);
    if (options.sort) query = query.sort(options.sort);
    if (options.skip !== undefined) query = query.skip(options.skip);
    if (options.limit !== undefined) query = query.limit(options.limit);
    if (options.populate) query = query.populate(options.populate);

    return await query.exec();
  }

  async countDocuments(filter = {}) {
    return await this.model.countDocuments(filter).exec();
  }

  async findByIdAndUpdate(id, update, options = { new: true }) {
    let query = this.model.findByIdAndUpdate(id, update, options);
    if (options.populate) query = query.populate(options.populate);
    return await query.exec();
  }

  async findOneAndUpdate(filter, update, options = { new: true }) {
    let query = this.model.findOneAndUpdate(filter, update, options);
    if (options.populate) query = query.populate(options.populate);
    return await query.exec();
  }

  async findOneAndDelete(filter, options = {}) {
    return await this.model.findOneAndDelete(filter, options).exec();
  }
}

module.exports = BaseRepository;
