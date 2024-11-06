import React, { useEffect, useRef } from 'react';
import { Chart, LineController, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

Chart.register(LineController, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const LineChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels: data.dates,
          datasets: [
            {
              label: 'Expenses Over Time',
              data: data.amounts,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        },
        options: {
          scales: {
            x: { type: 'category' },
            y: { beginAtZero: true },
          },
        },
      });
    }
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default LineChart;
