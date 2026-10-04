import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function Portfolio({ currency }) {
  const symbol = currency === 'usd' ? '$' : '₹';
  const total = currency === 'usd' ? 1000 : 83000;

  const data = {
    labels: ['Bitcoin', 'Ethereum', 'Tether'],
    datasets: [
      {
        data: [50, 30, 20],
        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: { boxWidth: 12, font: { size: 11 } },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between h-full">
      <div className="flex justify-between items-center mb-2 pb-2 border-b">
        <h3 className="text-sm font-bold text-gray-800">Portfolio</h3>
        <span className="text-xs text-gray-500 font-medium">Total: {symbol}{total.toLocaleString()}</span>
      </div>
      <div className="relative w-full h-44">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}

export default Portfolio;