// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Sign-Up Route
router.post('/register', authController.register);

// Login Route
router.post('/login', authController.login);

module.exports = router;