import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import RetroInput from '../components/retro/RetroInput';
import RetroButton from '../components/retro/RetroButton';
import RetroCard from '../components/retro/RetroCard';
import { UserPlus, ShieldCheck, Sparkles, ArrowLeft } from 'lucide-react';
import { authService } from '../services/authService';

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 14 } },
};

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        full_name: '',
        student_id: '',
        email: '',
        password: '',
        department: '',
        semester: '',
        batch: '',
        phone: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await authService.signup(formData);
            // After signup, redirect to login
            navigate('/login', { state: { message: 'Registration successful! Please login.' } });
        } catch (err: any) {
            setError(err.response?.data?.detail || err.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-[#0A0A0C] overflow-hidden font-sora">
            {/* Left Side: Branding (Hidden on Mobile) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="hidden lg:flex w-[40%] bg-[#0A0A0C] relative flex-col justify-between p-10 text-text-primary overflow-hidden border-r border-white/5"
            >
                {/* Background Decorative Animated Circles */}
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                        scale: [1, 1.05, 1],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full -mr-64 -mt-64 blur-3xl pointer-events-none"
                />
                <motion.div
                    animate={{
                        y: [0, 20, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full -ml-32 -mb-32 blur-3xl pointer-events-none"
                />

                <div className="relative z-10 flex items-center gap-4">
                    <motion.div
                        className="w-10 h-10 bg-[#111113] rounded-lg flex items-center justify-center shadow-xl border border-white/10 p-2 shadow-primary/5"
                    >
                        <img src="/logo.png" alt="Chloris Logo" className="w-[80%] h-[80%] object-contain filter drop-shadow(0 0 8px rgba(139, 92, 246, 0.5))" />
                    </motion.div>
                    <span className="text-xl font-bold tracking-[0.2em] text-text-primary uppercase">CHLORIS</span>
                </div>

                <div className="relative z-10">
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[11px] font-bold uppercase tracking-widest mb-8 border border-primary/20"
                    >
                        <Sparkles size={12} className="text-retro-yellow" />
                        Join the DIU AI Portal
                    </motion.div>
                    <h2 className="text-4xl lg:text-4xl font-bold leading-tight mb-6 text-text-primary tracking-tighter">
                        Create your <br />
                        <span className="text-primary italic">Student Account</span>
                    </h2>
                    <p className="text-text-muted text-base font-medium leading-relaxed max-w-xs opacity-60">
                        Unlock all features by creating your official student profile.
                    </p>
                </div>

                <div className="relative z-10 flex items-center gap-4 border-t border-white/5 pt-8">
                    <ShieldCheck size={20} className="text-primary" />
                    <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-text-muted opacity-30">Verified DIU Portal</p>
                </div>

                {/* Animated Background Items */}
                <div className="absolute top-1/2 -right-20 w-64 h-64 bg-retro-blue/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -left-10 w-48 h-48 bg-retro-pink/10 rounded-full blur-3xl" />
            </motion.div>

            {/* Right Side: Registration Form */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="flex-1 flex items-center justify-center p-6 bg-background overflow-y-auto"
            >
                <RetroCard variant="modern-3d" className="w-full max-w-2xl !rounded-[2rem] border-white/5 shadow-2xl space-y-6 my-8 p-10">
                    <motion.div variants={itemVariants} className="flex flex-col items-center lg:items-start text-center lg:text-left">
                        <Link to="/login" className="mb-8 flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-bold text-[10px] uppercase tracking-widest group">
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Login
                        </Link>
                        <h1 className="text-3xl font-extrabold text-text-primary tracking-tight mb-2">Student Registration</h1>
                        <p className="text-text-muted font-bold tracking-widest text-[9px] uppercase opacity-40">Fill in your information to get started.</p>
                    </motion.div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="col-span-1 md:col-span-2 p-4 text-[10px] font-bold text-text-primary bg-primary/10 border border-primary/20 rounded-xl flex items-center gap-3 uppercase tracking-widest"
                            >
                                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shrink-0 shadow-sm shadow-primary/50"></div>
                                {error}
                            </motion.div>
                        )}

                        <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 space-y-2">
                            <label className="text-[10px] font-semibold text-text-muted uppercase tracking-widest ml-1">Full Name</label>
                            <RetroInput
                                placeholder="Ex: Tonmoy"
                                value={formData.full_name}
                                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                required
                            />
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-2">
                            <label className="text-[10px] font-semibold text-text-muted uppercase tracking-widest ml-1">Student ID</label>
                            <RetroInput
                                placeholder="Ex: 221-15-XXX"
                                value={formData.student_id}
                                onChange={(e) => setFormData({ ...formData, student_id: e.target.value })}
                                required
                            />
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-2">
                            <label className="text-[10px] font-semibold text-text-muted uppercase tracking-widest ml-1">Phone Number</label>
                            <RetroInput
                                placeholder="Ex: 017XXXXXXXX"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </motion.div>

                        <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 space-y-2">
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
                            <label className="text-[10px] font-semibold text-text-muted uppercase tracking-widest ml-1">Department</label>
                            <RetroInput
                                placeholder="Ex: CSE"
                                value={formData.department}
                                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                            />
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-2">
                            <label className="text-[10px] font-semibold text-text-muted uppercase tracking-widest ml-1">Batch</label>
                            <RetroInput
                                placeholder="Ex: 58th"
                                value={formData.batch}
                                onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                            />
                        </motion.div>

                        <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 space-y-2">
                            <label className="text-[10px] font-semibold text-text-muted uppercase tracking-widest ml-1">Password</label>
                            <RetroInput
                                placeholder="••••••••"
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="col-span-1 md:col-span-2 pt-4"
                        >
                            <RetroButton type="submit" variant="primary" className="w-full py-4 text-[11px] font-bold rounded-xl shadow-classic-lg bg-primary text-white hover:bg-primary/90 uppercase tracking-[0.1em]">
                                <UserPlus size={18} className="mr-3 shrink-0" />
                                REGISTER ACCOUNT
                            </RetroButton>
                        </motion.div>
                    </form>

                    <motion.div variants={itemVariants} className="text-center text-text-muted font-semibold uppercase tracking-widest text-[10px]">
                        Already have an account? <Link to="/login" className="text-primary hover:underline underline-offset-4 decoration-2">Sign In here</Link>
                    </motion.div>
                </RetroCard>
            </motion.div>
        </div>
    );
};

export default Register;
