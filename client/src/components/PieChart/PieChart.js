import React, { useEffect, useRef } from 'react';
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(PieController, ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      new Chart(chartRef.current, {
        type: 'pie',
        data: {
          labels: data.categories,
          datasets: [
            {
              data: data.amounts,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
          ],
        },
      });
    }
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default PieChart;
