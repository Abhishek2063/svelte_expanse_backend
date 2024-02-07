const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const verifyToken = require('../middlewares/authMiddleware');

// GET /api/dashboard/:user_id
router.get('/:user_id', verifyToken, dashboardController.getDashboardData);

module.exports = router;