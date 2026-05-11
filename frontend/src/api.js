import axios from 'axios';

/**
 * Axios instance configured for the Student Expense Tracker API.
 * Base URL points to the Express backend server.
 */
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ─── Expense Endpoints ───────────────────────────────────────

/** Fetch all expenses, optionally filtered by category / date range */
export const getExpenses = (params = {}) => API.get('/expenses', { params });

/** Fetch the summary (total, monthly, category breakdown) */
export const getExpenseSummary = () => API.get('/expenses/summary');

/** Create a new expense */
export const createExpense = (data) => API.post('/expenses', data);

/** Delete an expense by its MongoDB _id */
export const deleteExpense = (id) => API.delete(`/expenses/${id}`);

export default API;
