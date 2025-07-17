import React from 'react';
import './MobileNavbar.css';

const MobileNavbar = ({ currentView, onNavigate, isSidebarOpen, onToggleSidebar }) => {
  const getPageTitle = () => {
    switch (currentView) {
      case 'dashboard':
        return 'Dashboard';
      case 'resident-profile':
        return 'Residents';
      case 'staff-tasks':
        return 'Staff Tasks';
      case 'reports':
        return 'Reports';
      case 'property-management':
        return 'PMS Integration';
      default:
        return 'SeniorCare EHR';
    }
  };

  return (
    <div className="mobile-navbar">
      <button 
        className="mobile-nav-menu-btn"
        onClick={onToggleSidebar}
        aria-label="Toggle menu"
      >
        ☰
      </button>
      
      <h1 className="mobile-nav-title">{getPageTitle()}</h1>
      
      <div className="mobile-nav-spacer"></div>
    </div>
  );
};

export default MobileNavbar;