import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AddTaskForm = ({ isOpen, onClose, onAddTask, staffMembers }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedStaff: '',
    status: 'pending',
    priority: 'medium',
    dueTime: ''
  });

  const [errors, setErrors] = useState({});

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required';
    }

    if (!formData.assignedStaff) {
      newErrors.assignedStaff = 'Please assign this task to a staff member';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Task description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Create new task object
    const newTask = {
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim()
    };

    // Call parent handler
    onAddTask(newTask);

    // Reset form
    setFormData({
      title: '',
      description: '',
      assignedStaff: '',
      status: 'pending',
      priority: 'medium',
      dueTime: ''
    });
    setErrors({});
  };

  // Handle modal close
  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      assignedStaff: '',
      status: 'pending',
      priority: 'medium',
      dueTime: ''
    });
    setErrors({});
    onClose();
  };

  // Don't render if not open
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content add-task-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Add New Task</h2>
          <button
            className="modal-close"
            onClick={handleClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="add-task-form">
          <div className="form-group">
            <label htmlFor="task-title" className="form-label">
              Task Title *
            </label>
            <input
              type="text"
              id="task-title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={`form-input ${errors.title ? 'error' : ''}`}
              placeholder="Enter task title..."
              maxLength={100}
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="task-description" className="form-label">
              Description *
            </label>
            <textarea
              id="task-description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={`form-textarea ${errors.description ? 'error' : ''}`}
              placeholder="Describe the task in detail..."
              rows={4}
              maxLength={500}
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="assigned-staff" className="form-label">
                Assign to Staff *
              </label>
              <select
                id="assigned-staff"
                name="assignedStaff"
                value={formData.assignedStaff}
                onChange={handleInputChange}
                className={`form-select ${errors.assignedStaff ? 'error' : ''}`}
              >
                <option value="">Select staff member...</option>
                {staffMembers.map(staff => (
                  <option key={staff.id} value={staff.name}>
                    {staff.name} ({staff.role})
                  </option>
                ))}
              </select>
              {errors.assignedStaff && <span className="error-message">{errors.assignedStaff}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="task-priority" className="form-label">
                Priority
              </label>
              <select
                id="task-priority"
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="task-status" className="form-label">
                Initial Status
              </label>
              <select
                id="task-status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="due-time" className="form-label">
                Due Time (Optional)
              </label>
              <input
                type="text"
                id="due-time"
                name="dueTime"
                value={formData.dueTime}
                onChange={handleInputChange}
                className="form-input"
                placeholder="e.g., 10:30 AM"
              />
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={handleClose}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              <span className="btn-icon">+</span>
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

AddTaskForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddTask: PropTypes.func.isRequired,
  staffMembers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired
    })
  ).isRequired
};

export default AddTaskForm;