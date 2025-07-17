import React from 'react';
import PropTypes from 'prop-types';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onToggleComplete, onDeleteTask, onUpdateTaskStatus }) => {
  // Show empty state if no tasks
  if (tasks.length === 0) {
    return (
      <div className="tasks-container">
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h3 className="empty-title">No staff tasks yet — add your first one!</h3>
          <p className="empty-description">
            Create tasks to help your care team stay organized and ensure quality resident care.
          </p>
        </div>
      </div>
    );
  }

  // Group tasks by status for better organization
  const groupedTasks = {
    pending: tasks.filter(task => task.status === 'pending'),
    'in-progress': tasks.filter(task => task.status === 'in-progress'),
    completed: tasks.filter(task => task.status === 'completed')
  };

  const statusLabels = {
    pending: 'Pending Tasks',
    'in-progress': 'In Progress',
    completed: 'Completed Tasks'
  };

  return (
    <div className="tasks-container">
      <div className="task-groups">
        {Object.entries(groupedTasks).map(([status, statusTasks]) => (
          statusTasks.length > 0 && (
            <div key={status} className={`task-group ${status}`}>
              <h3 className="group-title">
                {statusLabels[status]}
                <span className="task-count">({statusTasks.length})</span>
              </h3>
              
              <div className="task-list">
                {statusTasks.map(task => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggleComplete={onToggleComplete}
                    onDeleteTask={onDeleteTask}
                    onUpdateTaskStatus={onUpdateTaskStatus}
                  />
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      assignedStaff: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['pending', 'in-progress', 'completed']).isRequired,
      priority: PropTypes.oneOf(['low', 'medium', 'high']),
      dueTime: PropTypes.string,
      createdAt: PropTypes.instanceOf(Date)
    })
  ).isRequired,
  onToggleComplete: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onUpdateTaskStatus: PropTypes.func.isRequired
};

export default TaskList;