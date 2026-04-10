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
    <div className="flex min-h-screen bg-white overflow-hidden font-outfit">
      {/* Left Side: Branding (Visible on Desktop) */}
      <motion.div
        initial={{ x: '-10%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:flex w-[45%] bg-[#000000] relative flex-col justify-between p-16 text-white overflow-hidden border-r-4 border-white"
      >
        {/* Background Decorative Animated Circles */}
        <motion.div
          animate={{
            y: [0, -40, 0],
            rotate: [0, 10, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-retro-blue/10 rounded-full -mr-64 -mt-64 blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{
            y: [0, 40, 0],
            rotate: [0, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-retro-pink/20 rounded-full -ml-32 -mb-32 blur-3xl pointer-events-none"
        />

        <div className="relative z-10 flex items-center gap-3">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
            className="w-20 h-20 bg-retro-yellow flex items-center justify-center shadow-retro-hard border-2 border-black p-2"
          >
            <img src="/logo.png" alt="Chloris Logo" className="w-full h-full object-contain" />
          </motion.div>
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl font-black tracking-tighter text-retro-yellow"
          >
            CHLORIS
          </motion.span>
        </div>

        <div className="relative z-10 max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-retro-pink text-white font-black uppercase tracking-wider mb-6 border-2 border-white shadow-retro-hard-sm"
          >
            <Sparkles size={14} className="text-retro-yellow" />
            AI-Powered Student Assistant
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-6xl font-black leading-[1.0] mb-8 uppercase"
          >
            Manage your <br />
            <span className="text-retro-blue">Campus Life</span> <br />
            with <span className="text-retro-yellow">Intelligence.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-slate-300 text-lg font-bold leading-relaxed"
          >
            Access your grades, scheduled classes, and book study rooms directly from our intelligent student portal.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="relative z-10 flex items-center gap-8 border-t-2 border-white pt-12"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-retro-blue flex items-center justify-center border-2 border-white shadow-retro-hard-sm">
              <ShieldCheck size={24} className="text-black" />
            </div>
            <div>
              <p className="text-xs font-black text-retro-yellow uppercase tracking-widest">Secure Access</p>
              <p className="text-sm font-black text-white">SSO ENABLED</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Right Side: Login Form */}
      <motion.div
        initial={{ x: '10%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 flex items-center justify-center p-8 retro-grid relative z-20"
      >
        <RetroCard variant="secondary" className="w-full max-w-md border-black space-y-10">
          <motion.div variants={itemVariants} className="text-center lg:text-left">
            <div className="lg:hidden flex justify-center mb-8">
              <div className="w-24 h-24 bg-retro-yellow flex items-center justify-center shadow-retro-hard border-4 border-black p-2">
                <img src="/logo.png" alt="Chloris Logo" className="w-full h-full object-contain" />
              </div>
            </div>
            <h1 className="text-5xl font-black text-black tracking-tighter uppercase mb-2">Sign In</h1>
            <p className="text-retro-pink font-bold uppercase tracking-wide text-sm">Welcome back! Please enter your details.</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 text-sm font-black text-white bg-retro-pink border-2 border-black shadow-retro-hard-sm flex items-center gap-3"
              >
                <div className="w-2 h-2 bg-white animate-pulse"></div>
                {error}
              </motion.div>
            )}

            <motion.div variants={itemVariants} className="space-y-2">
              <label className="text-sm font-black text-black uppercase tracking-widest ml-1">Email Address</label>
              <RetroInput
                placeholder="example@mail.com"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <label className="text-sm font-black text-black uppercase tracking-widest ml-1">Password</label>
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
                <input type="checkbox" className="w-6 h-6 rounded-none border-2 border-black text-retro-blue focus:ring-retro-blue transition-all" />
                <span className="text-xs font-black text-black group-hover:text-retro-yellow transition-colors uppercase tracking-widest">Remember me</span>
              </label>
              <Link to="/forgot-password" title="reset password" id="forgot-password" className="text-xs font-black text-retro-blue hover:text-retro-pink uppercase tracking-widest">Forgot password?</Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
            >
              <RetroButton type="submit" variant="neon-yellow" className="w-full py-4 text-lg">
                <LogIn size={20} className="mr-3" />
                SIGN IN
              </RetroButton>
            </motion.div>
          </form>

          <motion.div variants={itemVariants} className="text-center text-black font-black uppercase tracking-widest text-[12px]">
            Don't have an account? <Link to="/register" className="text-retro-pink hover:text-retro-yellow underline underline-offset-4 decoration-2">Register Now</Link>
          </motion.div>
        </RetroCard>
      </motion.div>
    </div>
  );
};

export default Login;