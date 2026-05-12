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
    <div className="flex min-h-screen bg-[#0A0A0C] overflow-hidden font-sora">
      {/* Left Side: Branding (Visible on Desktop) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex w-[40%] bg-[#0A0A0C] relative flex-col justify-between p-16 text-text-primary overflow-hidden border-r border-white/5"
      >
        {/* Background Decorative Animated Circles */}
        <motion.div
          animate={{
            y: [0, -40, 0],
            rotate: [0, 10, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full -mr-64 -mt-64 blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{
            y: [0, 40, 0],
            rotate: [0, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full -ml-32 -mb-32 blur-3xl pointer-events-none"
        />

        <div className="relative z-10 flex items-center gap-3">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-12 h-12 bg-[#111113] rounded-xl flex items-center justify-center shadow-xl border border-white/10 p-2.5 shadow-primary/5"
          >
            <img src="/logo.png" alt="Chloris Logo" className="w-full h-full object-contain filter drop-shadow(0 0 8px rgba(139, 92, 246, 0.5))" />
          </motion.div>
          <motion.span
            className="text-2xl font-bold tracking-tight text-text-primary uppercase"
          >
            Chloris
          </motion.span>
        </div>

        <div className="relative z-10 max-w-lg">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[11px] font-bold uppercase tracking-widest mb-8 border border-primary/20"
          >
            <Sparkles size={14} />
            AI-Powered Student Assistant
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl lg:text-5xl font-bold leading-tight mb-6 text-text-primary tracking-tighter"
          >
            Manage your <br />
            <span className="text-primary italic">Campus Life</span> <br />
            with <span className="opacity-20 text-text-primary">Intelligence.</span>
          </motion.h2>

          <motion.p
            className="text-text-muted text-base font-medium leading-relaxed opacity-60"
          >
            Access your grades, scheduled classes, and book study rooms directly from our intelligent student portal.
          </motion.p>
        </div>

        <motion.div
          className="relative z-10 flex items-center gap-8 border-t border-white/5 pt-12"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#111113] backdrop-blur-md rounded-lg flex items-center justify-center border border-white/10 shadow-xl shadow-primary/5">
              <ShieldCheck size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-[9px] font-bold text-text-muted uppercase tracking-[0.3em] opacity-30">Secure Access</p>
              <p className="text-xs font-bold text-text-primary tracking-widest">SSO ENABLED</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Right Side: Login Form */}
      <motion.div
        initial={{ x: '10%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 flex items-center justify-center p-8 relative z-20"
      >
        <RetroCard variant="modern-3d" className="w-full max-w-md !rounded-[2rem] border-white/5 shadow-2xl space-y-8 p-10">
          <motion.div variants={itemVariants} className="text-center lg:text-left">
            <div className="lg:hidden flex justify-center mb-8">
              <div className="w-20 h-20 bg-surface rounded-2xl flex items-center justify-center shadow-classic border border-border p-3">
                <img src="/logo.png" alt="Chloris Logo" className="w-full h-full object-contain" />
              </div>
            </div>
            <h1 className="text-3xl font-extrabold text-text-primary tracking-tight mb-2">Sign In</h1>
            <p className="text-text-muted font-bold tracking-widest uppercase text-[9px] opacity-40">Welcome back! Please enter your details.</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 text-[10px] font-bold text-text-primary bg-primary/10 border border-primary/20 rounded-xl flex items-center gap-3 uppercase tracking-widest"
              >
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-sm shadow-primary/50"></div>
                {error}
              </motion.div>
            )}

            <motion.div variants={itemVariants} className="space-y-2">
              <label className="text-[10px] font-semibold text-text-muted uppercase tracking-widest ml-1">Email Address</label>
              <RetroInput
                placeholder="example@mail.com"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <label className="text-[10px] font-semibold text-text-muted uppercase tracking-widest ml-1">Password</label>
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
                  <input type="checkbox" className="peer w-5 h-5 rounded-md border-border text-primary focus:ring-primary/10 transition-all cursor-pointer appearance-none border-2 checked:bg-primary checked:border-primary" />
                  <div className="absolute opacity-0 peer-checked:opacity-100 text-white pointer-events-none left-1 top-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-text-muted group-hover:text-text-primary transition-colors uppercase tracking-widest">Remember me</span>
              </label>
              <Link to="/forgot-password" title="reset password" id="forgot-password" className="text-[10px] font-bold text-primary hover:text-primary/80 uppercase tracking-widest">Forgot password?</Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
            >
              <RetroButton type="submit" variant="primary" isLoading={loading} className="w-full py-4 text-[11px] font-bold rounded-xl shadow-classic-lg bg-primary text-white hover:bg-primary/90 uppercase tracking-[0.1em]">
                <LogIn size={18} className="mr-3" />
                SIGN IN
              </RetroButton>
            </motion.div>
          </form>

          <motion.div variants={itemVariants} className="text-center text-text-muted font-semibold uppercase tracking-widest text-[10px]">
            Don't have an account? <Link to="/register" className="text-primary hover:underline underline-offset-4 decoration-2">Register Now</Link>
          </motion.div>
        </RetroCard>
      </motion.div>
    </div>
  );
};

export default Login;