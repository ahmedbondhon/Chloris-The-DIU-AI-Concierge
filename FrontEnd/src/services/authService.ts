import api from './api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  full_name: string;
  student_id: string;
  email: string;
  password: string;
  department?: string;
  semester?: string;
  batch?: string;
  phone?: string;
}

export const authService = {
  // 1. Log In
  login: async (credentials: LoginCredentials) => {
    // Note: OAuth2PasswordRequestForm expects username instead of email
    const formData = new FormData();
    formData.append('username', credentials.email);
    formData.append('password', credentials.password);

    const response = await api.post('auth/login', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    return response.data;
  },

  // 1.5 Sign Up
  signup: async (userData: RegisterCredentials) => {
    const response = await api.post('auth/signup', userData);
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
    const response = await api.get('auth/me');
    return response.data;
  },

  // 4. Password Recovery
  recoverPassword: async (email: string) => {
    const response = await api.post(`auth/recover-password?email=${encodeURIComponent(email)}`);
    return response.data;
  },

  // 5. Reset Password
  resetPassword: async (data: { email: string; password: any }) => {
    const response = await api.post('auth/reset-password', data);
    return response.data;
  }
};