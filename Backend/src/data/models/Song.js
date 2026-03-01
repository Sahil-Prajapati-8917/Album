const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
    videoId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    author: { type: String },
    thumbnail: { type: String },
    filePath: { type: String, required: true },
    durationSeconds: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('Song', SongSchema);