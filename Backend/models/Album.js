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
    clientName: { type: String, required: true, maxlength: 200 },
    functionDate: { type: String, required: true },
    functionType: { type: String, required: true, maxlength: 100 },
    photographerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Photographer', default: null },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    songName: { type: String, default: 'Standard Track', maxlength: 200 },
    views: { type: Number, default: 0, min: 0 },
    frontCover: { type: String, default: null },
    backCover: { type: String, default: null },
    spreads: [SpreadSchema],
    totalSheets: { type: Number, default: 0, min: 0 },
    status: { type: String, enum: ['Pending', 'Processing', 'Done'], default: 'Done' },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    label: { type: String, default: 'Feature', maxlength: 100 }
}, {
    timestamps: true
});

// Performance indexes (DB-01, PERF-02)
AlbumSchema.index({ userId: 1, createdAt: -1 }); // User's albums sorted by date

module.exports = mongoose.model('Album', AlbumSchema);
