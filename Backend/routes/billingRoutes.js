const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
    purchaseCredits,
    getBillingHistory
} = require('../controllers/billingController');

router.post('/purchase', protect, purchaseCredits);
router.get('/history', protect, getBillingHistory);

module.exports = router;
