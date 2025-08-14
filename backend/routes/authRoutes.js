const express = require('express'); // Express framework
const { loginUser, registerUser } = require('../controllers/authController'); // Import controller functions

const router = express.Router(); // Create a new router instance

// =====================
// AUTH ROUTES
// =====================

// @route   POST /login
// @desc    Authenticate user & return token

router.post('/login', loginUser);

// @route   POST /register
// @desc    Register a new user

router.post('/register', registerUser);

module.exports = router; // Export the router for use in server.js
