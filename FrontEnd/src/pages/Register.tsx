import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
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
        <div className="flex min-h-screen bg-slate-50 overflow-hidden">
            {/* Left Side: Branding (Hidden on Mobile) */}
            <motion.div
                initial={{ x: '-10%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="hidden lg:flex w-[40%] bg-[#5b52f1] relative flex-col justify-between p-12 text-white overflow-hidden"
            >
                <div className="relative z-10 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/20">
                        <img src="/logo.png" alt="Chloris Logo" className="w-[80%] h-[80%] object-contain" />
                    </div>
                    <span className="text-xl font-black tracking-tight uppercase">Chloris</span>
                </div>

                <div className="relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-wider mb-4 border border-white/10"
                    >
                        <Sparkles size={12} className="text-yellow-300" />
                        Join the DIU AI Portal
                    </motion.div>
                    <h2 className="text-4xl font-black leading-tight mb-4">
                        Create your <br />
                        <span className="text-blue-200">Student Account</span>
                    </h2>
                    <p className="text-blue-100 text-sm font-medium opacity-80 leading-relaxed max-w-xs">
                        Unlock all features by creating your official student profile.
                    </p>
                </div>

                <div className="relative z-10 flex items-center gap-4 border-t border-white/10 pt-8">
                    <ShieldCheck size={20} className="text-blue-200" />
                    <p className="text-[10px] font-bold tracking-widest uppercase opacity-60">Verified DIU Portal</p>
                </div>

                {/* Animated Background Items */}
                <div className="absolute top-1/2 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -left-10 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl" />
            </motion.div>

            {/* Right Side: Registration Form */}
            <motion.div
                initial={{ x: '10%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 flex items-center justify-center p-6 bg-white overflow-y-auto"
            >
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="w-full max-w-xl space-y-6 py-8"
                >
                    <motion.div variants={itemVariants} className="flex flex-col items-center lg:items-start text-center lg:text-left">
                        <Link to="/login" className="mb-6 flex items-center gap-2 text-slate-400 hover:text-[#5b52f1] transition-colors font-bold text-sm group">
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Login
                        </Link>
                        <h1 className="text-3xl font-black text-slate-800 tracking-tight">Student Registration</h1>
                        <p className="text-slate-500 font-bold mt-2 text-sm">Fill in your information to get started.</p>
                    </motion.div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="col-span-1 md:col-span-2 p-3 text-xs font-bold text-rose-600 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-3"
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse shrink-0"></div>
                                {error}
                            </motion.div>
                        )}

                        <motion.div variants={itemVariants} className="col-span-1 md:col-span-2">
                            <Input
                                label="Full Name"
                                placeholder="Ex: John Doe"
                                value={formData.full_name}
                                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                required
                            />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Input
                                label="Student ID"
                                placeholder="Ex: 221-15-XXX"
                                value={formData.student_id}
                                onChange={(e) => setFormData({ ...formData, student_id: e.target.value })}
                                required
                            />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Input
                                label="Phone Number"
                                placeholder="Ex: 017XXXXXXXX"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </motion.div>

                        <motion.div variants={itemVariants} className="col-span-1 md:col-span-2">
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
                                label="Department"
                                placeholder="Ex: CSE"
                                value={formData.department}
                                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                            />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Input
                                label="Batch"
                                placeholder="Ex: 58th"
                                value={formData.batch}
                                onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                            />
                        </motion.div>

                        <motion.div variants={itemVariants} className="col-span-1 md:col-span-2">
                            <Input
                                label="Password"
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
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                        >
                            <Button type="submit" className="w-full py-4 text-sm font-black" isLoading={loading}>
                                <UserPlus size={18} className="mr-3 shrink-0" />
                                Register Account
                            </Button>
                        </motion.div>
                    </form>

                    <motion.div variants={itemVariants} className="text-center text-slate-500 font-bold text-xs">
                        Already have an account? <Link to="/login" className="text-[#5b52f1] hover:underline">Sign In here</Link>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Register;
