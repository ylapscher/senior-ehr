import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './InfoBanner.css';

/**
 * Info Banner Component
 * Displays information about PMS integration benefits and features
 */
const InfoBanner = ({ variant = 'default', dismissible = false }) => {
  const [isVisible, setIsVisible] = useState(true);

  /**
   * Handle banner dismissal
   */
  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={`info-banner ${variant}`}>
      <div className="banner-content">
        <div className="banner-icon">
          <span className="icon-graphic">🏢</span>
        </div>
        
        <div className="banner-text">
          <h3 className="banner-title">
            Enhanced Care Coordination Through PMS Integration
          </h3>
          <p className="banner-description">
            Seamlessly connect your EHR with Property Management Systems to unlock powerful workflows 
            that improve resident care, streamline operations, and enhance billing accuracy.
          </p>
        </div>
        
        {dismissible && (
          <button
            className="banner-dismiss"
            onClick={handleDismiss}
            aria-label="Dismiss banner"
          >
            ×
          </button>
        )}
      </div>
      
      <div className="banner-benefits">
        <div className="benefits-grid">
          <div className="benefit-item">
            <div className="benefit-icon">🔄</div>
            <div className="benefit-content">
              <h4>Unified Billing</h4>
              <p>Automatically sync care-related charges with property billing systems for accurate, consolidated invoicing.</p>
            </div>
          </div>
          
          <div className="benefit-item">
            <div className="benefit-icon">📊</div>
            <div className="benefit-content">
              <h4>Care Coordination</h4>
              <p>Coordinate resident care with unit assignments, maintenance schedules, and move-in/move-out workflows.</p>
            </div>
          </div>
          
          <div className="benefit-item">
            <div className="benefit-icon">🏠</div>
            <div className="benefit-content">
              <h4>Move Workflows</h4>
              <p>Streamline resident transitions with automated workflows that update care plans and unit assignments.</p>
            </div>
          </div>
          
          <div className="benefit-item">
            <div className="benefit-icon">📈</div>
            <div className="benefit-content">
              <h4>Operational Efficiency</h4>
              <p>Reduce manual data entry and errors with automated synchronization between systems.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="banner-features">
        <h4 className="features-title">Key Integration Features</h4>
        <div className="features-list">
          <div className="feature-tag">
            <span className="tag-icon">👥</span>
            <span className="tag-text">Resident-Unit Sync</span>
          </div>
          <div className="feature-tag">
            <span className="tag-icon">💰</span>
            <span className="tag-text">Billing Integration</span>
          </div>
          <div className="feature-tag">
            <span className="tag-icon">🔧</span>
            <span className="tag-text">Maintenance Coordination</span>
          </div>
          <div className="feature-tag">
            <span className="tag-icon">📋</span>
            <span className="tag-text">Move-in/Move-out</span>
          </div>
          <div className="feature-tag">
            <span className="tag-icon">🔄</span>
            <span className="tag-text">Real-time Occupancy</span>
          </div>
          <div className="feature-tag">
            <span className="tag-icon">📊</span>
            <span className="tag-text">Reporting & Analytics</span>
          </div>
        </div>
      </div>
      
      <div className="banner-stats">
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">40%</span>
            <span className="stat-label">Reduction in Data Entry</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">95%</span>
            <span className="stat-label">Billing Accuracy</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">60%</span>
            <span className="stat-label">Faster Move-in Process</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">99%</span>
            <span className="stat-label">Uptime Reliability</span>
          </div>
        </div>
      </div>
      
      <div className="banner-cta">
        <div className="cta-content">
          <h4>Ready to Get Started?</h4>
          <p>Choose your Property Management System below to begin the integration process.</p>
        </div>
        <div className="cta-actions">
          <button className="cta-btn primary">
            <span className="btn-icon">🚀</span>
            Start Integration
          </button>
          <button className="cta-btn secondary">
            <span className="btn-icon">📚</span>
            View Documentation
          </button>
        </div>
      </div>
    </div>
  );
};

InfoBanner.propTypes = {
  variant: PropTypes.oneOf(['default', 'success', 'warning', 'info']),
  dismissible: PropTypes.bool
};

InfoBanner.defaultProps = {
  variant: 'default',
  dismissible: false
};

export default InfoBanner;