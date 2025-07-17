import React, { useState } from 'react';
import './ResidentProfile.css';
import Sidebar from './Sidebar';
import Timeline from './Timeline';
import IncidentReportModal from './IncidentReportModal';

const ResidentProfile = ({ currentView, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('care-plan');
  const [isIncidentModalOpen, setIsIncidentModalOpen] = useState(false);

  const resident = {
    id: 'RES-001',
    name: 'Margaret Thompson',
    photo: '👵',
    status: 'admitted',
    admissionDate: '2023-03-15',
    apartment: {
      unit: 'A-204',
      building: 'Sunset Wing',
      roomType: 'Private Studio',
      floor: '2nd Floor'
    },
    careLevel: 'Assisted Living',
    primaryCareProvider: 'Dr. Sarah Johnson'
  };

  const tabs = [
    { id: 'care-plan', label: 'Care Plan', icon: '📋' },
    { id: 'medications', label: 'Medications', icon: '💊' },
    { id: 'assessments', label: 'Assessments', icon: '📝' },
    { id: 'family-contacts', label: 'Family Contacts', icon: '👨‍👩‍👧‍👦' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'care-plan':
        return (
          <div className="tab-content">
            <div className="care-plan-section">
              <h3>Current Care Plan</h3>
              <div className="care-item">
                <span className="care-type">Mobility Assistance</span>
                <span className="care-frequency">3x daily</span>
                <span className="care-status active">Active</span>
              </div>
              <div className="care-item">
                <span className="care-type">Medication Management</span>
                <span className="care-frequency">As needed</span>
                <span className="care-status active">Active</span>
              </div>
              <div className="care-item">
                <span className="care-type">Dietary Monitoring</span>
                <span className="care-frequency">Daily</span>
                <span className="care-status active">Active</span>
              </div>
            </div>
          </div>
        );
      case 'medications':
        return (
          <div className="tab-content">
            <div className="medications-section">
              <h3>Current Medications</h3>
              <div className="medication-item">
                <div className="med-info">
                  <span className="med-name">Lisinopril 10mg</span>
                  <span className="med-instructions">Once daily, morning</span>
                </div>
                <span className="med-status current">Current</span>
              </div>
              <div className="medication-item">
                <div className="med-info">
                  <span className="med-name">Metformin 500mg</span>
                  <span className="med-instructions">Twice daily with meals</span>
                </div>
                <span className="med-status current">Current</span>
              </div>
              <div className="medication-item">
                <div className="med-info">
                  <span className="med-name">Vitamin D3 1000IU</span>
                  <span className="med-instructions">Once daily</span>
                </div>
                <span className="med-status current">Current</span>
              </div>
            </div>
          </div>
        );
      case 'assessments':
        return (
          <div className="tab-content">
            <div className="assessments-section">
              <h3>Recent Assessments</h3>
              <div className="assessment-item">
                <div className="assessment-info">
                  <span className="assessment-type">Fall Risk Assessment</span>
                  <span className="assessment-date">March 20, 2024</span>
                </div>
                <span className="assessment-result moderate">Moderate Risk</span>
              </div>
              <div className="assessment-item">
                <div className="assessment-info">
                  <span className="assessment-type">Cognitive Assessment</span>
                  <span className="assessment-date">March 15, 2024</span>
                </div>
                <span className="assessment-result good">Within Normal</span>
              </div>
              <div className="assessment-item">
                <div className="assessment-info">
                  <span className="assessment-type">Nutrition Assessment</span>
                  <span className="assessment-date">March 10, 2024</span>
                </div>
                <span className="assessment-result good">Good</span>
              </div>
            </div>
          </div>
        );
      case 'family-contacts':
        return (
          <div className="tab-content">
            <div className="contacts-section">
              <h3>Family Contacts</h3>
              <div className="contact-item">
                <div className="contact-info">
                  <span className="contact-name">Robert Thompson</span>
                  <span className="contact-relationship">Son (Primary Contact)</span>
                  <span className="contact-phone">(555) 123-4567</span>
                </div>
                <span className="contact-status primary">Primary</span>
              </div>
              <div className="contact-item">
                <div className="contact-info">
                  <span className="contact-name">Jennifer Thompson-Davis</span>
                  <span className="contact-relationship">Daughter</span>
                  <span className="contact-phone">(555) 234-5678</span>
                </div>
                <span className="contact-status secondary">Secondary</span>
              </div>
              <div className="contact-item">
                <div className="contact-info">
                  <span className="contact-name">Dr. Michael Chen</span>
                  <span className="contact-relationship">Primary Physician</span>
                  <span className="contact-phone">(555) 345-6789</span>
                </div>
                <span className="contact-status medical">Medical</span>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Select a tab to view content</div>;
    }
  };

  return (
    <div className="resident-profile">
      <Sidebar currentView={currentView} onNavigate={onNavigate} />
      <div className="profile-content">
        <div className="profile-header">
          <div className="resident-basic-info">
            <div className="resident-photo">
              {resident.photo}
            </div>
            <div className="resident-details">
              <h1 className="resident-name">{resident.name}</h1>
              <div className="resident-meta">
                <span className={`status-badge ${resident.status}`}>
                  {resident.status === 'admitted' ? '✅ Admitted' : '❌ Discharged'}
                </span>
                <span className="resident-id">ID: {resident.id}</span>
              </div>
              <div className="apartment-info">
                <div className="apartment-details">
                  <span className="apartment-unit">{resident.apartment.unit}</span>
                  <span className="apartment-building">{resident.apartment.building}</span>
                  <span className="apartment-type">{resident.apartment.roomType}</span>
                </div>
                <div className="care-info">
                  <span className="care-level">{resident.careLevel}</span>
                  <span className="primary-provider">{resident.primaryCareProvider}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="action-buttons">
            <button className="action-btn primary">
              📝 New Assessment
            </button>
            <button 
              className="action-btn secondary"
              onClick={() => setIsIncidentModalOpen(true)}
            >
              ⚠️ Report Incident
            </button>
          </div>
        </div>

        <div className="profile-tabs">
          <div className="tab-navigation">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
              </button>
            ))}
          </div>
          
          <div className="tab-content-container">
            {renderTabContent()}
          </div>
        </div>

        <div className="timeline-section">
          <Timeline />
        </div>
      </div>
      
      <IncidentReportModal
        isOpen={isIncidentModalOpen}
        onClose={() => setIsIncidentModalOpen(false)}
        residentName={resident.name}
      />
    </div>
  );
};

export default ResidentProfile;