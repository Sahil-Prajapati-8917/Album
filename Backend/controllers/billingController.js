const Transaction = require('../models/Transaction');
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');

// Server-side plan definitions — NEVER trust client-sent credits/amounts (BILL-01)
const PLANS = {
    // Photographer plans
    'Pay Per Album': { price: 19, credits: 1, accountTypes: ['photographer'] },
    'Monthly Plan': { price: 149, credits: 20, accountTypes: ['photographer'] },
    'Yearly Plan': { price: 1299, credits: 250, accountTypes: ['photographer'] },
    // Lab plans
    'Lab Starter': { price: 999, credits: 1000, accountTypes: ['lab'] },
    'Lab Pro': { price: 2499, credits: 5000, accountTypes: ['lab'] },
};

// Purchase credits — with server-side plan validation (BILL-01)
exports.purchaseCredits = async (req, res) => {
    try {
        const { planName } = req.body;

        // Validate plan exists
        const plan = PLANS[planName];
        if (!plan) {
            return res.status(400).json({
                success: false,
                message: `Invalid plan: "${planName}". Available plans: ${Object.keys(PLANS).join(', ')}`
            });
        }

        // Verify user exists
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Validate plan is appropriate for account type (BIZ-03)
        if (!plan.accountTypes.includes(user.accountType)) {
            return res.status(400).json({
                success: false,
                message: `Plan "${planName}" is not available for ${user.accountType} accounts.`
            });
        }

        // Generate unique invoice ID for idempotency (BIZ-06)
        const invoiceId = `INV-${uuidv4().split('-')[0].toUpperCase()}-${Date.now()}`;

        // Create transaction record with SERVER-SIDE values only
        const transaction = new Transaction({
            userId: req.user.id,
            amount: plan.price, // Server-side price, NOT from client
            creditsAdded: plan.credits, // Server-side credits, NOT from client
            planName,
            invoiceId,
            status: 'Success' // TODO: Set to 'Pending' when payment gateway is integrated
        });

        await transaction.save();

        // ATOMIC credit addition — prevents race condition (BILL-03)
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { $inc: { credits: plan.credits } },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Credits purchased successfully',
            data: {
                transaction,
                newBalance: updatedUser.credits
            }
        });
    } catch (error) {
        console.error('Purchase error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get billing history — with pagination
exports.getBillingHistory = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const skip = (page - 1) * limit;

        const [history, total] = await Promise.all([
            Transaction.find({ userId: req.user.id })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            Transaction.countDocuments({ userId: req.user.id })
        ]);

        res.status(200).json({
            success: true,
            data: history,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get available plans — public endpoint for frontend
exports.getPlans = async (req, res) => {
    try {
        const plans = Object.entries(PLANS).map(([name, plan]) => ({
            name,
            price: plan.price,
            credits: plan.credits,
            accountTypes: plan.accountTypes
        }));

        res.status(200).json({
            success: true,
            data: plans
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
