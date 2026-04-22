const Expense = require('../models/Expense');

// @route   POST /api/expenses
// @desc    Add new expense (Protected route)
// @access  Private
exports.addExpense = async (req, res) => {
  try {
    const { title, amount, category, date, description } = req.body;

    // Validation
    if (!title || !amount || !category) {
      return res.status(400).json({ success: false, message: 'Please provide title, amount, and category' });
    }

    // Create expense
    const expense = await Expense.create({
      userId: req.user.id,
      title,
      amount,
      category,
      date: date || new Date(),
      description
    });

    res.status(201).json({
      success: true,
      message: 'Expense added successfully',
      expense
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error while adding expense'
    });
  }
};

// @route   GET /api/expenses
// @desc    Get all expenses of logged-in user
// @access  Private
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }).sort({ date: -1 });

    // Calculate total
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    res.status(200).json({
      success: true,
      count: expenses.length,
      total: total.toFixed(2),
      expenses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error while fetching expenses'
    });
  }
};

// @route   GET /api/expenses/category/:category
// @desc    Get expenses filtered by category
// @access  Private
exports.getExpensesByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const expenses = await Expense.find({
      userId: req.user.id,
      category: category
    }).sort({ date: -1 });

    // Calculate total
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    res.status(200).json({
      success: true,
      count: expenses.length,
      total: total.toFixed(2),
      expenses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error while fetching expenses by category'
    });
  }
};

// @route   PUT /api/expenses/:id
// @desc    Update an expense
// @access  Private
exports.updateExpense = async (req, res) => {
  try {
    let expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ success: false, message: 'Expense not found' });
    }

    // Make sure user owns the expense
    if (expense.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this expense' });
    }

    expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Expense updated successfully',
      expense
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error while updating expense'
    });
  }
};

// @route   DELETE /api/expenses/:id
// @desc    Delete an expense
// @access  Private
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ success: false, message: 'Expense not found' });
    }

    // Make sure user owns the expense
    if (expense.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this expense' });
    }

    await Expense.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Expense deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error while deleting expense'
    });
  }
};
