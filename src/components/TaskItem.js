import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TaskItem = ({ task, onToggleComplete, onDeleteTask, onUpdateTaskStatus }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Get priority color class
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-medium';
    }
  };

  // Get status display info
  const getStatusInfo = (status) => {
    switch (status) {
      case 'pending':
        return { label: 'Pending', class: 'status-pending', icon: '⏳' };
      case 'in-progress':
        return { label: 'In Progress', class: 'status-in-progress', icon: '🔄' };
      case 'completed':
        return { label: 'Completed', class: 'status-completed', icon: '✅' };
      default:
        return { label: 'Unknown', class: 'status-pending', icon: '❓' };
    }
  };

  // Format time for display
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const statusInfo = getStatusInfo(task.status);

  return (
    <div className={`task-item ${task.status} ${getPriorityClass(task.priority)}`}>
      <div className="task-header">
        <div className="task-main-info">
          <div className="task-title-row">
            <h4 className="task-title">{task.title}</h4>
            <div className="task-badges">
              <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
                {task.priority}
              </span>
              <span className={`status-badge ${statusInfo.class}`}>
                <span className="status-icon">{statusInfo.icon}</span>
                {statusInfo.label}
              </span>
            </div>
          </div>
          
          <div className="task-meta">
            <div className="task-staff">
              <span className="meta-icon">👤</span>
              <span className="staff-name">{task.assignedStaff}</span>
            </div>
            {task.dueTime && (
              <div className="task-time">
                <span className="meta-icon">🕐</span>
                <span className="due-time">{task.dueTime}</span>
              </div>
            )}
            <div className="task-created">
              <span className="meta-icon">📅</span>
              <span className="created-time">{formatTime(task.createdAt)}</span>
            </div>
          </div>
        </div>

        <div className="task-actions">
          <button
            className="action-btn expand-btn"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? 'Collapse task details' : 'Expand task details'}
          >
            {isExpanded ? '▼' : '▶'}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="task-details">
          <div className="task-description">
            <h5>Description:</h5>
            <p>{task.description}</p>
          </div>

          <div className="task-controls">
            <div className="status-controls">
              <label htmlFor={`status-${task.id}`}>Update Status:</label>
              <select
                id={`status-${task.id}`}
                value={task.status}
                onChange={(e) => onUpdateTaskStatus(task.id, e.target.value)}
                className="status-select"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="action-buttons">
              <button
                className={`action-btn complete-btn ${task.status === 'completed' ? 'undo' : ''}`}
                onClick={() => onToggleComplete(task.id)}
                aria-label={task.status === 'completed' ? 'Mark as incomplete' : 'Mark as complete'}
              >
                {task.status === 'completed' ? (
                  <>
                    <span className="btn-icon">↶</span>
                    Mark Incomplete
                  </>
                ) : (
                  <>
                    <span className="btn-icon">✓</span>
                    Mark Complete
                  </>
                )}
              </button>

              <button
                className="action-btn delete-btn"
                onClick={() => onDeleteTask(task.id)}
                aria-label="Delete task"
              >
                <span className="btn-icon">🗑</span>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    assignedStaff: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['pending', 'in-progress', 'completed']).isRequired,
    priority: PropTypes.oneOf(['low', 'medium', 'high']),
    dueTime: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date)
  }).isRequired,
  onToggleComplete: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onUpdateTaskStatus: PropTypes.func.isRequired
};

export default TaskItem;