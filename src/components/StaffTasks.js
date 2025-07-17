import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './StaffTasks.css';
import MobileNavbar from './MobileNavbar';
import Sidebar from './Sidebar';
import TaskList from './TaskList';
import AddTaskForm from './AddTaskForm';

// Mock data for staff members
const STAFF_MEMBERS = [
  { id: 1, name: 'Sarah Johnson', role: 'RN' },
  { id: 2, name: 'Michael Chen', role: 'LPN' },
  { id: 3, name: 'Emily Rodriguez', role: 'CNA' },
  { id: 4, name: 'David Thompson', role: 'Medication Tech' },
  { id: 5, name: 'Lisa Park', role: 'RN' },
  { id: 6, name: 'James Wilson', role: 'Physical Therapist' }
];

// Mock initial tasks data
const INITIAL_TASKS = [
  {
    id: 1,
    title: 'Administer morning medications',
    description: 'Administer meds to Mr. Lee at 9:30am - includes blood pressure medication and vitamins',
    assignedStaff: 'Sarah Johnson',
    status: 'pending',
    priority: 'high',
    dueTime: '9:30 AM',
    createdAt: new Date('2024-01-15T08:00:00')
  },
  {
    id: 2,
    title: 'Check vitals - Room 203',
    description: 'Complete vital signs check for Mrs. Anderson including blood pressure, temperature, and pulse',
    assignedStaff: 'Michael Chen',
    status: 'in-progress',
    priority: 'medium',
    dueTime: '10:00 AM',
    createdAt: new Date('2024-01-15T08:15:00')
  },
  {
    id: 3,
    title: 'Physical therapy session',
    description: 'Scheduled PT session with Mr. Garcia for mobility exercises',
    assignedStaff: 'James Wilson',
    status: 'completed',
    priority: 'medium',
    dueTime: '11:00 AM',
    createdAt: new Date('2024-01-15T07:30:00')
  },
  {
    id: 4,
    title: 'Meal assistance - Dining Room',
    description: 'Assist residents with lunch service and dietary requirements',
    assignedStaff: 'Emily Rodriguez',
    status: 'pending',
    priority: 'low',
    dueTime: '12:00 PM',
    createdAt: new Date('2024-01-15T08:45:00')
  }
];

const StaffTasks = ({ currentView, onNavigate }) => {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Add new task to the list
  const handleAddTask = (newTask) => {
    const task = {
      ...newTask,
      id: Date.now(), // Simple ID generation for demo
      createdAt: new Date()
    };
    setTasks(prevTasks => [task, ...prevTasks]);
    setIsAddTaskModalOpen(false);
  };

  // Toggle task completion status
  const handleToggleComplete = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
          : task
      )
    );
  };

  // Delete task from list
  const handleDeleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  // Update task status
  const handleUpdateTaskStatus = (taskId, newStatus) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  // Calculate task statistics
  const taskStats = {
    total: tasks.length,
    pending: tasks.filter(task => task.status === 'pending').length,
    inProgress: tasks.filter(task => task.status === 'in-progress').length,
    completed: tasks.filter(task => task.status === 'completed').length
  };

  return (
    <div className="staff-tasks-page">
      <MobileNavbar 
        currentView={currentView} 
        onNavigate={onNavigate}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <Sidebar 
        currentView={currentView} 
        onNavigate={onNavigate}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      <div className="main-content">
        <div className="page-header">
          <div className="header-content">
            <div className="header-left">
              <div className="title-section">
                <h1 className="page-title">Staff Tasks</h1>
                <p className="page-subtitle">Manage and track daily tasks for your care team</p>
              </div>
            </div>
          </div>
          
          <button
            className="add-task-btn primary"
            onClick={() => setIsAddTaskModalOpen(true)}
            aria-label="Add new task"
          >
            <span className="btn-icon">+</span>
            Add New Task
          </button>
        </div>

        {/* Task Statistics */}
        <div className="task-stats">
          <div className="stat-card">
            <span className="stat-number">{taskStats.total}</span>
            <span className="stat-label">Total Tasks</span>
          </div>
          <div className="stat-card">
            <span className="stat-number pending">{taskStats.pending}</span>
            <span className="stat-label">Pending</span>
          </div>
          <div className="stat-card">
            <span className="stat-number in-progress">{taskStats.inProgress}</span>
            <span className="stat-label">In Progress</span>
          </div>
          <div className="stat-card">
            <span className="stat-number completed">{taskStats.completed}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>

        {/* Task List */}
        <TaskList
          tasks={tasks}
          onToggleComplete={handleToggleComplete}
          onDeleteTask={handleDeleteTask}
          onUpdateTaskStatus={handleUpdateTaskStatus}
        />

        {/* Add Task Modal */}
        {isAddTaskModalOpen && (
          <AddTaskForm
            isOpen={isAddTaskModalOpen}
            onClose={() => setIsAddTaskModalOpen(false)}
            onAddTask={handleAddTask}
            staffMembers={STAFF_MEMBERS}
          />
        )}
      </div>
    </div>
  );
};

StaffTasks.propTypes = {
  currentView: PropTypes.string.isRequired,
  onNavigate: PropTypes.func.isRequired
};

export default StaffTasks;