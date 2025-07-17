import React, { useState } from 'react';
import './IncidentReportModal.css';

const IncidentReportModal = ({ isOpen, onClose, residentName }) => {
  const [formData, setFormData] = useState({
    incidentType: '',
    dateTime: '',
    description: '',
    photos: [],
    regulatoryReport: false,
    severity: 'low'
  });

  const [errors, setErrors] = useState({});
  const [isDragging, setIsDragging] = useState(false);

  const incidentTypes = [
    { value: 'fall', label: 'Fall Incident' },
    { value: 'medication-error', label: 'Medication Error' },
    { value: 'injury', label: 'Injury/Accident' },
    { value: 'behavioral', label: 'Behavioral Incident' },
    { value: 'medical-emergency', label: 'Medical Emergency' },
    { value: 'equipment-failure', label: 'Equipment Failure' },
    { value: 'security', label: 'Security Incident' },
    { value: 'other', label: 'Other' }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.incidentType) {
      newErrors.incidentType = 'Incident type is required';
    }
    
    if (!formData.dateTime) {
      newErrors.dateTime = 'Date and time are required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const handleFileUpload = (files) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => {
      return file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024; // 5MB limit
    });
    
    if (validFiles.length < fileArray.length) {
      alert('Some files were rejected. Please ensure files are images under 5MB.');
    }
    
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...validFiles].slice(0, 3) // Max 3 photos
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleFileUpload(files);
  };

  const removePhoto = (index) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (action) => {
    if (action === 'submit' && !validateForm()) {
      return;
    }

    const submissionData = {
      ...formData,
      action,
      timestamp: new Date().toISOString(),
      residentName
    };

    console.log('Incident report:', submissionData);
    
    // Here you would typically send the data to your backend
    onClose();
    
    // Reset form
    setFormData({
      incidentType: '',
      dateTime: '',
      description: '',
      photos: [],
      regulatoryReport: false,
      severity: 'low'
    });
    setErrors({});
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="incident-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Report New Incident</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <form className="incident-form">
            <div className="form-section">
              <div className="form-group">
                <label htmlFor="incident-type" className="form-label">
                  Incident Type *
                </label>
                <select
                  id="incident-type"
                  value={formData.incidentType}
                  onChange={(e) => handleInputChange('incidentType', e.target.value)}
                  className={`form-select ${errors.incidentType ? 'error' : ''}`}
                >
                  <option value="">Select incident type...</option>
                  {incidentTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                {errors.incidentType && (
                  <span className="error-message">{errors.incidentType}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="date-time" className="form-label">
                  Date & Time *
                </label>
                <input
                  type="datetime-local"
                  id="date-time"
                  value={formData.dateTime}
                  onChange={(e) => handleInputChange('dateTime', e.target.value)}
                  className={`form-input ${errors.dateTime ? 'error' : ''}`}
                  max={getCurrentDateTime()}
                />
                {errors.dateTime && (
                  <span className="error-message">{errors.dateTime}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="severity" className="form-label">
                  Severity Level
                </label>
                <select
                  id="severity"
                  value={formData.severity}
                  onChange={(e) => handleInputChange('severity', e.target.value)}
                  className="form-select"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>

            <div className="form-section">
              <div className="form-group">
                <label htmlFor="description" className="form-label">
                  Description *
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className={`form-textarea ${errors.description ? 'error' : ''}`}
                  placeholder="Provide a detailed description of the incident..."
                  rows="4"
                />
                {errors.description && (
                  <span className="error-message">{errors.description}</span>
                )}
                <div className="character-count">
                  {formData.description.length} characters
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Photo Evidence (Optional)
                </label>
                <div
                  className={`photo-upload ${isDragging ? 'dragging' : ''}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e.target.files)}
                    className="file-input"
                    id="photo-upload"
                  />
                  <label htmlFor="photo-upload" className="upload-label">
                    📷 Drop photos here or click to select
                    <span className="upload-hint">Max 3 photos, 5MB each</span>
                  </label>
                </div>
                
                {formData.photos.length > 0 && (
                  <div className="photo-preview">
                    {formData.photos.map((photo, index) => (
                      <div key={index} className="photo-item">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt={`Upload ${index + 1}`}
                          className="photo-thumbnail"
                        />
                        <button
                          type="button"
                          className="remove-photo"
                          onClick={() => removePhoto(index)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.regulatoryReport}
                    onChange={(e) => handleInputChange('regulatoryReport', e.target.checked)}
                    className="checkbox-input"
                  />
                  <span className="checkbox-custom"></span>
                  Regulatory report required
                  <span className="checkbox-hint">
                    (Links to compliance dashboard for follow-up)
                  </span>
                </label>
              </div>
            </div>
          </form>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-cancel"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-draft"
            onClick={() => handleSubmit('draft')}
          >
            Save as Draft
          </button>
          <button
            type="button"
            className="btn btn-submit"
            onClick={() => handleSubmit('submit')}
          >
            Submit Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncidentReportModal;