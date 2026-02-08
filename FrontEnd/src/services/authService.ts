import api from './api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export const authService = {
  // 1. Log In
  login: async (credentials: LoginCredentials) => {
    // Sends email/pass to Python
    const response = await api.post('/login/access-token', credentials);
    
    // Save the "ID Badge" (Token) the backend gives us
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
    }
    return response.data;
  },

  // 2. Log Out
  logout: () => {
    // Throw away the ID Badge and go to login page
    localStorage.removeItem('token');
    window.location.href = '/login';
  },

  // 3. Get User Details (Optional, useful for the Sidebar name)
  me: async () => {
    const response = await api.get('/users/me');
    return response.data;
  }
};