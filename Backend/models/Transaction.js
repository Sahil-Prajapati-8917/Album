const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true, min: [0, 'Amount cannot be negative'] },
    currency: { type: String, default: 'INR' },
    creditsAdded: { type: Number, required: true, min: [0, 'Credits cannot be negative'] },
    planName: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Success', 'Failed'], default: 'Success' },
    invoiceId: { type: String, unique: true }
}, {
    timestamps: true
});

// Performance indexes (DB-01)
TransactionSchema.index({ userId: 1, createdAt: -1 }); // User's billing history sorted by date

module.exports = mongoose.model('Transaction', TransactionSchema);
