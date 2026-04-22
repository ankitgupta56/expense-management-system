const express = require('express');
const {
  addExpense,
  getExpenses,
  getExpensesByCategory,
  updateExpense,
  deleteExpense
} = require('../controllers/expenseController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// POST /api/expenses - Add new expense (Protected)
router.post('/', protect, addExpense);

// GET /api/expenses - Get all expenses (Protected)
router.get('/', protect, getExpenses);

// GET /api/expenses/category/:category - Get expenses by category (Protected)
router.get('/category/:category', protect, getExpensesByCategory);

// PUT /api/expenses/:id - Update expense (Protected)
router.put('/:id', protect, updateExpense);

// DELETE /api/expenses/:id - Delete expense (Protected)
router.delete('/:id', protect, deleteExpense);

module.exports = router;
