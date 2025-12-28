const express = require('express');
const { requireAuth, requireAdmin } = require('../middleware/auth');
const { getDashboard } = require('../controllers/adminController');

const router = express.Router();

// Admin dashboard summary (reservations + stats)
router.get('/dashboard', requireAuth, requireAdmin, getDashboard);

module.exports = router;
