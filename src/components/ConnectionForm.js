import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ConnectionForm.css';

/**
 * Connection Form Component
 * Handles PMS connection credentials and actions
 */
const ConnectionForm = ({
  vendor,
  credentials,
  onCredentialChange,
  onConnect,
  onTestConnection,
  onDisconnect,
  connectionState,
  onClearMessages
}) => {
  const [showTooltip, setShowTooltip] = useState(null);

  /**
   * Get field configuration based on vendor
   * @param {Object} vendor - Selected PMS vendor
   * @returns {Array} - Array of field configurations
   */
  const getFieldConfig = (vendor) => {
    const baseFields = [
      {
        key: 'apiKey',
        label: 'API Key',
        type: 'password',
        required: true,
        placeholder: 'Enter your API key',
        tooltip: 'Your unique API key provided by the PMS vendor. This is used to authenticate API requests.',
        helpText: 'Found in your PMS admin panel under API settings'
      },
      {
        key: 'serverUrl',
        label: 'Server URL',
        type: 'url',
        required: true,
        placeholder: 'https://api.example.com',
        tooltip: 'The base URL for your PMS API endpoint. This should include the protocol (https://).',
        helpText: 'Usually provided in your PMS integration documentation'
      },
      {
        key: 'accountId',
        label: 'Account ID',
        type: 'text',
        required: true,
        placeholder: 'Enter your account ID',
        tooltip: 'Your unique account identifier within the PMS system.',
        helpText: 'This can be found in your account settings or provided by your PMS administrator'
      }
    ];

    // Add vendor-specific fields
    if (vendor.id === 'yardi') {
      baseFields.push({
        key: 'username',
        label: 'Username',
        type: 'text',
        required: true,
        placeholder: 'Enter your Yardi username',
        tooltip: 'Your Yardi system username for API authentication.',
        helpText: 'Use your regular Yardi login username'
      });
    }

    if (vendor.id === 'appfolio') {
      baseFields.push({
        key: 'username',
        label: 'Client ID',
        type: 'text',
        required: true,
        placeholder: 'Enter your AppFolio client ID',
        tooltip: 'Your AppFolio OAuth client ID for API authentication.',
        helpText: 'Obtain from your AppFolio API settings'
      });
    }

    return baseFields;
  };

  /**
   * Handle input field changes
   * @param {string} field - Field name
   * @param {string} value - Field value
   */
  const handleFieldChange = (field, value) => {
    onCredentialChange(field, value);
    // Clear messages when user starts typing
    if (connectionState.errorMessage || connectionState.successMessage) {
      onClearMessages();
    }
  };

  /**
   * Handle tooltip show/hide
   * @param {string} fieldKey - Field key to show tooltip for
   */
  const handleTooltipToggle = (fieldKey) => {
    setShowTooltip(showTooltip === fieldKey ? null : fieldKey);
  };

  /**
   * Handle form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    onConnect();
  };

  const fieldConfig = getFieldConfig(vendor);

  return (
    <div className="connection-form">
      <div className="form-header">
        <h2>Connect to {vendor.name}</h2>
        <p className="form-description">
          Enter your {vendor.name} credentials to establish integration
        </p>
      </div>

      {/* Status Messages */}
      {connectionState.errorMessage && (
        <div className="status-message error">
          <span className="message-icon">❌</span>
          <span className="message-text">{connectionState.errorMessage}</span>
          <button
            className="close-message"
            onClick={onClearMessages}
            aria-label="Close error message"
          >
            ×
          </button>
        </div>
      )}

      {connectionState.successMessage && (
        <div className="status-message success">
          <span className="message-icon">✅</span>
          <span className="message-text">{connectionState.successMessage}</span>
          <button
            className="close-message"
            onClick={onClearMessages}
            aria-label="Close success message"
          >
            ×
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="credentials-form">
        {fieldConfig.map((field) => (
          <div key={field.key} className="form-group">
            <label htmlFor={field.key} className="form-label">
              {field.label}
              {field.required && <span className="required-asterisk">*</span>}
              <button
                type="button"
                className="tooltip-trigger"
                onClick={() => handleTooltipToggle(field.key)}
                aria-label={`Show help for ${field.label}`}
              >
                ❓
              </button>
            </label>

            {showTooltip === field.key && (
              <div className="tooltip-content">
                <p className="tooltip-text">{field.tooltip}</p>
                <button
                  type="button"
                  className="tooltip-close"
                  onClick={() => setShowTooltip(null)}
                >
                  ×
                </button>
              </div>
            )}

            <input
              id={field.key}
              name={field.key}
              type={field.type}
              value={credentials[field.key] || ''}
              onChange={(e) => handleFieldChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              required={field.required}
              className="form-input"
              disabled={connectionState.isConnecting}
            />

            {field.helpText && (
              <p className="help-text">{field.helpText}</p>
            )}
          </div>
        ))}

        <div className="form-actions">
          <button
            type="submit"
            className="action-btn primary"
            disabled={connectionState.isConnecting || connectionState.isConnected}
          >
            {connectionState.isConnecting ? (
              <>
                <span className="loading-spinner">⏳</span>
                Connecting...
              </>
            ) : (
              <>
                🔗 Connect
              </>
            )}
          </button>

          <button
            type="button"
            className="action-btn secondary"
            onClick={onTestConnection}
            disabled={connectionState.isConnecting}
          >
            🧪 Test Connection
          </button>

          {connectionState.isConnected && (
            <button
              type="button"
              className="action-btn danger"
              onClick={onDisconnect}
            >
              🔌 Disconnect
            </button>
          )}
        </div>
      </form>

      {/* Connection Tips */}
      <div className="connection-tips">
        <h3>Connection Tips</h3>
        <ul>
          <li>
            <strong>API Key:</strong> Make sure your API key has the necessary permissions for resident and unit data access
          </li>
          <li>
            <strong>Server URL:</strong> Verify the URL is correct and includes the proper protocol (https://)
          </li>
          <li>
            <strong>Firewall:</strong> Ensure your network allows outbound connections to the PMS API endpoints
          </li>
          <li>
            <strong>Test First:</strong> Use the "Test Connection" button to verify credentials before connecting
          </li>
        </ul>
      </div>
    </div>
  );
};

ConnectionForm.propTypes = {
  vendor: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  credentials: PropTypes.shape({
    apiKey: PropTypes.string,
    serverUrl: PropTypes.string,
    accountId: PropTypes.string,
    username: PropTypes.string,
    password: PropTypes.string
  }).isRequired,
  onCredentialChange: PropTypes.func.isRequired,
  onConnect: PropTypes.func.isRequired,
  onTestConnection: PropTypes.func.isRequired,
  onDisconnect: PropTypes.func.isRequired,
  connectionState: PropTypes.shape({
    isConnected: PropTypes.bool,
    isConnecting: PropTypes.bool,
    errorMessage: PropTypes.string,
    successMessage: PropTypes.string
  }).isRequired,
  onClearMessages: PropTypes.func.isRequired
};

export default ConnectionForm;