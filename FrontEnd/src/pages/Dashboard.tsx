import React from 'react';
import { TrendingUp, Clock, Building, ArrowRight, Bot, Sparkles, Zap, Target, Star, LayoutDashboard, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import RetroCard from '../components/retro/RetroCard';
import RetroButton from '../components/retro/RetroButton';
import { cn } from '../lib/utils';

const Dashboard = () => {
  const navigate = useNavigate();

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "GOOD MORNING";
    if (hour < 18) return "GOOD AFTERNOON";
    return "GOOD EVENING";
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8 pb-10 px-4 lg:px-8 font-sora min-h-screen pt-10 bg-[#0A0A0C]"
    >
      {/* Top Header Section */}
      <motion.div variants={itemVariants} className="flex flex-col gap-1 mb-8 px-2">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] bg-primary/10 px-3 py-1 rounded-md border border-primary/20">
            Command Center
          </span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold text-text-primary tracking-tight">
          System Overview
        </h1>
        <p className="text-text-muted font-bold text-[10px] uppercase tracking-widest opacity-40 mt-1">
          Student ID: 211-15-12345 • Tonmoy
        </p>
      </motion.div>

      {/* Main Grid: Left Column Stats, Right Column AI */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Left Column: Stats Stack */}
        <div className="lg:col-span-3 space-y-6">
          {[
            {
              title: 'GPA Standing',
              value: '3.85',
              trend: 'Top 5%',
              icon: TrendingUp,
              color: '#8b5cf6', // Violet
              desc: 'Academic Performance'
            },
            {
              title: 'Attendance Rate',
              value: '94%',
              trend: 'Perfect',
              icon: Clock,
              color: '#f59e0b', // Amber
              desc: '12 Day Streak'
            },
            {
              title: 'Active Tasks',
              value: '02',
              trend: 'Priority',
              icon: Target,
              color: '#06b6d4', // Cyan
              desc: 'Next: CSE Exam'
            }
          ].map((stat, idx) => (
            <RetroCard
              key={idx}
              variant="modern-3d"
              className="group cursor-pointer !rounded-3xl border-border/5 hover:border-primary/20 transition-all duration-500 overflow-hidden"
            >
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-text-muted font-bold uppercase tracking-widest text-[9px] opacity-60">{stat.title}</p>
                  <h3 className="text-3xl lg:text-4xl font-extrabold text-text-primary tracking-tighter transition-all group-hover:scale-[1.01]">
                    {stat.value}
                  </h3>
                  <p className="text-text-muted/40 text-[9px] font-bold uppercase tracking-widest pt-0.5">{stat.desc} • <span className="text-primary/60">{stat.trend}</span></p>
                </div>

                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-xl relative"
                  style={{
                    backgroundColor: `${stat.color}15`,
                    boxShadow: `0 0 30px -10px ${stat.color}30`
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-full opacity-20 group-hover:opacity-40 transition-opacity blur-xl"
                    style={{ backgroundColor: stat.color }}
                  ></div>
                  <stat.icon
                    size={24}
                    className="relative z-10 transition-transform group-hover:scale-110"
                    style={{ color: stat.color, filter: `drop-shadow(0 0 8px ${stat.color}60)` }}
                  />
                </div>
              </div>
            </RetroCard>
          ))}

          {/* Neural Pulse Area */}
          <RetroCard variant="modern-3d" className="!p-8 !rounded-3xl border-border/5">
            <div className="flex items-center justify-between mb-8">
              <h4 className="flex items-center gap-2.5 text-text-primary font-bold uppercase tracking-widest text-[10px]">
                <TrendingUp size={14} className="text-primary" />
                Neural Pulse
              </h4>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></div>
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Live</span>
              </div>
            </div>

            <div className="h-24 flex items-end gap-1 px-1 relative">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    height: [20, Math.random() * 80 + 20, 20],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.1
                  }}
                  className="flex-1 bg-gradient-to-t from-primary/40 to-primary/10 rounded-full"
                ></motion.div>
              ))}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p className="text-[9px] font-bold text-primary/20 uppercase tracking-[0.4em]">Encrypted Cognition Stream // Active</p>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <div className="bg-background/50 border border-border/10 px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest text-text-muted">
                Mem: 82%
              </div>
              <div className="bg-background/50 border border-border/10 px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest text-text-muted">
                Sync: 1.2ms
              </div>
            </div>
          </RetroCard>
        </div>

        {/* Right Column: AI Assistant & Actions */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="h-full"
          >
            <div className="relative h-full overflow-hidden rounded-[2.5rem] bg-[#111113] border border-white/5 p-10 flex flex-col justify-between shadow-2xl">
              <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full -mr-40 -mt-40 blur-3xl pointer-events-none opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-secondary/5 rounded-full -ml-30 -mb-30 blur-3xl pointer-events-none opacity-30"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-12 h-12 bg-primary/10 backdrop-blur-md rounded-xl flex items-center justify-center text-primary border border-primary/20 shadow-xl shadow-primary/10">
                    <Bot size={28} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h5 className="text-text-primary font-bold text-xs tracking-tight">Chloris AI</h5>
                    <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                      Core Online
                    </p>
                  </div>
                </div>
              </div>
              <h3 className="text-3xl lg:text-4xl font-extrabold text-text-primary leading-tight mb-6 tracking-tighter">
                Deep intelligence,<br />
                <span className="text-text-muted/20">reimagined.</span>
              </h3>

              <p className="text-text-muted/60 font-medium text-xs leading-relaxed max-w-xs mb-8">
                Ask me anything about your academic journey, campus policies, or research data.
              </p>
            </div>

            <div className="space-y-4">
              <RetroButton
                variant="primary"
                size="lg"
                onClick={() => navigate('/chat')}
                className="w-full text-base py-5 rounded-xl bg-primary text-white shadow-xl shadow-primary/20 border-t border-white/20 group"
              >
                <span>Launch Intelligence</span>
                <Zap size={18} className="ml-3 group-hover:scale-125 transition-transform" />
              </RetroButton>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;