import { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

/**
 * CategoryChart Component - Displays expense breakdown by category
 * Refactored with memoization for performance and improved accessibility
 */

const CATEGORY_COLORS = {
  Food: '#ef4444',
  Travel: '#3b82f6',
  Coffee: '#f59e0b',
  Books: '#8b5cf6',
  Other: '#6b7280',
};

export default function CategoryChart({ breakdown }) {
  // Early return if no data
  if (!breakdown || breakdown.length === 0) {
    return null;
  }

  // Memoize chart data to prevent unnecessary recalculations
  const { labels, values, colors, total } = useMemo(() => {
    const lbls = breakdown.map((b) => b._id);
    const vals = breakdown.map((b) => b.total);
    const cls = lbls.map((l) => CATEGORY_COLORS[l] || '#6b7280');
    const ttl = vals.reduce((sum, val) => sum + val, 0);
    return { labels: lbls, values: vals, colors: cls, total: ttl };
  }, [breakdown]);

  // Memoize bar chart data
  const barData = useMemo(() => ({
    labels,
    datasets: [
      {
        label: 'Spent (₹)',
        data: values,
        backgroundColor: colors.map((c) => c + 'cc'),
        borderColor: colors,
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  }), [labels, values, colors]);

  // Memoize bar chart options
  const barOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Spending by Category (This Month)',
        color: '#e2e8f0',
        font: { size: 14, weight: '600', family: "'Outfit', sans-serif" },
      },
      tooltip: {
        backgroundColor: 'rgba(25, 25, 25, 0.95)',
        titleColor: '#f1f5f9',
        bodyColor: '#cbd5e1',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        cornerRadius: 12,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: (ctx) => ` ₹${ctx.parsed.y.toLocaleString('en-IN')}`,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#94a3b8', font: { family: "'Outfit', sans-serif" } },
        grid: { display: false },
      },
      y: {
        ticks: {
          color: '#94a3b8',
          callback: (v) => '₹' + v.toLocaleString('en-IN'),
          font: { family: "'Outfit', sans-serif" }
        },
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        beginAtZero: true,
      },
    },
    animation: {
      duration: 800,
      easing: 'easeOutQuart',
    },
  }), []);

  // Memoize doughnut chart data
  const doughnutData = useMemo(() => ({
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors.map((c) => c + 'cc'),
        borderColor: 'rgba(10, 10, 10, 0.8)',
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  }), [labels, values, colors]);

  // Memoize doughnut chart options
  const doughnutOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#94a3b8',
          padding: 16,
          usePointStyle: true,
          pointStyleWidth: 12,
          font: { size: 12, family: "'Outfit', sans-serif" },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(25, 25, 25, 0.95)',
        titleColor: '#f1f5f9',
        bodyColor: '#cbd5e1',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        cornerRadius: 12,
        padding: 12,
        callbacks: {
          label: (ctx) => {
            const value = ctx.parsed;
            const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
            return ` ${ctx.label}: ₹${value.toLocaleString('en-IN')} (${percentage}%)`;
          },
        },
      },
    },
    animation: {
      duration: 800,
      easing: 'easeOutQuart',
    },
  }), [total]);

  return (
    <div className="charts-container" role="region" aria-label="Expense analytics charts">
      <div className="chart-card glass-panel">
        <div className="chart-wrapper" role="img" aria-label="Bar chart showing spending by category">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
      <div className="chart-card glass-panel">
        <div className="chart-wrapper doughnut-wrapper" role="img" aria-label="Pie chart showing spending distribution">
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>
      </div>
    </div>
  );
}
