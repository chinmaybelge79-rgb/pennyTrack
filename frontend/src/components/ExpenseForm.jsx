import { useState, useCallback, useMemo, useEffect } from 'react';
import { createExpense } from '../api';

const CATEGORIES = ['Food', 'Travel', 'Coffee', 'Books', 'Other'];

/**
 * ExpenseForm Component - Form for adding new expenses
 * Refactored with improved UX, accessibility, and error handling
 */
export default function ExpenseForm({ onExpenseAdded }) {
  const [form, setForm] = useState({
    title: '',
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [touched, setTouched] = useState({});

  // Memoized validation
  const validationErrors = useMemo(() => {
    const newErrors = {};
    if (touched.title && !form.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (touched.amount && (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0)) {
      newErrors.amount = 'Enter a valid amount > 0';
    }
    if (touched.category && !form.category) {
      newErrors.category = 'Select a category';
    }
    return newErrors;
  }, [form, touched]);

  // Update errors when validation changes
  useEffect(() => {
    setErrors(validationErrors);
  }, [validationErrors]);

  const validate = useCallback(() => {
    // Mark all fields as touched
    setTouched({ title: true, amount: true, category: true, description: true, date: true });
    
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Title is required';
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) {
      newErrors.amount = 'Enter a valid amount > 0';
    }
    if (!form.category) newErrors.category = 'Select a category';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Mark field as touched
    setTouched((prev) => ({ ...prev, [name]: true }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await createExpense({
        ...form,
        amount: Number(form.amount),
      });
      setForm({
        title: '',
        amount: '',
        category: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
      });
      setTouched({});
      setErrors({});
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
      onExpenseAdded();
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to add expense';
      setErrors({ submit: msg });
    } finally {
      setLoading(false);
    }
  }, [form, validate, onExpenseAdded]);

  return (
    <div className="expense-form-card glass-panel">
      <div className="form-header">
        <h2>Add Expense</h2>
      </div>

      {success && (
        <div className="alert alert-success">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          Expense added successfully!
        </div>
      )}
      {errors.submit && (
        <div className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
          {errors.submit}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate aria-label="Add new expense">
        <div className="form-row">
          <div className="form-group">
            <input
              id="title"
              type="text"
              name="title"
              placeholder=" "
              value={form.title}
              onChange={handleChange}
              className={`input-field ${errors.title ? 'input-error' : ''}`}
            />
            <label htmlFor="title" className="input-label">Title *</label>
            {errors.title && <span className="error-text">{errors.title}</span>}
          </div>

          <div className="form-group">
            <input
              id="amount"
              type="number"
              name="amount"
              placeholder=" "
              min="0.01"
              step="0.01"
              value={form.amount}
              onChange={handleChange}
              className={`input-field ${errors.amount ? 'input-error' : ''}`}
            />
            <label htmlFor="amount" className="input-label">Amount (₹) *</label>
            {errors.amount && <span className="error-text">{errors.amount}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className={`input-field ${form.category ? 'has-value' : ''} ${errors.category ? 'input-error' : ''}`}
            >
              <option value="" disabled hidden></option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <label htmlFor="category" className="input-label">Category *</label>
            {errors.category && <span className="error-text">{errors.category}</span>}
          </div>

          <div className="form-group">
            <input
              id="date"
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className={`input-field ${form.date ? 'has-value' : ''}`}
            />
            <label htmlFor="date" className="input-label">Date</label>
          </div>
        </div>

        <div className="form-group full-width">
          <textarea
            id="description"
            name="description"
            placeholder=" "
            value={form.description}
            onChange={handleChange}
            className="input-field"
          />
          <label htmlFor="description" className="input-label">Description (Optional)</label>
        </div>

        <button 
          type="submit" 
          className="btn-primary" 
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? (
            <>
              <span className="sr-only">Adding expense...</span>
              Adding...
            </>
          ) : 'Add Expense'}
        </button>
      </form>
    </div>
  );
}
