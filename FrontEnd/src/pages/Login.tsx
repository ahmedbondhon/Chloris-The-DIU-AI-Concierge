import React, { useState } from 'react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { LogIn } from 'lucide-react';
import { authService } from '../services/authService';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authService.login(formData);
      // Force a hard refresh to ensure the AuthContext picks up the new token
      window.location.href = '/dashboard';
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 mb-4">
              <span className="text-2xl font-bold">C</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>
            <p className="text-slate-500 mt-2">Sign in to access your student portal.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
                {error}
              </div>
            )}

            <Input 
              label="Student Email" 
              placeholder="student@diu.edu.bd" 
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
            <Input 
              label="Password" 
              placeholder="••••••••" 
              type="password" 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />

            <Button type="submit" className="w-full" isLoading={loading}>
              <LogIn size={20} className="mr-2" />
              Sign In
            </Button>
          </form>
        </div>
      </div>

      {/* Right Side - Branding */}
      <div className="hidden lg:block w-1/2 bg-blue-900 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-slate-900"></div>
        <div className="relative z-10 h-full flex flex-col justify-center px-16 text-white">
          <h2 className="text-4xl font-bold mb-4">Chloris AI Concierge</h2>
          <p className="text-blue-100 text-lg">Your academic assistant for scheduling, grades, and campus info.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;