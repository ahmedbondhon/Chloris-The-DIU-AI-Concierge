import React from 'react';
import { TrendingUp, Clock, Building, ArrowRight, Bot, Sparkles, Zap, Target, Star } from 'lucide-react';
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
      className="space-y-10 pb-12 px-2 lg:px-6 font-outfit min-h-screen pt-10"
    >
      {/* Top Welcome Section */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-1">
        <div>
          <h1 className="text-4xl lg:text-6xl font-black text-black tracking-tighter mb-3 uppercase">
            {getTimeGreeting()}, <span className="text-retro-yellow">John!</span> 👋
          </h1>
          <p className="text-slate-600 font-bold text-lg lg:text-xl max-w-2xl leading-relaxed uppercase tracking-wide">
            Welcome back to your personalized academic hub. You're making <span className="text-retro-pink font-black italic">excellent</span> progress this semester.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex -space-x-4 overflow-hidden p-1">
            {[1, 2, 3, 4].map(i => (
              <motion.div
                key={i}
                whileHover={{ y: -5, scale: 1.1 }}
                className="inline-block h-14 w-14 border-2 border-black bg-white cursor-pointer overflow-hidden shadow-retro-hard-sm"
              >
                <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="user" className="w-full h-full object-cover" />
              </motion.div>
            ))}
            <div className="flex items-center justify-center h-14 w-14 border-2 border-black bg-retro-blue text-black text-xs font-black shadow-retro-hard-sm">
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
            color: 'retro-blue',
            desc: 'Top 5% of your class'
          },
          {
            title: 'Attendance',
            value: '94%',
            trend: 'Perfect',
            icon: Clock,
            color: 'retro-yellow',
            progress: 94,
            desc: '12 consecutive days'
          },
          {
            title: 'Active Tasks',
            value: '2 Tasks',
            trend: 'Priority',
            icon: Target,
            color: 'retro-pink',
            desc: 'Next: Data Structures Exam'
          }
        ].map((stat, idx) => (
          <RetroCard
            key={idx}
            variant="secondary"
            className="group cursor-pointer relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div className={cn(
                "w-16 h-16 border-2 border-black flex items-center justify-center text-black shadow-retro-hard-sm transition-all duration-500",
                stat.color === 'retro-blue' ? 'bg-retro-blue' : stat.color === 'retro-yellow' ? 'bg-retro-yellow' : 'bg-retro-pink'
              )}>
                <stat.icon size={30} strokeWidth={2.5} />
              </div>
              <span className="px-4 py-2 bg-black text-white text-[10px] font-black uppercase tracking-widest border-2 border-white shadow-retro-hard-sm">
                {stat.trend}
              </span>
            </div>

            <div className="relative z-10">
              <p className="text-retro-yellow font-black mb-1 uppercase tracking-widest text-[11px]">{stat.title}</p>
              <h3 className="text-4xl font-black text-black mb-2 tracking-tighter uppercase">{stat.value}</h3>

              {stat.progress ? (
                <div className="mt-4">
                  <div className="w-full bg-black border-2 border-white h-4 p-0.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.progress}%` }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                      className="h-full bg-retro-blue"
                    ></motion.div>
                  </div>
                  <p className="text-slate-600 text-[10px] mt-3 font-black uppercase tracking-widest flex items-center gap-2">
                    <Sparkles size={12} className="text-retro-yellow" /> {stat.desc}
                  </p>
                </div>
              ) : (
                <p className="text-slate-400 text-[10px] mt-1 font-black uppercase tracking-widest flex items-center gap-2">
                  <Star size={12} className="text-retro-pink" fill="currentColor" /> {stat.desc}
                </p>
              )}
            </div>
          </RetroCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Main Content: Recent Activity */}
        <motion.div variants={itemVariants} className="lg:col-span-3 space-y-8">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-3xl font-black text-black tracking-tighter uppercase flex items-center gap-4">
              <div className="w-4 h-10 bg-retro-pink border-2 border-black shadow-retro-hard-sm"></div>
              Recent Activity
            </h2>
            <RetroButton
              variant="outline"
              size="sm"
              onClick={() => navigate('/bookings')}
              className="text-[10px]"
            >
              EXPLORE ALL
            </RetroButton>
          </div>

          <div className="space-y-5">
            {[
              { room: 'Study Pod B', location: 'Main Library', time: '2:00 PM - 4:00 PM', status: 'Confirmed', color: 'retro-blue' },
              { room: 'Physics Lab 04', location: 'Science Block', time: 'Tomorrow, 9:00 AM', status: 'Pending', color: 'retro-pink' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ x: 5 }}
                className={cn(
                  "bg-white border-4 p-6 flex items-center gap-8 group cursor-pointer border-black shadow-retro-hard transition-all",
                  item.color === 'retro-blue' ? 'hover:bg-retro-blue/10' : 'hover:bg-retro-pink/10'
                )}
              >
                <div className={cn(
                  "w-16 h-16 border-2 border-black flex items-center justify-center shadow-retro-hard-sm",
                  item.color === 'retro-blue' ? 'bg-retro-blue' : 'bg-retro-pink'
                )}>
                  <Building size={28} strokeWidth={2} className="text-black" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-black text-black text-xl uppercase tracking-tighter">{item.room}</h4>
                    <span className="px-3 py-1 bg-black text-white text-[9px] font-black uppercase tracking-widest border border-white">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-slate-600 font-black text-[12px] uppercase tracking-widest flex items-center gap-2">
                    {item.location} <span className="w-2 h-2 bg-retro-yellow"></span> {item.time}
                  </p>
                </div>
                <div className="bg-black text-white p-3 border-2 border-white shadow-retro-hard-sm">
                  <ArrowRight size={20} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI Banner */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -5 }}
          className="lg:col-span-2 relative group"
        >
          <div className="relative h-full overflow-hidden border-4 border-black bg-retro-blue p-10 flex flex-col justify-between shadow-retro-hard">
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-16 h-16 bg-white border-2 border-black flex items-center justify-center text-black shadow-retro-hard-sm">
                  <Bot size={34} strokeWidth={2.5} />
                </div>
                <div className="bg-black border-2 border-white px-4 py-2 shadow-retro-hard-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-retro-yellow animate-pulse"></div>
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Chloris v2.0 Online</span>
                  </div>
                </div>
              </div>

              <h3 className="text-4xl lg:text-5xl font-black text-black leading-[1.0] mb-6 tracking-tighter uppercase">
                Stuck with <br />
                studies? <br />
                <span className="text-black/60">Ask Chloris AI.</span>
              </h3>

              <p className="text-black/80 font-black text-sm uppercase tracking-wide leading-relaxed max-w-xs">
                Instant intelligence about campus, policies, and your future.
              </p>
            </div>

            <RetroButton
              variant="neon-yellow"
              size="lg"
              onClick={() => navigate('/chat')}
              className="w-full text-xl"
            >
              START INTELLIGENT CHAT
              <Zap size={24} className="ml-3" />
            </RetroButton>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;