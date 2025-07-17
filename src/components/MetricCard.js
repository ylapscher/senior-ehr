import React from 'react';
import './MetricCard.css';

const MetricCard = ({ title, value, subtitle, icon, status, details }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return '#10b981';
      case 'warning': return '#f59e0b';
      case 'urgent': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className={`metric-card ${status}`}>
      <div className="metric-header">
        <div className="metric-icon" style={{ color: getStatusColor(status) }}>
          {icon}
        </div>
        <div className="metric-status">
          <span className={`status-indicator ${status}`}></span>
        </div>
      </div>
      
      <div className="metric-content">
        <h3 className="metric-title">{title}</h3>
        <div className="metric-value">{value}</div>
        <div className="metric-subtitle">{subtitle}</div>
        <div className="metric-details">{details}</div>
      </div>
    </div>
  );
};

export default MetricCard;