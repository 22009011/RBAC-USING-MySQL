// DefaultDashboard.js
import React from 'react';
import { useAuth } from '../../context/AuthContext';

const DefaultDashboard = () => {
  const { user, logout } = useAuth();
  
  return (
    <div className="dashboard default-dashboard">
      <h1>Dashboard</h1>
      <p>Welcome, {user?.name || 'User'}!</p>
      <p>This is the default dashboard.</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default DefaultDashboard;