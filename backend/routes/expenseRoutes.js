const express = require('express'); // Express framework
const { addExpense, getExpense, deleteExpense, updateExpense } = require('../controllers/expenseController'); // Expense controllers


const router = express.Router(); // Create a new router instance

// =====================
// EXPENSE ROUTES
// =====================

// @route   POST /
// @desc    Add a new expense
router.post('/', addExpense); 
// @route   GET /
// @desc    Get all expenses for logged-in user
router.get('/', getExpense); 

// @route   DELETE /:id
// @desc    Delete an expense by ID
router.delete('/:id', deleteExpense); 
// @route   PUT /:id
// @desc    Update an expense by ID
router.put('/:id', updateExpense); 

module.exports = router; // Export router
