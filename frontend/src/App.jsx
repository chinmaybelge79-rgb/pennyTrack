import { useState, useEffect, useCallback, useMemo } from 'react';
import { getExpenses, getExpenseSummary, deleteExpense } from './api';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import SummaryCards from './components/SummaryCards';
import CategoryChart from './components/CategoryChart';
import Filters from './components/Filters';
import SavingsPlanner from './components/SavingsPlanner';
import InvestmentRecommendations from './components/InvestmentRecommendations';
import IncomeAllocator from './components/IncomeAllocator';

/**
 * PennyTrack App - Main Application Component
 * Refactored with improved layout, performance, and accessibility
 */

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ category: 'All', startDate: '', endDate: '' });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [expRes, sumRes] = await Promise.all([
        getExpenses(filters),
        getExpenseSummary(),
      ]);
      setExpenses(expRes.data.data || []);
      setSummary(sumRes.data.data || null);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchData();
  }, [filters]);

  const handleDelete = useCallback(async (id) => {
    if (!window.confirm('Are you sure you want to delete this expense?')) return;
    try {
      await deleteExpense(id);
      fetchData();
    } catch (err) {
      console.error('Failed to delete:', err);
      alert('Failed to delete expense.');
    }
  }, [fetchData]);

  return (
    <div className="scroll-container">
      {/* ── 1. Landing Page / Guide ── */}
      <section className="scroll-section guide-section">
        <div className="guide-content">
          <h1>PennyTrack</h1>
          <p className="guide-subtitle">Master Your Budget in 3 Simple Steps</p>
          
          <div className="guide-steps">
            <div className="guide-step glass-panel">
              <div className="step-number">01</div>
              <div>
                <h3>Add Your Expenses</h3>
                <p>Use the form to log every coffee, book, or travel ticket. Categorize them to keep things organized.</p>
              </div>
            </div>
            
            <div className="guide-step glass-panel">
              <div className="step-number">02</div>
              <div>
                <h3>Monitor Insights</h3>
                <p>Watch your spending habits emerge through interactive charts and instant summary metrics.</p>
              </div>
            </div>
            
            <div className="guide-step glass-panel">
              <div className="step-number">03</div>
              <div>
                <h3>Filter & Reflect</h3>
                <p>Use date and category filters to analyze specific timeframes and identify where you can save.</p>
              </div>
            </div>
          </div>
          
          <div className="scroll-prompt">
            <p>Scroll down to start tracking</p>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
          </div>
        </div>
      </section>

      {/* ── 2. Expense Tracker ── */}
      <section className="scroll-section tracker-section" id="dashboard">
        <div className="app">
          {/* Dashboard Header with Stats Row */}
          <header className="dashboard-header">
            <div className="header-left">
              <div className="logo-icon" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3h12" />
                  <path d="M6 8h12" />
                  <path d="M6 13l8.5 8" />
                  <path d="M6 13h3c3.5 0 6-2.5 6-5s-2.5-5-6-5" />
                </svg>
              </div>
              <div>
                <h1 className="dashboard-title">PennyTrack Dashboard</h1>
              </div>
            </div>
          </header>

          {/* Stats Row - 3 Cards directly below heading */}
          <div className="stats-section">
            <SummaryCards summary={summary} />
          </div>

          <div className="content-grid">
            <aside className="form-sidebar" aria-label="Add expense form">
              <ExpenseForm onExpenseAdded={fetchData} />
            </aside>
            
            <main className="main-content" role="main">
              {summary?.categoryBreakdown?.length > 0 && (
                <CategoryChart breakdown={summary.categoryBreakdown} />
              )}
              <Filters filters={filters} onChange={setFilters} />
              <ExpenseList
                expenses={expenses}
                loading={loading}
                onDelete={handleDelete}
              />
            </main>
          </div>
        </div>
      </section>

      {/* ── 3. Savings Goal Calculator ── */}
      <section className="scroll-section tracker-section" id="savings" style={{ display: 'flex', alignItems: 'center' }}>
        <div className="app">
          <SavingsPlanner />
        </div>
      </section>

      {/* ── 4. Summary Dashboard (Financial Overview) ── */}
      <section className="scroll-section hero-section" style={{ display: 'flex', alignItems: 'center' }}>
        <div className="app">
          <div className="hero-content">
            <h1 className="hero-title">Your Financial Overview</h1>
            <p className="hero-subtitle">Track, analyze, and optimize your spending</p>
            
            {/* Income Allocation Module */}
            <IncomeAllocator />
          </div>
        </div>
      </section>

      {/* ── 5. Investment Recommendations ── */}
      <section className="scroll-section tracker-section" id="investments" style={{ display: 'flex', alignItems: 'center' }}>
        <div className="app">
          <InvestmentRecommendations />
        </div>
      </section>

      {/* ── 6. Footer Signature Section ── */}
      <footer className="scroll-section footer-section">
        <h2 className="footer-title">Made by Chinmay</h2>
      </footer>
    </div>
  );
}
