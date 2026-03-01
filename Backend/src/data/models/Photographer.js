const mongoose = require('mongoose');

const PhotographerSchema = new mongoose.Schema({
    name: { type: String, required: true, maxlength: 100 },
    mobile: { type: String, required: true, maxlength: 20 },
    city: { type: String, maxlength: 100 },
    state: { type: String, maxlength: 100 },
    address: { type: String, maxlength: 500 },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
    timestamps: true
});

// Performance index (DB-01)
PhotographerSchema.index({ userId: 1 });

module.exports = mongoose.model('Photographer', PhotographerSchema);
