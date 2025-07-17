import React from 'react';
import PropTypes from 'prop-types';
import './PMSVendorSelector.css';

/**
 * PMS Vendor Selection Component
 * Displays popular Property Management System vendors as selectable cards
 */
const PMSVendorSelector = ({ selectedVendor, onVendorSelect }) => {
  // Popular PMS vendors with their details
  const pmsVendors = [
    {
      id: 'appfolio',
      name: 'AppFolio',
      description: 'Comprehensive property management software with integrated accounting',
      logo: '🏢',
      category: 'Enterprise',
      features: ['Resident Management', 'Lease Tracking', 'Maintenance', 'Accounting'],
      apiSupport: 'REST API',
      popular: true
    },
    {
      id: 'yardi',
      name: 'Yardi',
      description: 'Leading property management and investment software platform',
      logo: '🏙️',
      category: 'Enterprise',
      features: ['Portfolio Management', 'Leasing', 'Maintenance', 'Financial Reporting'],
      apiSupport: 'REST API',
      popular: true
    },
    {
      id: 'realpage',
      name: 'RealPage',
      description: 'Software and data analytics for rental housing providers',
      logo: '📊',
      category: 'Enterprise',
      features: ['Revenue Management', 'Resident Screening', 'Maintenance', 'Analytics'],
      apiSupport: 'REST API',
      popular: true
    },
    {
      id: 'buildium',
      name: 'Buildium',
      description: 'Cloud-based property management software for residential properties',
      logo: '🏠',
      category: 'Mid-Market',
      features: ['Tenant Management', 'Online Rent Collection', 'Maintenance', 'Reports'],
      apiSupport: 'REST API',
      popular: true
    },
    {
      id: 'rentmanager',
      name: 'Rent Manager',
      description: 'Comprehensive property management software with CRM integration',
      logo: '💼',
      category: 'Mid-Market',
      features: ['Property Accounting', 'Tenant Portal', 'Work Orders', 'Document Management'],
      apiSupport: 'REST API',
      popular: false
    },
    {
      id: 'propertyware',
      name: 'Propertyware',
      description: 'Single-family rental property management software',
      logo: '🏘️',
      category: 'Small Business',
      features: ['Portfolio Management', 'Tenant Screening', 'Maintenance', 'Owner Portal'],
      apiSupport: 'REST API',
      popular: false
    },
    {
      id: 'entrata',
      name: 'Entrata',
      description: 'Unified property management platform for multifamily properties',
      logo: '🏢',
      category: 'Enterprise',
      features: ['Leasing', 'Resident Services', 'Maintenance', 'Business Intelligence'],
      apiSupport: 'REST API',
      popular: true
    },
    {
      id: 'mri',
      name: 'MRI Software',
      description: 'Global real estate software solutions for property management',
      logo: '🌐',
      category: 'Enterprise',
      features: ['Asset Management', 'Lease Administration', 'Facilities Management', 'Analytics'],
      apiSupport: 'REST API',
      popular: false
    }
  ];

  /**
   * Handle vendor card click
   * @param {Object} vendor - Selected vendor object
   */
  const handleVendorClick = (vendor) => {
    onVendorSelect(vendor);
  };

  /**
   * Check if vendor is currently selected
   * @param {Object} vendor - Vendor to check
   * @returns {boolean} - True if selected
   */
  const isSelected = (vendor) => {
    return selectedVendor && selectedVendor.id === vendor.id;
  };

  return (
    <div className="pms-vendor-selector">
      <div className="selector-header">
        <h2>Select Your Property Management System</h2>
        <p className="selector-description">
          Choose from popular PMS vendors to establish integration with your EHR system
        </p>
      </div>

      <div className="vendor-grid">
        {pmsVendors.map((vendor) => (
          <div
            key={vendor.id}
            className={`vendor-card ${isSelected(vendor) ? 'selected' : ''} ${vendor.popular ? 'popular' : ''}`}
            onClick={() => handleVendorClick(vendor)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleVendorClick(vendor);
              }
            }}
          >
            {vendor.popular && (
              <div className="popular-badge">
                <span>⭐ Popular</span>
              </div>
            )}
            
            <div className="vendor-header">
              <div className="vendor-logo">
                {vendor.logo}
              </div>
              <div className="vendor-info">
                <h3 className="vendor-name">{vendor.name}</h3>
                <span className="vendor-category">{vendor.category}</span>
              </div>
            </div>
            
            <p className="vendor-description">{vendor.description}</p>
            
            <div className="vendor-features">
              <h4>Key Features:</h4>
              <ul>
                {vendor.features.slice(0, 3).map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
                {vendor.features.length > 3 && (
                  <li className="more-features">+{vendor.features.length - 3} more</li>
                )}
              </ul>
            </div>
            
            <div className="vendor-footer">
              <span className="api-support">
                🔗 {vendor.apiSupport}
              </span>
              {isSelected(vendor) && (
                <span className="selected-indicator">
                  ✓ Selected
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedVendor && (
        <div className="selection-summary">
          <div className="summary-content">
            <span className="summary-text">
              Selected: <strong>{selectedVendor.name}</strong>
            </span>
            <button
              className="change-selection-btn"
              onClick={() => onVendorSelect(null)}
            >
              Change Selection
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

PMSVendorSelector.propTypes = {
  selectedVendor: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    logo: PropTypes.string,
    category: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.string),
    apiSupport: PropTypes.string,
    popular: PropTypes.bool
  }),
  onVendorSelect: PropTypes.func.isRequired
};

PMSVendorSelector.defaultProps = {
  selectedVendor: null
};

export default PMSVendorSelector;