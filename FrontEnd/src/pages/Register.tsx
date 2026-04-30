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
        <div className="flex min-h-screen bg-black overflow-hidden font-outfit">
            {/* Left Side: Branding (Hidden on Mobile) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="hidden lg:flex w-[40%] bg-black relative flex-col justify-between p-12 text-white overflow-hidden border-r border-white/5"
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
                        className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shadow-classic border border-white/10 p-2"
                    >
                        <img src="/logo.png" alt="Chloris Logo" className="w-[80%] h-[80%] object-contain invert" />
                    </motion.div>
                    <span className="text-xl font-bold tracking-tight text-white">CHLORIS</span>
                </div>

                <div className="relative z-10">
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-white/60 rounded-full text-[11px] font-bold uppercase tracking-wider mb-8 border border-white/20"
                    >
                        <Sparkles size={14} />
                        Join the DIU AI Portal
                    </motion.div>
                    <h2 className="text-5xl font-bold leading-tight mb-8">
                        Create your <br />
                        <span className="text-white italic">Student Account</span>
                    </h2>
                    <p className="text-white/40 text-lg font-medium leading-relaxed max-w-xs">
                        Unlock all features by creating your official student profile.
                    </p>
                </div>

                <div className="relative z-10 flex items-center gap-4 border-t border-white/10 pt-8">
                    <ShieldCheck size={24} className="text-white" />
                    <p className="text-[10px] font-bold tracking-widest uppercase text-white/40">Verified DIU Portal</p>
                </div>
            </motion.div>


            {/* Right Side: Registration Form */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="flex-1 flex items-center justify-center p-6 bg-black overflow-y-auto"
            >
                <RetroCard variant="primary" className="w-full max-w-2xl !rounded-3xl border-white/10 shadow-classic-xl space-y-6 my-8 p-10 bg-white/5">
                    <motion.div variants={itemVariants} className="flex flex-col items-center lg:items-start text-center lg:text-left">
                        <Link to="/login" className="mb-8 flex items-center gap-2 text-white hover:text-white/80 transition-colors font-bold text-xs uppercase tracking-widest group">
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Login
                        </Link>
                        <h1 className="text-5xl font-extrabold text-white tracking-tight mb-3">Student Registration</h1>
                        <p className="text-white/40 font-medium tracking-wide text-sm uppercase">Fill in your information to get started.</p>
                    </motion.div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="col-span-1 md:col-span-2 p-4 text-sm font-semibold text-white bg-white/10 border border-white/20 rounded-xl flex items-center gap-3"
                            >
                                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse shrink-0"></div>
                                {error}
                            </motion.div>
                        )}

                        <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 space-y-2">
                            <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Full Name</label>
                            <RetroInput
                                placeholder="Ex: John Doe"
                                value={formData.full_name}
                                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                required
                            />
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-2">
                            <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Student ID</label>
                            <RetroInput
                                placeholder="Ex: 221-15-XXX"
                                value={formData.student_id}
                                onChange={(e) => setFormData({ ...formData, student_id: e.target.value })}
                                required
                            />
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-2">
                            <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Phone Number</label>
                            <RetroInput
                                placeholder="Ex: 017XXXXXXXX"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </motion.div>

                        <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 space-y-2">
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
                            <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Department</label>
                            <RetroInput
                                placeholder="Ex: CSE"
                                value={formData.department}
                                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                            />
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-2">
                            <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Batch</label>
                            <RetroInput
                                placeholder="Ex: 58th"
                                value={formData.batch}
                                onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                            />
                        </motion.div>

                        <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 space-y-2">
                            <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Password</label>
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
                            className="col-span-1 md:col-span-2 pt-6"
                        >
                            <RetroButton type="submit" variant="primary" className="w-full py-4 text-base font-bold rounded-2xl shadow-classic-lg bg-white text-black hover:bg-white/90">
                                <UserPlus size={20} className="mr-3 shrink-0" />
                                REGISTER ACCOUNT
                            </RetroButton>
                        </motion.div>
                    </form>

                    <motion.div variants={itemVariants} className="text-center text-white/40 font-semibold uppercase tracking-wider text-[11px]">
                        Already have an account? <Link to="/login" className="text-white hover:underline underline-offset-4 decoration-2">Sign In here</Link>
                    </motion.div>
                </RetroCard>
            </motion.div>

        </div>
    );
};

export default Register;
