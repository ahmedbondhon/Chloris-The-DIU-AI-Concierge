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
        <div className="flex min-h-screen bg-black overflow-hidden items-center justify-center p-6">
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full max-w-md bg-white/5 rounded-3xl shadow-classic-xl p-12 relative overflow-hidden border border-white/10"
            >
                {/* Decorative Background */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/5 rounded-full blur-3xl " />
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-white/5 rounded-full blur-3xl " />

                <div className="relative z-10 space-y-8">
                    <motion.div variants={containerVariants} initial="hidden" animate="show" className="text-center">
                        <Link to="/login" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors font-bold text-sm mb-8 group">
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Login
                        </Link>

                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-white border border-white/10">
                                <KeyRound size={32} />
                            </div>
                        </div>

                        <h1 className="text-3xl font-extrabold text-white tracking-tight">
                            {success ? 'Success!' : step === 1 ? 'Forgot Password?' : 'Reset Password'}
                        </h1>
                        <p className="text-white/40 font-medium mt-2 text-sm">
                            {success ? "Your password has been updated." : step === 1 ? "No worries, we'll help you get back in." : "Enter your new password below."}
                        </p>
                    </motion.div>

                    {success ? (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-8">
                            <div className="flex justify-center">
                                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400">
                                    <CheckCircle2 size={48} />
                                </div>
                            </div>
                            <Link to="/login" className="block w-full">
                                <Button className="w-full py-4 font-bold rounded-xl shadow-classic bg-white text-black hover:bg-white/90">Return to Sign In</Button>
                            </Link>
                        </motion.div>
                    ) : (
                        <form onSubmit={step === 1 ? handleRecovery : handleReset} className="space-y-6">
                            {error && (
                                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center gap-2">
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
                                        className="rounded-xl"
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
                                        className="rounded-xl"
                                    />
                                </motion.div>
                            )}

                            <motion.div variants={itemVariants} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                                <Button type="submit" className="w-full py-4 text-sm font-bold rounded-xl shadow-classic-lg bg-white text-black hover:bg-white/90" isLoading={loading}>
                                    {step === 1 ? 'Verify Email' : 'Update Password'}
                                </Button>
                            </motion.div>
                        </form>
                    )}

                    {!success && (
                        <div className="text-center text-[10px] font-bold text-white/40 uppercase tracking-widest pt-4 opacity-60">
                            <div className="flex items-center justify-center gap-2">
                                <Sparkles size={12} className="text-white" />
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
