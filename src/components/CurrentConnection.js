import React from 'react';
import PropTypes from 'prop-types';
import './CurrentConnection.css';

/**
 * Current Connection Status Component
 * Displays active PMS connection information and sync status
 */
const CurrentConnection = ({ connectionData, lastSync }) => {
  /**
   * Format the last sync time for display
   * @param {string} timestamp - ISO timestamp
   * @returns {string} - Formatted time string
   */
  const formatLastSync = (timestamp) => {
    if (!timestamp) return 'Never';
    
    const now = new Date();
    const syncTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - syncTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  /**
   * Get connection status color and icon
   * @param {string} status - Connection status
   * @returns {Object} - Status display info
   */
  const getConnectionStatusInfo = (status) => {
    switch (status) {
      case 'active':
        return { color: 'green', icon: '✅', text: 'Active' };
      case 'warning':
        return { color: 'orange', icon: '⚠️', text: 'Warning' };
      case 'error':
        return { color: 'red', icon: '❌', text: 'Error' };
      case 'syncing':
        return { color: 'blue', icon: '🔄', text: 'Syncing' };
      default:
        return { color: 'gray', icon: '⚫', text: 'Unknown' };
    }
  };

  /**
   * Trigger manual sync (mock function)
   */
  const handleManualSync = () => {
    // This would trigger a real sync in a production app
    console.log('Manual sync triggered');
  };

  /**
   * View sync logs (mock function)
   */
  const handleViewLogs = () => {
    // This would open sync logs in a production app
    console.log('Viewing sync logs');
  };

  const statusInfo = getConnectionStatusInfo(connectionData.connectionStatus);

  return (
    <div className="current-connection">
      <div className="connection-header">
        <h2>Current Connection</h2>
        <div className="connection-actions">
          <button
            className="action-btn secondary small"
            onClick={handleManualSync}
            title="Trigger manual sync"
          >
            🔄 Sync Now
          </button>
          <button
            className="action-btn tertiary small"
            onClick={handleViewLogs}
            title="View sync logs"
          >
            📋 View Logs
          </button>
        </div>
      </div>

      <div className="connection-info">
        <div className="info-grid">
          {/* Account Information */}
          <div className="info-section">
            <h3>Account Information</h3>
            <div className="info-items">
              <div className="info-item">
                <span className="info-label">Account Name:</span>
                <span className="info-value">{connectionData.accountName}</span>
              </div>
              <div className="info-item">
                <span className="info-label">PMS Vendor:</span>
                <span className="info-value">{connectionData.vendor.name}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Account ID:</span>
                <span className="info-value">***-{connectionData.accountName.slice(-4)}</span>
              </div>
            </div>
          </div>

          {/* Connection Status */}
          <div className="info-section">
            <h3>Connection Status</h3>
            <div className="info-items">
              <div className="info-item">
                <span className="info-label">Status:</span>
                <span className={`connection-status ${statusInfo.color}`}>
                  {statusInfo.icon} {statusInfo.text}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Last Sync:</span>
                <span className="info-value">{formatLastSync(lastSync)}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Connection Type:</span>
                <span className="info-value">REST API</span>
              </div>
            </div>
          </div>

          {/* Sync Statistics */}
          <div className="info-section">
            <h3>Sync Statistics</h3>
            <div className="info-items">
              <div className="info-item">
                <span className="info-label">Synced Units:</span>
                <span className="info-value">{connectionData.syncedUnits || 0}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Synced Residents:</span>
                <span className="info-value">{connectionData.syncedResidents || 0}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Data Accuracy:</span>
                <span className="info-value">98.5%</span>
              </div>
            </div>
          </div>

          {/* Health Metrics */}
          <div className="info-section">
            <h3>Health Metrics</h3>
            <div className="info-items">
              <div className="info-item">
                <span className="info-label">API Response Time:</span>
                <span className="info-value">245ms</span>
              </div>
              <div className="info-item">
                <span className="info-label">Success Rate:</span>
                <span className="info-value">99.2%</span>
              </div>
              <div className="info-item">
                <span className="info-label">Last Error:</span>
                <span className="info-value">None</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon">📥</div>
            <div className="activity-content">
              <p className="activity-title">Unit data synchronized</p>
              <p className="activity-time">{formatLastSync(lastSync)}</p>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">👥</div>
            <div className="activity-content">
              <p className="activity-title">Resident information updated</p>
              <p className="activity-time">25 minutes ago</p>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">🔄</div>
            <div className="activity-content">
              <p className="activity-title">Occupancy status refreshed</p>
              <p className="activity-time">1 hour ago</p>
            </div>
          </div>
        </div>
      </div>

      {/* Connection Health Status */}
      <div className="health-status">
        <div className="health-indicator">
          <div className="health-bar">
            <div className="health-fill" style={{ width: '95%' }}></div>
          </div>
          <span className="health-label">Connection Health: 95%</span>
        </div>
        <p className="health-description">
          Your connection is performing well. Last health check: {formatLastSync(lastSync)}
        </p>
      </div>
    </div>
  );
};

CurrentConnection.propTypes = {
  connectionData: PropTypes.shape({
    accountName: PropTypes.string.isRequired,
    connectionStatus: PropTypes.string.isRequired,
    syncedUnits: PropTypes.number,
    syncedResidents: PropTypes.number,
    vendor: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  lastSync: PropTypes.string
};

CurrentConnection.defaultProps = {
  lastSync: null
};

export default CurrentConnection;