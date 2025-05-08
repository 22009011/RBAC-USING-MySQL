import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './components/Register';
import Login from './components/Login';
import AdminDashboard from './components/dashboards/AdminDashboard';
import TeacherDashboard from './components/dashboards/TeacherDashboard';
import ParentDashboard from './components/dashboards/ParentDashboard';
import StudentDashboard from './components/dashboards/StudentDashboard';
import DefaultDashboard from './components/dashboards/DefaultDashboard';
import './App.css';

const App = () => {
  return (
    <Router>
      {/* We need to place the AuthProvider inside Router because it uses useNavigate */}
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected routes with role-based access */}
          <Route 
            path="/admin-dashboard" 
            element={
              <ProtectedRoute 
                element={<AdminDashboard />} 
                allowedRoles={['admin']} 
              />
            } 
          />
          
          <Route 
            path="/teacher-dashboard" 
            element={
              <ProtectedRoute 
                element={<TeacherDashboard />} 
                allowedRoles={['admin', 'teacher']} 
              />
            } 
          />
          
          <Route 
            path="/parent-dashboard" 
            element={
              <ProtectedRoute 
                element={<ParentDashboard />} 
                allowedRoles={['parent']} 
              />
            } 
          />
          
          <Route 
            path="/student-dashboard" 
            element={
              <ProtectedRoute 
                element={<StudentDashboard />} 
                allowedRoles={['student']} 
              />
            } 
          />
          
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute 
                element={<DefaultDashboard />} 
                allowedRoles={['admin', 'teacher', 'parent', 'student']} 
              />
            } 
          />
          
          {/* Redirect root to login or dashboard based on auth status */}
          <Route path="/" element={<Navigate to="/login" />} />
          
          {/* Catch all other routes and redirect to dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;