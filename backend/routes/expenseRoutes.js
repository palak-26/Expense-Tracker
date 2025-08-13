const express = require('express');
const {addExpense , getExpense , deleteExpense} = require('../controllers/expenseController');

const router =  express.Router();

router.post('/', addExpense)
router.get('/', getExpense);
router.delete('/:id', deleteExpense);

module.exports = router;

