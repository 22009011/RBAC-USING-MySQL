// TeacherDashboard.js
import React from 'react';
import { useAuth } from '../../context/AuthContext';

const TeacherDashboard = () => {
  const { user, logout } = useAuth();
  
  return (
    <div className="dashboard teacher-dashboard">
      <h1>Teacher Dashboard</h1>
      <p>Welcome, {user?.name || 'Teacher'}!</p>
      <p>You can manage your classes and students here.</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default TeacherDashboard;