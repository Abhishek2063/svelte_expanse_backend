   // routes/incomeRoutes.js
   const express = require('express');
   const router = express.Router();
   const incomeController = require('../controllers/incomeController');
   const verifyToken = require('../middlewares/authMiddleware');

   // POST /api/incomes/create
   router.post('/create', verifyToken, incomeController.createIncome);

   module.exports = router;