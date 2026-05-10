const Expense = require('../models/Expense');

/**
 * @desc    Get all expenses (newest first)
 * @route   GET /api/expenses
 * @query   category (optional) - filter by category
 * @query   startDate, endDate (optional) - filter by date range
 */
const getExpenses = async (req, res) => {
  try {
    const { category, startDate, endDate } = req.query;

    // Build filter object
    const filter = {};

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const expenses = await Expense.find(filter).sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: expenses.length,
      data: expenses,
    });
  } catch (error) {
    console.error('Error fetching expenses:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching expenses',
    });
  }
};

/**
 * @desc    Get monthly summary
 * @route   GET /api/expenses/summary
 */
const getExpenseSummary = async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    // Total expenses (all time)
    const allExpenses = await Expense.find();
    const totalAll = allExpenses.reduce((sum, exp) => sum + exp.amount, 0);

    // This month's expenses
    const monthlyExpenses = await Expense.find({
      date: { $gte: startOfMonth, $lte: endOfMonth },
    });
    const totalMonth = monthlyExpenses.reduce((sum, exp) => sum + exp.amount, 0);

    // Category breakdown (this month)
    const categoryBreakdown = await Expense.aggregate([
      { $match: { date: { $gte: startOfMonth, $lte: endOfMonth } } },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
      { $sort: { total: -1 } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalAll: parseFloat(totalAll.toFixed(2)),
        totalMonth: parseFloat(totalMonth.toFixed(2)),
        totalEntries: allExpenses.length,
        monthlyEntries: monthlyExpenses.length,
        categoryBreakdown,
      },
    });
  } catch (error) {
    console.error('Error fetching summary:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching summary',
    });
  }
};

/**
 * @desc    Create a new expense
 * @route   POST /api/expenses
 */
const createExpense = async (req, res) => {
  try {
    const { title, amount, category, description, date } = req.body;

    // Manual validation
    if (!title || title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Title is required',
      });
    }

    if (amount === undefined || amount === null || isNaN(amount)) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be a valid number',
      });
    }

    if (Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be greater than 0',
      });
    }

    const validCategories = ['Food', 'Travel', 'Coffee', 'Books', 'Other'];
    if (!category || !validCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: 'Category must be one of: Food, Travel, Coffee, Books, Other',
      });
    }

    const expense = await Expense.create({
      title: title.trim(),
      amount: Number(amount),
      category,
      description: description ? description.trim() : '',
      date: date || Date.now(),
    });

    res.status(201).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }

    console.error('Error creating expense:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error while creating expense',
    });
  }
};

/**
 * @desc    Delete an expense by ID
 * @route   DELETE /api/expenses/:id
 */
const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found',
      });
    }

    await Expense.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Expense deleted successfully',
      data: {},
    });
  } catch (error) {
    // Handle invalid ObjectId format
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid expense ID format',
      });
    }

    console.error('Error deleting expense:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting expense',
    });
  }
};

module.exports = {
  getExpenses,
  getExpenseSummary,
  createExpense,
  deleteExpense,
};
