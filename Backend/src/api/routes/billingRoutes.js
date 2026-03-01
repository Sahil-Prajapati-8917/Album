const express = require('express');
const router = express.Router();
const { protect } = require('../../common/middleware/auth');
const { validateBillingPurchase, rateLimit } = require('../../common/middleware/validation');
const {
    purchaseCredits,
    getBillingHistory,
    getPlans
} = require('../controllers/billingController');

// Public route — plans info
router.get('/plans', getPlans);

// Protected routes with validation and rate limiting
router.post('/purchase', protect, rateLimit(5, 60 * 1000), validateBillingPurchase, purchaseCredits); // Max 5 purchases/min
router.get('/history', protect, getBillingHistory);

module.exports = router;
