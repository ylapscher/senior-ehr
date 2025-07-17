import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './PropertyManagementIntegration.css';
import Sidebar from './Sidebar';
import PMSVendorSelector from './PMSVendorSelector';
import ConnectionForm from './ConnectionForm';
import CurrentConnection from './CurrentConnection';
import FeatureList from './FeatureList';
import InfoBanner from './InfoBanner';

/**
 * Main Property Management System Integration Page
 * Provides a complete interface for connecting EHR to various PMS vendors
 */
const PropertyManagementIntegration = ({ currentView, onNavigate }) => {
  // State for selected PMS vendor
  const [selectedVendor, setSelectedVendor] = useState(null);
  
  // State for connection status and data
  const [connectionState, setConnectionState] = useState({
    isConnected: false,
    isConnecting: false,
    connectionData: null,
    lastSync: null,
    errorMessage: null,
    successMessage: null
  });

  // State for credential form data
  const [credentials, setCredentials] = useState({
    apiKey: '',
    serverUrl: '',
    accountId: '',
    username: '',
    password: ''
  });

  // State for enabled features
  const [enabledFeatures, setEnabledFeatures] = useState({
    syncResidentsToUnits: true,
    importUnitDetails: true,
    autoUpdateOccupancy: false,
    syncBilling: false,
    moveWorkflow: true,
    maintenanceRequests: false
  });

  // State for mobile sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Mock connection data for demo
  const mockConnectionData = {
    accountName: 'Sunset Manor Properties',
    connectionStatus: 'active',
    lastSync: new Date(Date.now() - 15 * 60000).toISOString(), // 15 minutes ago
    syncedUnits: 124,
    syncedResidents: 98,
    vendor: selectedVendor
  };

  /**
   * Handle vendor selection
   * @param {Object} vendor - Selected PMS vendor
   */
  const handleVendorSelect = (vendor) => {
    setSelectedVendor(vendor);
    // Clear any previous messages
    setConnectionState(prev => ({
      ...prev,
      errorMessage: null,
      successMessage: null
    }));
  };

  /**
   * Handle form field changes
   * @param {string} field - Field name
   * @param {string} value - Field value
   */
  const handleCredentialChange = (field, value) => {
    setCredentials(prev => ({
      ...prev,
      [field]: value
    }));
  };

  /**
   * Handle connection attempt
   */
  const handleConnect = () => {
    if (!selectedVendor) {
      setConnectionState(prev => ({
        ...prev,
        errorMessage: 'Please select a PMS vendor first.'
      }));
      return;
    }

    // Basic validation
    if (!credentials.apiKey || !credentials.serverUrl) {
      setConnectionState(prev => ({
        ...prev,
        errorMessage: 'Please fill in all required fields.'
      }));
      return;
    }

    setConnectionState(prev => ({
      ...prev,
      isConnecting: true,
      errorMessage: null,
      successMessage: null
    }));

    // Simulate connection attempt
    setTimeout(() => {
      // 80% success rate for demo
      const success = Math.random() > 0.2;
      
      if (success) {
        setConnectionState(prev => ({
          ...prev,
          isConnected: true,
          isConnecting: false,
          connectionData: mockConnectionData,
          lastSync: new Date().toISOString(),
          successMessage: `Successfully connected to ${selectedVendor.name}!`
        }));
      } else {
        setConnectionState(prev => ({
          ...prev,
          isConnecting: false,
          errorMessage: 'Connection failed. Please check your credentials and try again.'
        }));
      }
    }, 2000);
  };

  /**
   * Handle connection test
   */
  const handleTestConnection = () => {
    if (!selectedVendor) {
      setConnectionState(prev => ({
        ...prev,
        errorMessage: 'Please select a PMS vendor first.'
      }));
      return;
    }

    setConnectionState(prev => ({
      ...prev,
      errorMessage: null,
      successMessage: null
    }));

    // Simulate test connection
    setTimeout(() => {
      const success = Math.random() > 0.3;
      
      if (success) {
        setConnectionState(prev => ({
          ...prev,
          successMessage: `Test connection to ${selectedVendor.name} successful!`
        }));
      } else {
        setConnectionState(prev => ({
          ...prev,
          errorMessage: 'Test connection failed. Please verify your credentials.'
        }));
      }
    }, 1500);
  };

  /**
   * Handle disconnection
   */
  const handleDisconnect = () => {
    setConnectionState({
      isConnected: false,
      isConnecting: false,
      connectionData: null,
      lastSync: null,
      errorMessage: null,
      successMessage: 'Successfully disconnected from PMS.'
    });
    setCredentials({
      apiKey: '',
      serverUrl: '',
      accountId: '',
      username: '',
      password: ''
    });
  };

  /**
   * Handle feature toggle
   * @param {string} featureKey - Feature key to toggle
   */
  const handleFeatureToggle = (featureKey) => {
    setEnabledFeatures(prev => ({
      ...prev,
      [featureKey]: !prev[featureKey]
    }));
  };

  /**
   * Clear status messages
   */
  const clearMessages = () => {
    setConnectionState(prev => ({
      ...prev,
      errorMessage: null,
      successMessage: null
    }));
  };

  return (
    <div className="property-management-integration">
      <Sidebar 
        currentView={currentView} 
        onNavigate={onNavigate}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      <div className="integration-content">
        {/* Header */}
        <div className="integration-header">
          <div className="header-content">
            <button 
              className="mobile-menu-btn"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open menu"
            >
              ☰
            </button>
            <div className="title-section">
              <h1>Property Management Integration</h1>
              <p className="header-subtitle">
                Connect your EHR with popular Property Management Systems to streamline operations
              </p>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <InfoBanner />

        {/* PMS Vendor Selection */}
        <PMSVendorSelector
          selectedVendor={selectedVendor}
          onVendorSelect={handleVendorSelect}
        />

        {/* Connection Form */}
        {selectedVendor && (
          <ConnectionForm
            vendor={selectedVendor}
            credentials={credentials}
            onCredentialChange={handleCredentialChange}
            onConnect={handleConnect}
            onTestConnection={handleTestConnection}
            onDisconnect={handleDisconnect}
            connectionState={connectionState}
            onClearMessages={clearMessages}
          />
        )}

        {/* Current Connection Status */}
        {connectionState.isConnected && connectionState.connectionData && (
          <CurrentConnection
            connectionData={connectionState.connectionData}
            lastSync={connectionState.lastSync}
          />
        )}

        {/* Feature List */}
        {connectionState.isConnected && (
          <FeatureList
            enabledFeatures={enabledFeatures}
            onFeatureToggle={handleFeatureToggle}
          />
        )}
      </div>
    </div>
  );
};

PropertyManagementIntegration.propTypes = {
  currentView: PropTypes.string,
  onNavigate: PropTypes.func
};

PropertyManagementIntegration.defaultProps = {
  currentView: 'property-management',
  onNavigate: () => {}
};

export default PropertyManagementIntegration;