import React, { useState } from 'react';
import './App.css';
import ExecutiveDashboard from './components/ExecutiveDashboard';
import ResidentProfile from './components/ResidentProfile';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <ExecutiveDashboard currentView={currentView} onNavigate={handleNavigate} />;
      case 'resident-profile':
        return <ResidentProfile currentView={currentView} onNavigate={handleNavigate} />;
      default:
        return <ExecutiveDashboard currentView={currentView} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="App">
      {renderCurrentView()}
    </div>
  );
}

export default App;
