// AdminDashboard.js
import React from 'react';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  
  return (
    <div className="dashboard admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user?.name || 'Admin'}!</p>
      <p>You have access to all system features.</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default AdminDashboard;