import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { LogIn, ShieldCheck, Sparkles } from 'lucide-react';
import { authService } from '../services/authService';
import { useAuth } from '../context/AuthContext';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.4,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 14 } },
};

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authService.login(formData);
      if (response.access_token) {
        auth.login(response.access_token);
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 overflow-hidden">
      {/* Left Side: Branding (Visible on Desktop) */}
      <motion.div
        initial={{ x: '-10%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:flex w-[45%] bg-[#5b52f1] relative flex-col justify-between p-16 text-white overflow-hidden"
      >
        {/* Background Decorative Animated Circles */}
        <motion.div
          animate={{
            y: [0, -40, 0],
            rotate: [0, 10, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full -mr-64 -mt-64 blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{
            y: [0, 40, 0],
            rotate: [0, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400/20 rounded-full -ml-32 -mb-32 blur-3xl pointer-events-none"
        />

        <div className="relative z-10 flex items-center gap-3">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-white to-slate-50 flex items-center justify-center shadow-2xl p-0.5 overflow-hidden border border-white/50"
          >
            <img src="/logo.png" alt="Chloris Logo" className="w-[90%] h-[90%] object-contain drop-shadow-md" />
          </motion.div>
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-2xl font-black tracking-tight"
          >
            CHLORIS
          </motion.span>
        </div>

        <div className="relative z-10 max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-wider mb-6 border border-white/20"
          >
            <Sparkles size={14} className="text-yellow-300" />
            AI-Powered Student Assistant
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-6xl font-black leading-[1.1] mb-8"
          >
            Manage your <br />
            <span className="text-blue-200">Campus Life</span> <br />
            with Intelligence.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-blue-100 text-lg font-medium leading-relaxed opacity-90"
          >
            Access your grades, scheduled classes, and book study rooms directly from our intelligent student portal.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="relative z-10 flex items-center gap-8 border-t border-white/10 pt-12"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-blue-200 uppercase tracking-widest">Secure Access</p>
              <p className="text-sm font-black">SSO Enabled</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Right Side: Login Form */}
      <motion.div
        initial={{ x: '10%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 flex items-center justify-center p-8 bg-white lg:rounded-l-[2.5rem] shadow-[0_0_60px_-15px_rgba(0,0,0,0.1)] relative z-20"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="w-full max-w-md space-y-10"
        >
          <motion.div variants={itemVariants} className="text-center lg:text-left">
            <div className="lg:hidden flex justify-center mb-8">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-white to-slate-50 flex items-center justify-center shadow-2xl border border-slate-100 p-1 overflow-hidden">
                <img src="/logo.png" alt="Chloris Logo" className="w-[90%] h-[90%] object-contain drop-shadow-sm" />
              </div>
            </div>
            <h1 className="text-4xl font-black text-black tracking-tight uppercase">Sign In</h1>
            <p className="text-black font-bold mt-3">Welcome back! Please enter your details.</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 text-sm font-bold text-rose-600 bg-rose-50 border-2 border-rose-100 rounded-2xl flex items-center gap-3"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse"></div>
                {error}
              </motion.div>
            )}

            <motion.div variants={itemVariants}>
              <Input
                label="Email Address"
                placeholder="example@mail.com"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Input
                label="Password"
                placeholder="••••••••"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center justify-between py-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-5 h-5 rounded-lg border-slate-200 text-[#5b52f1] focus:ring-[#5b52f1]/20 transition-all font-bold" />
                <span className="text-sm font-bold text-black group-hover:text-[#5b52f1] transition-colors uppercase tracking-wider">Remember me</span>
              </label>
              <Link to="/forgot-password" title="reset password" id="forgot-password" className="text-sm font-bold text-[#5b52f1] hover:text-[#4a42d6]">Forgot password?</Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button type="submit" className="w-full py-4 text-base tracking-tight" isLoading={loading}>
                <LogIn size={20} className="mr-3 group-hover:translate-x-1 transition-transform" />
                Sign in to Dashboard
              </Button>
            </motion.div>
          </form>

          <motion.div variants={itemVariants} className="text-center text-black font-black uppercase tracking-widest text-[11px]">
            Don't have an account? <Link to="/register" className="text-[#5b52f1] hover:text-[#4a42d6] underline underline-offset-4 decoration-2">Register Now</Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;