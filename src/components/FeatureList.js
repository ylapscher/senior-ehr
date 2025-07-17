import React from 'react';
import PropTypes from 'prop-types';
import './FeatureList.css';

/**
 * Feature List Component
 * Displays available PMS integration features with toggle controls
 */
const FeatureList = ({ enabledFeatures, onFeatureToggle }) => {
  // Available integration features
  const features = [
    {
      key: 'syncResidentsToUnits',
      title: 'Sync Residents to Units',
      description: 'Automatically sync resident information with unit assignments in the PMS',
      icon: '👥',
      category: 'Core',
      benefits: [
        'Reduces manual data entry',
        'Ensures accurate occupancy tracking',
        'Prevents double bookings'
      ],
      requirements: ['Read access to resident data', 'Write access to unit assignments']
    },
    {
      key: 'importUnitDetails',
      title: 'Import Unit Details',
      description: 'Import comprehensive unit information including amenities, floor plans, and availability',
      icon: '🏠',
      category: 'Core',
      benefits: [
        'Centralized unit information',
        'Accurate inventory management',
        'Better care planning based on unit features'
      ],
      requirements: ['Read access to unit data', 'Property management permissions']
    },
    {
      key: 'autoUpdateOccupancy',
      title: 'Auto-Update Occupancy Status',
      description: 'Real-time occupancy status updates between EHR and PMS systems',
      icon: '🔄',
      category: 'Automation',
      benefits: [
        'Real-time occupancy visibility',
        'Improved bed management',
        'Better resource allocation'
      ],
      requirements: ['Webhook support', 'Real-time API access']
    },
    {
      key: 'syncBilling',
      title: 'Billing Integration',
      description: 'Sync billing information and care-related charges with the PMS',
      icon: '💰',
      category: 'Financial',
      benefits: [
        'Unified billing system',
        'Accurate care cost tracking',
        'Streamlined financial reporting'
      ],
      requirements: ['Billing API access', 'Financial data permissions']
    },
    {
      key: 'moveWorkflow',
      title: 'Move-in/Move-out Workflow',
      description: 'Automated workflow for resident move-in and move-out processes',
      icon: '📦',
      category: 'Workflow',
      benefits: [
        'Streamlined admissions process',
        'Coordinated care transitions',
        'Reduced administrative burden'
      ],
      requirements: ['Workflow API access', 'Notification permissions']
    },
    {
      key: 'maintenanceRequests',
      title: 'Maintenance Request Integration',
      description: 'Create and track maintenance requests that affect resident care',
      icon: '🔧',
      category: 'Operations',
      benefits: [
        'Proactive maintenance management',
        'Better resident safety',
        'Coordinated care and facilities'
      ],
      requirements: ['Maintenance API access', 'Work order permissions']
    }
  ];

  /**
   * Handle feature toggle
   * @param {string} featureKey - Feature key to toggle
   */
  const handleToggle = (featureKey) => {
    onFeatureToggle(featureKey);
  };

  /**
   * Group features by category
   * @param {Array} features - Array of features
   * @returns {Object} - Grouped features
   */
  const groupFeaturesByCategory = (features) => {
    return features.reduce((groups, feature) => {
      const category = feature.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(feature);
      return groups;
    }, {});
  };

  const groupedFeatures = groupFeaturesByCategory(features);

  return (
    <div className="feature-list">
      <div className="features-header">
        <h2>Integration Features</h2>
        <p className="features-description">
          Configure which PMS features are enabled for your EHR integration
        </p>
      </div>

      <div className="features-content">
        {Object.entries(groupedFeatures).map(([category, categoryFeatures]) => (
          <div key={category} className="feature-category">
            <h3 className="category-title">{category} Features</h3>
            
            <div className="features-grid">
              {categoryFeatures.map((feature) => (
                <div key={feature.key} className="feature-card">
                  <div className="feature-header">
                    <div className="feature-icon">{feature.icon}</div>
                    <div className="feature-title-section">
                      <h4 className="feature-title">{feature.title}</h4>
                      <div className="feature-toggle">
                        <label className="toggle-switch">
                          <input
                            type="checkbox"
                            checked={enabledFeatures[feature.key] || false}
                            onChange={() => handleToggle(feature.key)}
                            className="toggle-input"
                          />
                          <span className="toggle-slider">
                            <span className="toggle-label">
                              {enabledFeatures[feature.key] ? 'ON' : 'OFF'}
                            </span>
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <p className="feature-description">{feature.description}</p>
                  
                  <div className="feature-benefits">
                    <h5>Benefits:</h5>
                    <ul>
                      {feature.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="feature-requirements">
                    <h5>Requirements:</h5>
                    <div className="requirements-list">
                      {feature.requirements.map((requirement, index) => (
                        <span key={index} className="requirement-tag">
                          {requirement}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="feature-status">
                    <span className={`status-indicator ${enabledFeatures[feature.key] ? 'enabled' : 'disabled'}`}>
                      {enabledFeatures[feature.key] ? '✅ Enabled' : '⚫ Disabled'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Feature Summary */}
      <div className="features-summary">
        <h3>Feature Summary</h3>
        <div className="summary-stats">
          <div className="stat-item">
            <span className="stat-number">
              {Object.values(enabledFeatures).filter(Boolean).length}
            </span>
            <span className="stat-label">Enabled Features</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{features.length}</span>
            <span className="stat-label">Total Features</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {Math.round((Object.values(enabledFeatures).filter(Boolean).length / features.length) * 100)}%
            </span>
            <span className="stat-label">Integration Coverage</span>
          </div>
        </div>
        
        <div className="summary-actions">
          <button
            className="action-btn secondary"
            onClick={() => {
              // Enable all features
              features.forEach(feature => {
                if (!enabledFeatures[feature.key]) {
                  onFeatureToggle(feature.key);
                }
              });
            }}
          >
            🔧 Enable All
          </button>
          <button
            className="action-btn tertiary"
            onClick={() => {
              // Disable all features
              features.forEach(feature => {
                if (enabledFeatures[feature.key]) {
                  onFeatureToggle(feature.key);
                }
              });
            }}
          >
            ⚫ Disable All
          </button>
        </div>
      </div>

      {/* Integration Health */}
      <div className="integration-health">
        <h3>Integration Health</h3>
        <div className="health-metrics">
          <div className="health-metric">
            <span className="metric-label">Data Sync Quality:</span>
            <div className="metric-bar">
              <div className="metric-fill" style={{ width: '94%' }}></div>
            </div>
            <span className="metric-value">94%</span>
          </div>
          <div className="health-metric">
            <span className="metric-label">API Response Time:</span>
            <div className="metric-bar">
              <div className="metric-fill" style={{ width: '87%' }}></div>
            </div>
            <span className="metric-value">245ms</span>
          </div>
          <div className="health-metric">
            <span className="metric-label">Feature Reliability:</span>
            <div className="metric-bar">
              <div className="metric-fill" style={{ width: '98%' }}></div>
            </div>
            <span className="metric-value">98%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

FeatureList.propTypes = {
  enabledFeatures: PropTypes.shape({
    syncResidentsToUnits: PropTypes.bool,
    importUnitDetails: PropTypes.bool,
    autoUpdateOccupancy: PropTypes.bool,
    syncBilling: PropTypes.bool,
    moveWorkflow: PropTypes.bool,
    maintenanceRequests: PropTypes.bool
  }).isRequired,
  onFeatureToggle: PropTypes.func.isRequired
};

export default FeatureList;