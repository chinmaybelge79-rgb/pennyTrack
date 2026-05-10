const express = require('express');
const router = express.Router();
const {
  getExpenses,
  getExpenseSummary,
  createExpense,
  deleteExpense,
} = require('../controllers/expenseController');

// @route   GET /api/expenses/summary
// Must come before /:id to avoid conflict
router.get('/summary', getExpenseSummary);

// @route   GET /api/expenses
router.get('/', getExpenses);

// @route   POST /api/expenses
router.post('/', createExpense);

// @route   DELETE /api/expenses/:id
router.delete('/:id', deleteExpense);

module.exports = router;
