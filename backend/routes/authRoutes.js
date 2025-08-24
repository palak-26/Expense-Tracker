const express = require('express'); // Express framework
const { loginUser, registerUser, resetPassword } = require('../controllers/authController'); // Import controller functions
const Users = require('../models/Users');
const bcrypt = require('bcryptjs');
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

// POST /auth/request-reset

// ---------------- RESET PASSWORD ----------------
router.post("/reset-password", resetPassword);


module.exports = router; // Export the router
