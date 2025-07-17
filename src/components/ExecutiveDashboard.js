import React from 'react';
import './ExecutiveDashboard.css';
import Sidebar from './Sidebar';
import MetricCard from './MetricCard';

const ExecutiveDashboard = () => {
  const metrics = [
    {
      id: 'occupancy',
      title: 'Current Occupancy',
      value: '247',
      subtitle: '92% capacity',
      icon: '🏠',
      status: 'good',
      details: '247 of 268 beds occupied'
    },
    {
      id: 'incidents',
      title: 'Open Incident Reports',
      value: '3',
      subtitle: '2 new today',
      icon: '⚠️',
      status: 'warning',
      details: 'Requires immediate attention'
    },
    {
      id: 'emar',
      title: 'eMAR Compliance',
      value: '98.5%',
      subtitle: 'Medication admin',
      icon: '💊',
      status: 'good',
      details: 'Above target of 95%'
    },
    {
      id: 'compliance',
      title: 'Regulatory Deadlines',
      value: '2',
      subtitle: 'Due this week',
      icon: '📋',
      status: 'urgent',
      details: 'Fire safety inspection & staff training'
    }
  ];

  return (
    <div className="executive-dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <header className="dashboard-header">
          <h1>Executive Dashboard</h1>
          <div className="date-time">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </header>
        
        <div className="metrics-grid">
          {metrics.map(metric => (
            <MetricCard key={metric.id} {...metric} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExecutiveDashboard;