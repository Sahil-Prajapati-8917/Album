const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    creditsAdded: { type: Number, required: true },
    planName: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Success', 'Failed'], default: 'Success' },
    invoiceId: { type: String, unique: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Transaction', TransactionSchema);
