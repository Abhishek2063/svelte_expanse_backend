   // routes/categoryRoutes.js
   const express = require('express');
   const router = express.Router();
   const categoryController = require('../controllers/categoryController');
   const verifyToken = require('../middlewares/authMiddleware');

   // POST /api/categories/create
   router.post('/create', verifyToken, categoryController.createCategory);

   module.exports = router;