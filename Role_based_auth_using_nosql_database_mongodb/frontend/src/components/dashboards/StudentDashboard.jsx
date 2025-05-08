// StudentDashboard.js
import React from 'react';
import { useAuth } from '../../context/AuthContext';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  
  return (
    <div className="dashboard student-dashboard">
      <h1>Student Dashboard</h1>
      <p>Welcome, {user?.name || 'Student'}!</p>
      <p>You can access your courses and assignments here.</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default StudentDashboard;