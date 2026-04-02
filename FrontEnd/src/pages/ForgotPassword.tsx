import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { KeyRound, Sparkles, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { authService } from '../services/authService';

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 14 } },
};

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [step, setStep] = useState(1); // 1: Recovery, 2: Reset

    const handleRecovery = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await authService.recoverPassword(email);
            setStep(2);
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Recovery failed. Email not found.');
        } finally {
            setLoading(false);
        }
    };

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await authService.resetPassword({ email, password: newPassword });
            setSuccess(true);
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Reset failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-50 overflow-hidden items-center justify-center p-6">
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full max-w-md bg-white rounded-[2.5rem] shadow-[0_0_60px_-15px_rgba(0,0,0,0.1)] p-12 relative overflow-hidden"
            >
                {/* Decorative Background */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#5b52f1]/5 rounded-full blur-3xl " />
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-100/30 rounded-full blur-3xl " />

                <div className="relative z-10 space-y-8">
                    <motion.div variants={containerVariants} initial="hidden" animate="show" className="text-center">
                        <Link to="/login" className="inline-flex items-center gap-2 text-slate-400 hover:text-[#5b52f1] transition-colors font-bold text-sm mb-8 group">
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Login
                        </Link>

                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-[#5b52f1]/10 flex items-center justify-center text-[#5b52f1]">
                                <KeyRound size={32} />
                            </div>
                        </div>

                        <h1 className="text-3xl font-black text-slate-800 tracking-tight">
                            {success ? 'Success!' : step === 1 ? 'Forgot Password?' : 'Reset Password'}
                        </h1>
                        <p className="text-slate-500 font-bold mt-2 text-sm">
                            {success ? "Your password has been updated." : step === 1 ? "No worries, we'll help you get back in." : "Enter your new password below."}
                        </p>
                    </motion.div>

                    {success ? (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-8">
                            <div className="flex justify-center">
                                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500">
                                    <CheckCircle2 size={48} />
                                </div>
                            </div>
                            <Link to="/login" className="block w-full">
                                <Button className="w-full py-4 font-black">Return to Sign In</Button>
                            </Link>
                        </motion.div>
                    ) : (
                        <form onSubmit={step === 1 ? handleRecovery : handleReset} className="space-y-6">
                            {error && (
                                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-3 text-xs font-bold text-rose-600 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse shrink-0"></div>
                                    {error}
                                </motion.div>
                            )}

                            {step === 1 ? (
                                <motion.div variants={itemVariants}>
                                    <Input
                                        label="Email Address"
                                        placeholder="Enter your student email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </motion.div>
                            ) : (
                                <motion.div variants={itemVariants}>
                                    <Input
                                        label="New Password"
                                        placeholder="••••••••"
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                </motion.div>
                            )}

                            <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button type="submit" className="w-full py-4 text-sm font-black" isLoading={loading}>
                                    {step === 1 ? 'Verify Email' : 'Update Password'}
                                </Button>
                            </motion.div>
                        </form>
                    )}

                    {!success && (
                        <div className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest pt-4">
                            <div className="flex items-center justify-center gap-2">
                                <Sparkles size={12} className="text-[#5b52f1]" />
                                <span>DIU AI Concierge Security</span>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default ForgotPassword;
