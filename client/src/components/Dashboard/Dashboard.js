import React, { useEffect, useState } from 'react';
import PieChart from '../PieChart/PieChart';
import LineChart from '../LineChart/LineChart';

const Dashboard = () => {
    const [pieData] = useState({
        categories: ['Food', 'Travel', 'Entertainment'],
        amounts: [200, 150, 100],
      });
      
      const [lineData] = useState({
        dates: ['2024-11-01', '2024-11-02', '2024-11-03'],
        amounts: [50, 100, 150],
      });      

  
  useEffect(() => {

  }, []);

  return (
    <div className='auth-dashboard-container'>
      <h2 className='auth-chart-heading'>Dashboard</h2>
      <div className='auth-chart-container'>
      <div className='auth-chart'>
        <PieChart data={pieData} />
      </div>
      <div className='auth-chart'>
      <LineChart data={lineData} />
      </div>
      </div>
      
    </div>
  );
};

export default Dashboard;
