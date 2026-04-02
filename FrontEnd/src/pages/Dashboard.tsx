import React from 'react';
import { TrendingUp, Clock, ListTodo, Building, ArrowRight, Bot, Sparkles, Zap, Target, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

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
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-10 pb-12 px-2 lg:px-6"
    >
      {/* Top Welcome Section */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-1">
        <div>
          <h1 className="text-4xl lg:text-5xl font-black text-slate-100 tracking-tight mb-3">
            {getTimeGreeting()}, <span className="text-gradient">John!</span> 👋
          </h1>
          <p className="text-slate-400 font-medium text-lg lg:text-xl max-w-2xl leading-relaxed">
            Welcome back to your personalized academic hub. You're making <span className="text-indigo-400 font-bold italic">excellent</span> progress this semester.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex -space-x-4 overflow-hidden p-1">
            {[1, 2, 3, 4].map(i => (
              <motion.div
                key={i}
                whileHover={{ y: -5, scale: 1.1 }}
                className="inline-block h-14 w-14 rounded-2xl ring-4 ring-slate-900 bg-slate-800 cursor-pointer overflow-hidden shadow-2xl"
              >
                <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="user" className="w-full h-full object-cover" />
              </motion.div>
            ))}
            <div className="flex items-center justify-center h-14 w-14 rounded-2xl ring-4 ring-slate-900 bg-indigo-600 text-white text-xs font-bold shadow-xl shadow-indigo-600/20">
              +12
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            title: 'Academic GPA',
            value: '3.85 / 4.0',
            trend: '+0.2 UP',
            icon: TrendingUp,
            color: 'indigo',
            desc: 'Top 5% of your class'
          },
          {
            title: 'Attendance',
            value: '94%',
            trend: 'Perfect',
            icon: Clock,
            color: 'emerald',
            progress: 94,
            desc: '12 consecutive days'
          },
          {
            title: 'Active Tasks',
            value: '2 Tasks',
            trend: 'Priority',
            icon: Target,
            color: 'rose',
            desc: 'Next: Data Structures Exam'
          }
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(30, 41, 59, 0.6)' }}
            className="premium-card p-8 group cursor-pointer relative overflow-hidden bg-slate-800/40 border-slate-700/50"
          >
            {/* Subtle light effect on hover */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-${stat.color}-500/10 blur-[60px] rounded-full group-hover:bg-${stat.color}-500/20 transition-all duration-700`}></div>

            <div className="flex justify-between items-start mb-8 relative z-10">
              <div className={`w-16 h-16 rounded-[1.5rem] bg-${stat.color}-500/10 flex items-center justify-center text-${stat.color}-400 group-hover:scale-110 group-hover:bg-${stat.color}-600 group-hover:text-white transition-all duration-500 shadow-xl`}>
                <stat.icon size={30} strokeWidth={2.5} />
              </div>
              <span className={`px-4 py-2 bg-${stat.color}-500/10 text-${stat.color}-400 text-[10px] font-black rounded-xl uppercase tracking-widest border border-${stat.color}-500/20`}>
                {stat.trend}
              </span>
            </div>

            <div className="relative z-10">
              <p className="text-slate-500 font-bold mb-1 uppercase tracking-[0.15em] text-[11px]">{stat.title}</p>
              <h3 className="text-4xl font-black text-slate-100 mb-2">{stat.value}</h3>

              {stat.progress ? (
                <div className="mt-4">
                  <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden p-0.5 border border-slate-700/30">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.progress}%` }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                      className={`h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-700`}
                    ></motion.div>
                  </div>
                  <p className="text-slate-500 text-xs mt-3 font-semibold flex items-center gap-1.5">
                    <Sparkles size={12} className="text-emerald-500" /> {stat.desc}
                  </p>
                </div>
              ) : (
                <p className="text-slate-500 text-xs mt-1 font-semibold flex items-center gap-1.5">
                  <Star size={12} className={`text-${stat.color}-500`} fill="currentColor" /> {stat.desc}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Main Content: Recent Activity */}
        <motion.div variants={itemVariants} className="lg:col-span-3 space-y-8">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-3xl font-black text-slate-200 tracking-tight flex items-center gap-4">
              <div className="w-2.5 h-10 bg-indigo-600 rounded-full shadow-lg shadow-indigo-600/20"></div>
              Recent Activity
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/bookings')}
              className="text-[12px] font-black text-indigo-400 uppercase tracking-widest px-6 py-3 bg-indigo-600/10 rounded-2xl transition-all border border-indigo-600/20 hover:bg-indigo-600 hover:text-white"
            >
              Explore All
            </motion.button>
          </div>

          <div className="space-y-5">
            {[
              { room: 'Study Pod B', location: 'Main Library', time: '2:00 PM - 4:00 PM', status: 'Confirmed', color: 'indigo-500' },
              { room: 'Physics Lab 04', location: 'Science Block', time: 'Tomorrow, 9:00 AM', status: 'Pending', color: 'sky-400' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ x: 10, backgroundColor: 'rgba(30, 41, 59, 0.6)' }}
                className="premium-card p-6 flex items-center gap-8 group cursor-pointer border-l-4 bg-slate-800/40 border-slate-700/50"
                style={{ borderLeftColor: `var(--${item.color.split('-')[0]})` }}
              >
                <div className={`w-16 h-16 rounded-2xl bg-slate-900/50 flex items-center justify-center text-${item.color} group-hover:scale-110 transition-transform shadow-inner border border-slate-700/50`}>
                  <Building size={28} strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-black text-slate-100 text-xl">{item.room}</h4>
                    <span className={`px-3 py-1 rounded-lg bg-${item.color.split('-')[0]}-500/10 text-${item.color} text-[9px] font-black uppercase tracking-widest border border-${item.color.split('-')[0]}-500/20`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-slate-500 font-bold text-[13px] uppercase tracking-widest flex items-center gap-2">
                    {item.location} <span className="w-1 h-1 bg-slate-700 rounded-full"></span> {item.time}
                  </p>
                </div>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="bg-indigo-600 text-white p-3 rounded-2xl shadow-xl shadow-indigo-600/20"
                >
                  <ArrowRight size={20} />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI Banner - The Advanced Glassmorphism Hero */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -5 }}
          className="lg:col-span-2 relative group"
        >
          <div className="relative h-full overflow-hidden rounded-[3.5rem] bg-indigo-700 p-10 flex flex-col justify-between shadow-3xl shadow-indigo-900/40">
            {/* Morphing background shapes */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl opacity-30"
            ></motion.div>
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                x: [0, 50, 0],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-0 left-0 w-64 h-64 bg-black/30 rounded-full -ml-16 -mb-16 blur-2xl opacity-20"
            ></motion.div>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl">
                  <Bot size={34} strokeWidth={2.5} />
                </div>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Chloris v2.0 Online</span>
                  </div>
                </div>
              </div>

              <h3 className="text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-6 tracking-tight">
                Stuck with <br />
                studies? <br />
                <span className="text-indigo-200">Ask Chloris AI.</span>
              </h3>

              <p className="text-indigo-100/70 font-bold text-lg leading-relaxed max-w-xs">
                Instant intelligence about campus, policies, and your future.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/chat')}
              className="relative z-10 w-full bg-white text-indigo-700 font-black py-6 rounded-[2.5rem] shadow-2xl hover:shadow-white/10 transition-all flex items-center justify-center gap-3 text-xl group/btn overflow-hidden"
            >
              <div className="absolute inset-x-0 bottom-0 h-1 bg-indigo-600/10 group-hover/btn:h-full transition-all duration-300"></div>
              <span className="relative z-10">Start Intelligent Chat</span>
              <Zap size={20} className="relative z-10 group-hover/btn:fill-current group-hover/btn:scale-130 transition-all" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;