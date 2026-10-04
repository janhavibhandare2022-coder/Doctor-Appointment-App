import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function CryptoChart({ coinId = 'bitcoin', currency = 'usd' }) {
  const [chartData, setChartData] = useState(null);
  const [days, setDays] = useState(7);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`
        );
        const data = await res.json();
        if (data.prices) {
          setChartData({
            labels: data.prices.map((price) => {
              const date = new Date(price[0]);
              return days === 1 ? date.toLocaleTimeString() : date.toLocaleDateString();
            }),
            datasets: [
              {
                label: `${coinId.toUpperCase()} Price (${currency.toUpperCase()})`,
                data: data.prices.map((price) => price[1]),
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.2)',
                fill: true,
                tension: 0.2,
              },
            ],
          });
        }
      } catch (err) {
        console.error('Error fetching chart data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [coinId, currency, days]);

  return (
    <div style={{ background: '#ffffff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginBottom: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ margin: 0, color: '#1f2937' }}>{coinId.toUpperCase()} Price Chart</h3>
        <div>
          <button onClick={() => setDays(1)} style={{ marginRight: '8px', padding: '6px 12px', cursor: 'pointer' }}>24h</button>
          <button onClick={() => setDays(7)} style={{ marginRight: '8px', padding: '6px 12px', cursor: 'pointer' }}>7d</button>
          <button onClick={() => setDays(30)} style={{ padding: '6px 12px', cursor: 'pointer' }}>30d</button>
        </div>
      </div>
      {loading ? (
        <p style={{ textAlign: 'center', padding: '40px' }}>Loading chart...</p>
      ) : chartData ? (
        <Line data={chartData} options={{ responsive: true }} />
      ) : (
        <p>No chart data available</p>
      )}
    </div>
  );
}

export default CryptoChart;

