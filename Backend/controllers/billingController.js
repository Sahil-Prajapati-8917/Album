const Transaction = require('../models/Transaction');
const User = require('../models/User');

// Purchase credits (Simulated)
exports.purchaseCredits = async (req, res) => {
    try {
        const { planName, amount, credits } = req.body;

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Create transaction record
        const transaction = new Transaction({
            userId: req.user.id,
            amount,
            creditsAdded: credits,
            planName,
            invoiceId: `INV-${Date.now()}`,
            status: 'Success'
        });

        await transaction.save();

        // Update user credits
        user.credits += credits;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Credits purchased successfully',
            data: {
                transaction,
                newBalance: user.credits
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// Get billing history
exports.getBillingHistory = async (req, res) => {
    try {
        const history = await Transaction.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: history
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};
