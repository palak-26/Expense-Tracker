const express = require('express');
const {loginUser, registerUser, getAllusers} = require('../controllers/authController');
// const authenticateUser = require('../middleware/authMiddleware');
const Users = require('../models/Users');

const router = express.Router();

router.post('/login', loginUser);

router.post('/register', registerUser);

// router.get('/users',authenticateUser, getAllusers);



module.exports = router;