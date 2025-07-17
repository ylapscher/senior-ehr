import React from 'react';
import './Sidebar.css';

const Sidebar = ({ currentView, onNavigate }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', view: 'dashboard' },
    { id: 'residents', label: 'Residents', icon: '👥', view: 'resident-profile' },
    { id: 'staff-tasks', label: 'Staff Tasks', icon: '✓', view: 'staff-tasks' },
    { id: 'reports', label: 'Reports', icon: '📈', view: 'reports' },
    { id: 'property-management', label: 'PMS Integration', icon: '🏢', view: 'property-management' }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>SeniorCare EHR</h2>
        <p>Executive Portal</p>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <div 
            key={item.id} 
            className={`nav-item ${currentView === item.view ? 'active' : ''}`}
            onClick={() => onNavigate && onNavigate(item.view)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </div>
        ))}
      </nav>
      
      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">👤</div>
          <div className="user-details">
            <p className="user-name">John Manager</p>
            <p className="user-role">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;