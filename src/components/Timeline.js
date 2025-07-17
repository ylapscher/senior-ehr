import React from 'react';
import './Timeline.css';

const Timeline = () => {
  const events = [
    {
      id: 1,
      type: 'assessment',
      title: 'Fall Risk Assessment Completed',
      description: 'Moderate risk level identified, safety plan updated',
      timestamp: '2024-03-20 14:30',
      staff: 'Nurse Sarah Wilson',
      icon: '📝',
      priority: 'medium'
    },
    {
      id: 2,
      type: 'medication',
      title: 'Medication Administration',
      description: 'Morning medications administered successfully',
      timestamp: '2024-03-20 09:00',
      staff: 'CNA Mike Johnson',
      icon: '💊',
      priority: 'low'
    },
    {
      id: 3,
      type: 'transfer',
      title: 'Room Transfer',
      description: 'Moved from A-201 to A-204 (resident request)',
      timestamp: '2024-03-19 16:45',
      staff: 'Facilities Team',
      icon: '🏠',
      priority: 'high'
    },
    {
      id: 4,
      type: 'incident',
      title: 'Minor Fall Incident',
      description: 'Resident slipped in bathroom, no injuries sustained',
      timestamp: '2024-03-18 11:20',
      staff: 'Nurse Jennifer Adams',
      icon: '⚠️',
      priority: 'high'
    },
    {
      id: 5,
      type: 'care',
      title: 'Care Plan Review',
      description: 'Quarterly care plan review completed with family',
      timestamp: '2024-03-15 10:00',
      staff: 'Care Coordinator Lisa Chen',
      icon: '📋',
      priority: 'medium'
    },
    {
      id: 6,
      type: 'medical',
      title: 'Physician Visit',
      description: 'Routine check-up with Dr. Johnson, vitals normal',
      timestamp: '2024-03-10 14:15',
      staff: 'Dr. Sarah Johnson',
      icon: '👨‍⚕️',
      priority: 'low'
    }
  ];

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="timeline-container">
      <div className="timeline-header">
        <h2>Recent Care Events</h2>
        <button className="filter-btn">
          🔍 Filter Events
        </button>
      </div>
      
      <div className="timeline">
        {events.map((event, index) => (
          <div key={event.id} className={`timeline-item ${event.priority}`}>
            <div className="timeline-marker">
              <span className="timeline-icon">{event.icon}</span>
            </div>
            
            <div className="timeline-content">
              <div className="timeline-header-info">
                <h3 className="timeline-title">{event.title}</h3>
                <div className="timeline-meta">
                  <span className="timeline-date">{formatDate(event.timestamp)}</span>
                  <span className="timeline-time">{formatTime(event.timestamp)}</span>
                </div>
              </div>
              
              <p className="timeline-description">{event.description}</p>
              
              <div className="timeline-footer">
                <span className="timeline-staff">{event.staff}</span>
                <span className={`timeline-priority ${event.priority}`}>
                  {event.priority === 'high' ? '🔴' : event.priority === 'medium' ? '🟡' : '🟢'}
                </span>
              </div>
            </div>
            
            {index < events.length - 1 && <div className="timeline-connector"></div>}
          </div>
        ))}
      </div>
      
      <div className="timeline-footer">
        <button className="load-more-btn">
          Load More Events
        </button>
      </div>
    </div>
  );
};

export default Timeline;