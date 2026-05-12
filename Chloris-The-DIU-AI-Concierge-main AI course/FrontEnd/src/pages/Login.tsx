import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import RetroInput from '../components/retro/RetroInput';
import RetroButton from '../components/retro/RetroButton';
import RetroCard from '../components/retro/RetroCard';
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
    <div className="flex min-h-screen bg-black overflow-hidden font-outfit">
      {/* Left Side: Branding (Visible on Desktop) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex w-[45%] bg-black relative flex-col justify-between p-20 text-white overflow-hidden border-r border-white/5"
      >
        {/* Background Decorative Animated Circles */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full -mr-64 -mt-64 blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full -ml-32 -mb-32 blur-3xl pointer-events-none"
        />

        <div className="relative z-10 flex items-center gap-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center shadow-classic border border-white/10 p-3"
          >
            <img src="/logo.png" alt="Chloris Logo" className="w-full h-full object-contain invert" />
          </motion.div>
          <motion.span
            className="text-3xl font-bold tracking-tight text-white"
          >
            CHLORIS
          </motion.span>
        </div>

        <div className="relative z-10 max-w-lg">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-white/60 rounded-full text-[11px] font-bold uppercase tracking-wider mb-8 border border-white/20"
          >
            <Sparkles size={14} />
            AI-Powered Student Assistant
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl font-bold leading-tight mb-8"
          >
            Manage your <br />
            <span className="text-white italic">Campus Life</span> <br />
            with <span className="opacity-60">Intelligence.</span>
          </motion.h2>

          <motion.p
            className="text-white/40 text-lg font-medium leading-relaxed"
          >
            Access your grades, scheduled classes, and book study rooms directly from our intelligent student portal.
          </motion.p>
        </div>

        <motion.div
          className="relative z-10 flex items-center gap-8 border-t border-white/10 pt-12"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10 shadow-lg">
              <ShieldCheck size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Secure Access</p>
              <p className="text-sm font-bold text-white">SSO ENABLED</p>
            </div>
          </div>
        </motion.div>
      </motion.div>


      {/* Right Side: Login Form */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex-1 flex items-center justify-center p-8 relative z-20"
      >
        <RetroCard variant="primary" className="w-full max-w-md !rounded-3xl border-white/10 shadow-classic-xl space-y-10 p-10 bg-white/5">
          <motion.div variants={itemVariants} className="text-center lg:text-left">
            <div className="lg:hidden flex justify-center mb-8">
              <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center shadow-classic border border-white/10 p-3">
                <img src="/logo.png" alt="Chloris Logo" className="w-full h-full object-contain invert" />
              </div>
            </div>
            <h1 className="text-5xl font-extrabold text-white tracking-tight mb-3">Sign In</h1>
            <p className="text-white/40 font-medium tracking-wide text-sm">Welcome back! Please enter your details.</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 text-sm font-semibold text-white bg-white/10 border border-white/20 rounded-xl flex items-center gap-3"
              >
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                {error}
              </motion.div>
            )}

            <motion.div variants={itemVariants} className="space-y-2">
              <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Email Address</label>
              <RetroInput
                placeholder="example@mail.com"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Password</label>
              <RetroInput
                placeholder="••••••••"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center justify-between py-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input type="checkbox" className="peer w-5 h-5 rounded-md border-white/20 text-white focus:ring-white/10 transition-all cursor-pointer appearance-none border-2 checked:bg-white checked:border-white" />
                  <div className="absolute opacity-0 peer-checked:opacity-100 text-black pointer-events-none left-1 top-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <span className="text-xs font-semibold text-white/40 group-hover:text-white transition-colors uppercase tracking-wider">Remember me</span>
              </label>
              <Link to="/forgot-password" title="reset password" id="forgot-password" className="text-xs font-bold text-white hover:text-white/80 uppercase tracking-wider">Forgot password?</Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
            >
              <RetroButton type="submit" variant="primary" className="w-full py-4 text-base font-bold rounded-2xl shadow-classic-lg">
                <LogIn size={20} className="mr-3" />
                SIGN IN
              </RetroButton>
            </motion.div>
          </form>

          <motion.div variants={itemVariants} className="text-center text-white/40 font-semibold uppercase tracking-wider text-[11px]">
            Don't have an account? <Link to="/register" className="text-white hover:underline underline-offset-4 decoration-2">Register Now</Link>
          </motion.div>
        </RetroCard>
      </motion.div>

    </div>
  );
};

export default Login;