import React, { useState } from 'react';
import './ComplianceReports.css';
import Sidebar from './Sidebar';

const ComplianceReports = ({ currentView, onNavigate }) => {
  // Mock data for facilities
  const facilities = [
    { id: '1', name: 'Sunset Manor', code: 'SM001', location: 'Building A' },
    { id: '2', name: 'Garden View', code: 'GV002', location: 'Building B' },
    { id: '3', name: 'Riverside Care', code: 'RC003', location: 'Building C' }
  ];

  // Mock data for compliance reports
  const mockReports = [
    {
      id: 'RPT001',
      title: 'Monthly Incident Log Report',
      type: 'incident',
      description: 'Comprehensive incident tracking and analysis',
      status: 'pending',
      dueDate: '2024-07-25',
      lastUpdated: '2024-07-15',
      facility: '1',
      reportPeriod: { startDate: '2024-06-01', endDate: '2024-06-30' },
      isScheduled: true,
      scheduleFrequency: 'monthly',
      assignedTo: 'Sarah Johnson',
      tags: ['regulatory', 'monthly']
    },
    {
      id: 'RPT002',
      title: 'Medication Audit Q2 2024',
      type: 'medication',
      description: 'Quarterly medication administration audit',
      status: 'submitted',
      dueDate: '2024-07-15',
      lastUpdated: '2024-07-10',
      facility: '2',
      reportPeriod: { startDate: '2024-04-01', endDate: '2024-06-30' },
      isScheduled: true,
      scheduleFrequency: 'quarterly',
      assignedTo: 'Michael Chen',
      tags: ['emar', 'quarterly']
    },
    {
      id: 'RPT003',
      title: 'Resident Care Assessment',
      type: 'resident-care',
      description: 'Monthly resident care quality assessment',
      status: 'approved',
      dueDate: '2024-07-20',
      lastUpdated: '2024-07-12',
      facility: '1',
      reportPeriod: { startDate: '2024-06-01', endDate: '2024-06-30' },
      isScheduled: false,
      assignedTo: 'Lisa Wilson',
      tags: ['care-plan', 'assessment']
    },
    {
      id: 'RPT004',
      title: 'Staff Certification Renewal',
      type: 'staff-certifications',
      description: 'Annual staff certification status report',
      status: 'overdue',
      dueDate: '2024-07-01',
      lastUpdated: '2024-06-28',
      facility: '3',
      reportPeriod: { startDate: '2023-07-01', endDate: '2024-06-30' },
      isScheduled: true,
      scheduleFrequency: 'annually',
      assignedTo: 'David Martinez',
      tags: ['hr', 'certifications']
    }
  ];

  // Mock data for report history
  const mockHistory = [
    {
      id: 'H001',
      reportId: 'RPT001',
      user: 'Sarah Johnson',
      userRole: 'Care Manager',
      action: 'download_pdf',
      timestamp: '2024-07-15T10:30:00Z',
      details: 'Downloaded for review',
      success: true
    },
    {
      id: 'H002',
      reportId: 'RPT002',
      user: 'Michael Chen',
      userRole: 'Pharmacist',
      action: 'submit_electronic',
      timestamp: '2024-07-10T14:15:00Z',
      details: 'Submitted to regulatory authority',
      success: true
    },
    {
      id: 'H003',
      reportId: 'RPT003',
      user: 'Admin User',
      userRole: 'Administrator',
      action: 'download_csv',
      timestamp: '2024-07-12T09:45:00Z',
      details: 'Data export for analysis',
      success: false
    }
  ];

  // State management
  const [reports, setReports] = useState(mockReports);
  const [reportHistory, setReportHistory] = useState(mockHistory);
  const [statusMessages, setStatusMessages] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({
    reportType: 'all',
    dateRange: { startDate: '', endDate: '' },
    facility: 'all',
    status: 'all'
  });

  // Filter reports based on current filter settings
  const filteredReports = reports.filter(report => {
    const matchesType = filters.reportType === 'all' || report.type === filters.reportType;
    const matchesFacility = filters.facility === 'all' || report.facility === filters.facility;
    const matchesStatus = filters.status === 'all' || report.status === filters.status;
    
    let matchesDateRange = true;
    if (filters.dateRange.startDate && filters.dateRange.endDate) {
      const reportDate = new Date(report.dueDate);
      const startDate = new Date(filters.dateRange.startDate);
      const endDate = new Date(filters.dateRange.endDate);
      matchesDateRange = reportDate >= startDate && reportDate <= endDate;
    }
    
    return matchesType && matchesFacility && matchesStatus && matchesDateRange;
  });

  // Add status message
  const addStatusMessage = (type, message, autoHide = true) => {
    const newMessage = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: new Date().toISOString(),
      autoHide
    };
    
    setStatusMessages(prev => [...prev, newMessage]);
    
    if (autoHide) {
      setTimeout(() => {
        setStatusMessages(prev => prev.filter(msg => msg.id !== newMessage.id));
      }, 5000);
    }
  };

  // Handle report actions
  const handleReportAction = (reportId, action) => {
    const report = reports.find(r => r.id === reportId);
    if (!report) return;
    
    // Simulate action processing
    const success = Math.random() > 0.1; // 90% success rate
    
    // Add to history
    const historyEntry = {
      id: Date.now().toString(),
      reportId,
      user: 'Current User',
      userRole: 'Administrator',
      action,
      timestamp: new Date().toISOString(),
      success
    };
    
    setReportHistory(prev => [historyEntry, ...prev]);
    
    // Show status message
    if (success) {
      switch (action) {
        case 'download_pdf':
          addStatusMessage('success', `PDF downloaded successfully for ${report.title}`);
          break;
        case 'download_csv':
          addStatusMessage('success', `CSV downloaded successfully for ${report.title}`);
          break;
        case 'submit_electronic':
          addStatusMessage('success', `Report submitted electronically: ${report.title}`);
          // Update report status
          setReports(prev => prev.map(r => 
            r.id === reportId ? { ...r, status: 'submitted' } : r
          ));
          break;
        default:
          addStatusMessage('success', `Action completed successfully for ${report.title}`);
          break;
      }
    } else {
      addStatusMessage('error', `Failed to ${action.replace('_', ' ')} ${report.title}. Please try again.`);
    }
  };

  // Get facility name by id
  const getFacilityName = (facilityId) => {
    const facility = facilities.find(f => f.id === facilityId);
    return facility ? facility.name : 'Unknown Facility';
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'approved': return 'status-approved';
      case 'submitted': return 'status-submitted';
      case 'pending': return 'status-pending';
      case 'overdue': return 'status-overdue';
      case 'rejected': return 'status-rejected';
      default: return 'status-pending';
    }
  };

  // Get report type icon
  const getReportTypeIcon = (type) => {
    switch (type) {
      case 'incident': return '⚠️';
      case 'medication': return '💊';
      case 'resident-care': return '🏥';
      case 'staff-certifications': return '📋';
      default: return '📄';
    }
  };

  return (
    <div className="compliance-reports">
      <Sidebar 
        currentView={currentView} 
        onNavigate={onNavigate}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="reports-content">
        <div className="reports-header">
          <div className="header-left">
            <button 
              className="mobile-menu-btn"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open menu"
            >
              ☰
            </button>
            <h1>Compliance Reports</h1>
          </div>
          <div className="header-actions">
            <button className="btn btn-primary">
              📊 Generate Report
            </button>
          </div>
        </div>

        {/* Status Messages */}
        {statusMessages.length > 0 && (
          <div className="status-messages">
            {statusMessages.map(message => (
              <div key={message.id} className={`status-message ${message.type}`}>
                <span className="message-text">{message.message}</span>
                <button 
                  className="close-message"
                  onClick={() => setStatusMessages(prev => prev.filter(msg => msg.id !== message.id))}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Filters */}
        <div className="filters-section">
          <div className="filters-grid">
            <div className="filter-group">
              <label htmlFor="report-type">Report Type</label>
              <select 
                id="report-type"
                value={filters.reportType}
                onChange={(e) => setFilters(prev => ({ ...prev, reportType: e.target.value }))}
                className="filter-select"
              >
                <option value="all">All Types</option>
                <option value="incident">Incident Reports</option>
                <option value="medication">Medication Audits</option>
                <option value="resident-care">Resident Care</option>
                <option value="staff-certifications">Staff Certifications</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="facility">Facility</label>
              <select 
                id="facility"
                value={filters.facility}
                onChange={(e) => setFilters(prev => ({ ...prev, facility: e.target.value }))}
                className="filter-select"
              >
                <option value="all">All Facilities</option>
                {facilities.map(facility => (
                  <option key={facility.id} value={facility.id}>{facility.name}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="start-date">Start Date</label>
              <input
                type="date"
                id="start-date"
                value={filters.dateRange.startDate}
                onChange={(e) => setFilters(prev => ({ 
                  ...prev, 
                  dateRange: { ...prev.dateRange, startDate: e.target.value }
                }))}
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label htmlFor="end-date">End Date</label>
              <input
                type="date"
                id="end-date"
                value={filters.dateRange.endDate}
                onChange={(e) => setFilters(prev => ({ 
                  ...prev, 
                  dateRange: { ...prev.dateRange, endDate: e.target.value }
                }))}
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label htmlFor="status">Status</label>
              <select 
                id="status"
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="filter-select"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="submitted">Submitted</option>
                <option value="approved">Approved</option>
                <option value="overdue">Overdue</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reports Table */}
        <div className="reports-table-container">
          <div className="table-header">
            <h2>Available Reports ({filteredReports.length})</h2>
          </div>
          
          <div className="reports-table">
            {filteredReports.length === 0 ? (
              <div className="no-reports">
                <p>No reports match the current filters.</p>
              </div>
            ) : (
              <div className="table-content">
                {filteredReports.map(report => (
                  <div key={report.id} className="report-card">
                    <div className="report-header">
                      <div className="report-title">
                        <span className="report-icon">{getReportTypeIcon(report.type)}</span>
                        <div className="title-info">
                          <h3>{report.title}</h3>
                          <p className="report-description">{report.description}</p>
                        </div>
                      </div>
                      <div className="report-status">
                        <span className={`status-badge ${getStatusBadgeClass(report.status)}`}>
                          {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="report-details">
                      <div className="detail-item">
                        <span className="detail-label">Facility:</span>
                        <span className="detail-value">{getFacilityName(report.facility)}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Due Date:</span>
                        <span className="detail-value">{formatDate(report.dueDate)}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Assigned To:</span>
                        <span className="detail-value">{report.assignedTo}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Period:</span>
                        <span className="detail-value">
                          {formatDate(report.reportPeriod.startDate)} - {formatDate(report.reportPeriod.endDate)}
                        </span>
                      </div>
                    </div>
                    
                    {report.isScheduled && (
                      <div className="schedule-info">
                        <span className="schedule-badge">
                          🔄 {report.scheduleFrequency} schedule
                        </span>
                      </div>
                    )}
                    
                    <div className="report-actions">
                      <button
                        className="action-btn btn-pdf"
                        onClick={() => handleReportAction(report.id, 'download_pdf')}
                        title="Download PDF"
                      >
                        📄 PDF
                      </button>
                      <button
                        className="action-btn btn-csv"
                        onClick={() => handleReportAction(report.id, 'download_csv')}
                        title="Download CSV"
                      >
                        📊 CSV
                      </button>
                      <button
                        className="action-btn btn-submit"
                        onClick={() => handleReportAction(report.id, 'submit_electronic')}
                        title="Submit Electronically"
                        disabled={report.status === 'submitted'}
                      >
                        📤 Submit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* History Section */}
        <div className="history-section">
          <h2>Recent Activity</h2>
          <div className="history-list">
            {reportHistory.slice(0, 10).map(entry => (
              <div key={entry.id} className="history-item">
                <div className="history-icon">
                  {entry.success ? '✅' : '❌'}
                </div>
                <div className="history-content">
                  <div className="history-main">
                    <span className="history-user">{entry.user}</span>
                    <span className="history-action">
                      {entry.action.replace('_', ' ')} 
                    </span>
                    <span className="history-report">
                      {reports.find(r => r.id === entry.reportId)?.title || 'Unknown Report'}
                    </span>
                  </div>
                  <div className="history-meta">
                    <span className="history-time">
                      {formatDate(entry.timestamp)}
                    </span>
                    <span className="history-role">{entry.userRole}</span>
                    {entry.details && (
                      <span className="history-details">{entry.details}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceReports;