const mongoose = require('mongoose');

const PageSchema = new mongoose.Schema({
    image: { type: String, required: true },
    caption: { type: String, default: '' }
});

const SpreadSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    leftPage: PageSchema,
    rightPage: PageSchema
});

const AlbumSchema = new mongoose.Schema({
    albumId: { type: String, required: true, unique: true },
    clientName: { type: String, required: true },
    functionDate: { type: String, required: true },
    functionType: { type: String, required: true },
    photographerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Photographer', default: null },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    songName: { type: String, default: 'Standard Track' },
    views: { type: Number, default: 0 },
    frontCover: { type: String, default: null },
    backCover: { type: String, default: null },
    spreads: [SpreadSchema],
    totalSheets: { type: Number, default: 0 },
    status: { type: String, enum: ['Pending', 'Processing', 'Done'], default: 'Done' },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    label: { type: String, default: 'Feature' }
}, {
    timestamps: true
});

module.exports = mongoose.model('Album', AlbumSchema);
