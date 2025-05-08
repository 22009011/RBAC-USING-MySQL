const API_URL = 'http://localhost:7001/api'; // Update with your backend URL

const authService = {
  // Login user
  async login(credentials) {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to login');
      }
      
      return data;
    } catch (error) {
      throw error;
    }
  },
  
  // Get user data and role
  async getUserData() {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      const response = await fetch(`${API_URL}/dashboard/user`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch user data');
      }
      
      return {
        role: data.role,
        redirectUrl: data.redirectUrl,
        // Add other user data as needed
      };
    } catch (error) {
      throw error;
    }
  },
};

export default authService;