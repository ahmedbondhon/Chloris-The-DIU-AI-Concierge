import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import RetroInput from '../components/retro/RetroInput';
import RetroButton from '../components/retro/RetroButton';
import RetroCard from '../components/retro/RetroCard';
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
        <div className="flex min-h-screen bg-[#0A0A0C] overflow-hidden font-sora">
            {/* Left Side: Branding */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="hidden lg:flex w-[40%] bg-[#0A0A0C] relative flex-col justify-between p-16 text-text-primary overflow-hidden border-r border-white/5"
            >
                <div className="relative z-10 flex items-center gap-4">
                    <motion.div
                        className="w-12 h-12 bg-[#111113] rounded-xl flex items-center justify-center shadow-xl border border-white/10 p-2.5 shadow-primary/5"
                    >
                        <img src="/logo.png" alt="Chloris Logo" className="w-full h-full object-contain filter drop-shadow(0 0 8px rgba(139, 92, 246, 0.5))" />
                    </motion.div>
                    <span className="text-2xl font-bold tracking-tight text-text-primary uppercase tracking-[0.2em]">Chloris</span>
                </div>

                <div className="relative z-10 max-w-lg">
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[11px] font-bold uppercase tracking-widest mb-8 border border-primary/20"
                    >
                        <Sparkles size={14} />
                        Security Gateway
                    </motion.div>

                    <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6 text-text-primary tracking-tighter">
                        {step === 1 ? (
                            <>Restore your <br /><span className="text-primary italic">Access</span></>
                        ) : (
                            <>Define your <br /><span className="text-primary italic">New Secret</span></>
                        )}
                    </h2>
                    <p className="text-text-muted text-base font-medium leading-relaxed opacity-60">
                        {step === 1
                            ? "Verify your identity to regain control of your academic dashboard."
                            : "Create a strong, unique password to secure your student portal."}
                    </p>
                </div>

                <div className="relative z-10 flex items-center gap-4 border-t border-white/5 pt-12">
                    <Link to="/login" className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors font-bold text-[10px] uppercase tracking-widest group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Login
                    </Link>
                </div>
            </motion.div>

            {/* Right Side: Form */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="flex-1 flex items-center justify-center p-8 relative z-20"
            >
                <RetroCard variant="modern-3d" className="w-full max-w-md !rounded-[2rem] border-white/5 shadow-2xl space-y-8 p-10">
                    {success ? (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-8">
                            <div className="flex justify-center">
                                <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center text-emerald-400 border border-emerald-500/20 shadow-lg shadow-emerald-500/10">
                                    <CheckCircle2 size={40} />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-text-primary tracking-tight mb-2">Password Updated</h3>
                                <p className="text-text-muted text-xs uppercase tracking-widest font-bold">You can now sign in with your new credentials.</p>
                            </div>
                            <Link to="/login" className="block w-full">
                                <RetroButton variant="primary" className="w-full py-4 text-[11px] font-bold rounded-xl shadow-xl shadow-primary/20 uppercase tracking-[0.1em]">
                                    Return to Sign In
                                </RetroButton>
                            </Link>
                        </motion.div>
                    ) : (
                        <>
                            <div className="text-center lg:text-left">
                                <div className="flex items-center justify-center lg:justify-start mb-6">
                                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20">
                                        <KeyRound size={24} />
                                    </div>
                                </div>
                                <h1 className="text-3xl font-extrabold text-text-primary tracking-tight mb-2 uppercase tracking-widest">
                                    {step === 1 ? 'Recovery' : 'Reset'}
                                </h1>
                                <p className="text-text-muted font-bold text-[10px] uppercase tracking-[0.3em] opacity-40">
                                    {step === 1 ? "Enter your email for verification" : "Enter your new credentials"}
                                </p>
                            </div>

                            <form onSubmit={step === 1 ? handleRecovery : handleReset} className="space-y-6">
                                {error && (
                                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-4 text-[10px] font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center gap-3 uppercase tracking-widest">
                                        <div className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />
                                        {error}
                                    </motion.div>
                                )}

                                {step === 1 ? (
                                    <motion.div variants={itemVariants} className="space-y-2">
                                        <label className="text-[10px] font-semibold text-text-muted uppercase tracking-widest ml-1">Email Address</label>
                                        <RetroInput
                                            placeholder="Enter your student email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </motion.div>
                                ) : (
                                    <motion.div variants={itemVariants} className="space-y-2">
                                        <label className="text-[10px] font-semibold text-text-muted uppercase tracking-widest ml-1">New Password</label>
                                        <RetroInput
                                            placeholder="••••••••"
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            required
                                        />
                                    </motion.div>
                                )}

                                <motion.div variants={itemVariants}>
                                    <RetroButton type="submit" variant="primary" className="w-full py-4 text-[11px] font-bold rounded-xl shadow-xl shadow-primary/20 uppercase tracking-[0.1em]" isLoading={loading}>
                                        {step === 1 ? 'Verify Identity' : 'Update Password'}
                                    </RetroButton>
                                </motion.div>
                            </form>
                        </>
                    )}
                </RetroCard>
            </motion.div>
        </div>
    );
};

export default ForgotPassword;
