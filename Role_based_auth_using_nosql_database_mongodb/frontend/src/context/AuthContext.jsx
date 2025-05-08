import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      checkUserRole();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      localStorage.setItem('token', response.token);
      setUser(response.user);
      
      // Redirect based on role
      redirectBasedOnRole(response.user.role);
      
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  const checkUserRole = async () => {
    setLoading(true);
    try {
      const userData = await authService.getUserData();
      setUser(userData);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      localStorage.removeItem('token');
      setUser(null);
      setLoading(false);
      navigate('/login');
    }
  };

  const redirectBasedOnRole = (role) => {
    switch(role) {
      case 'admin':
        navigate('/admin-dashboard');
        break;
      case 'teacher':
        navigate('/teacher-dashboard');
        break;
      case 'parent':
        navigate('/parent-dashboard');
        break;
      case 'student':
        navigate('/student-dashboard');
        break;
      default:
        navigate('/dashboard');
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    checkUserRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;