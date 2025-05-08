// ParentDashboard.js
import React from 'react';
import { useAuth } from '../../context/AuthContext';

const ParentDashboard = () => {
  const { user, logout } = useAuth();
  
  return (
    <div className="dashboard parent-dashboard">
      <h1>Parent Dashboard</h1>
      <p>Welcome, {user?.name || 'Parent'}!</p>
      <p>You can view your children's progress here.</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default ParentDashboard;