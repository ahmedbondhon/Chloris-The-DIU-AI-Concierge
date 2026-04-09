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
        <div className="flex min-h-screen bg-white overflow-hidden font-outfit">
            {/* Left Side: Branding (Hidden on Mobile) */}
            <motion.div
                initial={{ x: '-10%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="hidden lg:flex w-[40%] bg-[#000000] relative flex-col justify-between p-12 text-white overflow-hidden border-r-4 border-white"
            >
                <div className="relative z-10 flex items-center gap-3">
                    <div className="w-12 h-12 bg-retro-yellow flex items-center justify-center border-2 border-black p-1 shadow-retro-hard-sm">
                        <img src="/logo.png" alt="Chloris Logo" className="w-[80%] h-[80%] object-contain" />
                    </div>
                    <span className="text-xl font-black tracking-tighter uppercase text-retro-yellow">Chloris</span>
                </div>

                <div className="relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-retro-pink text-white font-black uppercase tracking-wider mb-4 border-2 border-white shadow-retro-hard-sm"
                    >
                        <Sparkles size={12} className="text-retro-yellow" />
                        Join the DIU AI Portal
                    </motion.div>
                    <h2 className="text-5xl font-black leading-tight mb-4 uppercase">
                        Create your <br />
                        <span className="text-retro-blue">Student Account</span>
                    </h2>
                    <p className="text-slate-300 text-sm font-bold leading-relaxed max-w-xs">
                        Unlock all features by creating your official student profile.
                    </p>
                </div>

                <div className="relative z-10 flex items-center gap-4 border-t-2 border-white pt-8">
                    <ShieldCheck size={24} className="text-retro-yellow" />
                    <p className="text-[10px] font-black tracking-widest uppercase text-white">Verified DIU Portal</p>
                </div>

                {/* Animated Background Items */}
                <div className="absolute top-1/2 -right-20 w-64 h-64 bg-retro-blue/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -left-10 w-48 h-48 bg-retro-pink/10 rounded-full blur-3xl" />
            </motion.div>

            {/* Right Side: Registration Form */}
            <motion.div
                initial={{ x: '10%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 flex items-center justify-center p-6 retro-grid overflow-y-auto"
            >
                <RetroCard variant="secondary" className="w-full max-w-2xl border-black space-y-6 my-8">
                    <motion.div variants={itemVariants} className="flex flex-col items-center lg:items-start text-center lg:text-left">
                        <Link to="/login" className="mb-6 flex items-center gap-2 text-retro-blue hover:text-retro-pink transition-colors font-black text-xs uppercase tracking-widest group">
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Login
                        </Link>
                        <h1 className="text-4xl font-black text-black tracking-tighter uppercase">Student Registration</h1>
                        <p className="text-retro-pink font-bold mt-2 text-xs uppercase tracking-wide">Fill in your information to get started.</p>
                    </motion.div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="col-span-1 md:col-span-2 p-3 text-xs font-black text-white bg-retro-pink border-2 border-black shadow-retro-hard-sm flex items-center gap-3"
                            >
                                <div className="w-2 h-2 bg-white animate-pulse shrink-0"></div>
                                {error}
                            </motion.div>
                        )}

                        <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 space-y-1">
                            <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Full Name</label>
                            <RetroInput
                                placeholder="Ex: John Doe"
                                value={formData.full_name}
                                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                required
                            />
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-1">
                            <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Student ID</label>
                            <RetroInput
                                placeholder="Ex: 221-15-XXX"
                                value={formData.student_id}
                                onChange={(e) => setFormData({ ...formData, student_id: e.target.value })}
                                required
                            />
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-1">
                            <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Phone Number</label>
                            <RetroInput
                                placeholder="Ex: 017XXXXXXXX"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </motion.div>

                        <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 space-y-1">
                            <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Email Address</label>
                            <RetroInput
                                placeholder="example@mail.com"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-1">
                            <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Department</label>
                            <RetroInput
                                placeholder="Ex: CSE"
                                value={formData.department}
                                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                            />
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-1">
                            <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Batch</label>
                            <RetroInput
                                placeholder="Ex: 58th"
                                value={formData.batch}
                                onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                            />
                        </motion.div>

                        <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 space-y-1">
                            <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Password</label>
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
                            <RetroButton type="submit" variant="neon-yellow" className="w-full py-4 text-sm font-black">
                                <UserPlus size={18} className="mr-3 shrink-0" />
                                REGISTER ACCOUNT
                            </RetroButton>
                        </motion.div>
                    </form>

                    <motion.div variants={itemVariants} className="text-center text-slate-600 font-black uppercase tracking-widest text-[10px]">
                        Already have an account? <Link to="/login" className="text-retro-pink hover:text-retro-yellow underline underline-offset-4 decoration-2">Sign In here</Link>
                    </motion.div>
                </RetroCard>
            </motion.div>
        </div>
    );
};

export default Register;
