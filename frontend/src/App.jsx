import { useState, useEffect } from 'react';
import { getExpenses, getExpenseSummary, deleteExpense } from './api';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import SummaryCards from './components/SummaryCards';
import CategoryChart from './components/CategoryChart';
import Filters from './components/Filters';
import SavingsPlanner from './components/SavingsPlanner';
import InvestmentRecommendations from './components/InvestmentRecommendations';

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ category: 'All', startDate: '', endDate: '' });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [expRes, sumRes] = await Promise.all([
        getExpenses(filters),
        getExpenseSummary(),
      ]);
      // Fix: Access inner .data from the backend response
      setExpenses(expRes.data.data || []);
      setSummary(sumRes.data.data || null);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this expense?')) return;
    try {
      await deleteExpense(id);
      fetchData();
    } catch (err) {
      console.error('Failed to delete:', err);
      alert('Failed to delete expense.');
    }
  };

  return (
    <div className="scroll-container">
      {/* ── 1. Expense Calculator ── */}
      <section className="scroll-section tracker-section" style={{ display: 'flex', alignItems: 'center' }}>
        <div className="app">
          <SummaryCards summary={summary} />
        </div>
      </section>

      {/* ── 2. Format Guide ── */}
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

      {/* ── 3. Expense Tracker ── */}
      <section className="scroll-section tracker-section">
        <div className="app">
          <header className="app-header">
            <div className="header-left">
              <div className="logo-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3h12" />
                  <path d="M6 8h12" />
                  <path d="M6 13l8.5 8" />
                  <path d="M6 13h3c3.5 0 6-2.5 6-5s-2.5-5-6-5" />
                </svg>
              </div>
              <div>
                <h2>PennyTrack Dashboard</h2>
              </div>
            </div>
          </header>

          <div className="content-grid">
            <div className="sidebar">
              <ExpenseForm onExpenseAdded={fetchData} />
            </div>
            
            <div className="main-content">
              {/* Fix: Pass breakdown prop correctly from summary data */}
              {summary?.categoryBreakdown?.length > 0 && (
                <CategoryChart breakdown={summary.categoryBreakdown} />
              )}
              <Filters filters={filters} onChange={setFilters} />
              <ExpenseList
                expenses={expenses}
                loading={loading}
                onDelete={handleDelete}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Savings Goal Calculator ── */}
      <section className="scroll-section tracker-section" style={{ display: 'flex', alignItems: 'center' }}>
        <div className="app">
          <SavingsPlanner />
        </div>
      </section>

      {/* ── 5. Stocks ── */}
      <section className="scroll-section tracker-section" style={{ display: 'flex', alignItems: 'center' }}>
        <div className="app">
          <InvestmentRecommendations />
        </div>
      </section>

      {/* ── 6. Footer Signature Section ── */}
      <section className="scroll-section footer-section" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h2 style={{ color: '#ffffff', fontSize: '2rem', fontWeight: '500', letterSpacing: '2px' }}>
          Made by Chinmay
        </h2>
      </section>
    </div>
  );
}
