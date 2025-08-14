const express = require('express');
const {addExpense , getExpense , deleteExpense , updateExpense} = require('../controllers/expenseController');
const protect = require('../middleware/authMiddleware')

const router =  express.Router();

router.post('/', addExpense)
router.get('/', getExpense);
router.delete('/:id', deleteExpense);
router.put("/:id" , updateExpense);

module.exports = router;

