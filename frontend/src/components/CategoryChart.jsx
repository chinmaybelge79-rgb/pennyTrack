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

const CATEGORY_COLORS = {
  Food: '#ef4444',
  Travel: '#3b82f6',
  Coffee: '#f59e0b',
  Books: '#8b5cf6',
  Other: '#6b7280',
};

export default function CategoryChart({ breakdown }) {
  if (!breakdown || breakdown.length === 0) {
    return null;
  }

  const labels = breakdown.map((b) => b._id);
  const values = breakdown.map((b) => b.total);
  const colors = labels.map((l) => CATEGORY_COLORS[l] || '#6b7280');

  const barData = {
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
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Spending by Category (This Month)',
        color: '#e2e8f0',
        font: { size: 14, weight: '600' },
      },
      tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#f1f5f9',
        bodyColor: '#cbd5e1',
        borderColor: '#334155',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
      },
    },
    scales: {
      x: {
        ticks: { color: '#94a3b8' },
        grid: { display: false },
      },
      y: {
        ticks: { color: '#94a3b8', callback: (v) => '₹' + v },
        grid: { color: '#1e293b' },
      },
    },
  };

  const doughnutData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors.map((c) => c + 'cc'),
        borderColor: '#0f172a',
        borderWidth: 3,
        hoverOffset: 8,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#94a3b8',
          padding: 16,
          usePointStyle: true,
          pointStyleWidth: 12,
        },
      },
      tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#f1f5f9',
        bodyColor: '#cbd5e1',
        borderColor: '#334155',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        callbacks: {
          label: (ctx) => ` ₹${ctx.parsed.toFixed(2)}`,
        },
      },
    },
  };

  return (
    <div className="charts-container">
      <div className="chart-card glass-panel">
        <div className="chart-wrapper">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
      <div className="chart-card glass-panel">
        <div className="chart-wrapper doughnut-wrapper">
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>
      </div>
    </div>
  );
}
