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
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-10 pb-12 px-2 lg:px-6 font-outfit min-h-screen pt-10 bg-black"
    >
      {/* Top Welcome Section */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-1">
        <div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-3">
            {getTimeGreeting()}, <span className="text-white font-extrabold">John!</span> 👋
          </h1>
          <p className="text-white/40 font-medium text-lg lg:text-xl max-w-2xl leading-relaxed">
            Welcome back to your personalized academic hub. You're making <span className="text-white font-bold italic">excellent</span> progress this semester.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex -space-x-3 overflow-hidden p-1">
            {[1, 2, 3, 4].map(i => (
              <motion.div
                key={i}
                whileHover={{ y: -5, scale: 1.1 }}
                className="inline-block h-12 w-12 rounded-full border-2 border-white/20 bg-black cursor-pointer overflow-hidden shadow-classic"
              >
                <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="user" className="w-full h-full object-cover" />
              </motion.div>
            ))}
            <div className="flex items-center justify-center h-12 w-12 rounded-full border-2 border-white/20 bg-white/10 text-white text-xs font-bold shadow-classic">
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
            trend: '+0.2 Up',
            icon: TrendingUp,
            color: 'blue',
            desc: 'Top 5% of your class'
          },
          {
            title: 'Attendance',
            value: '94%',
            trend: 'Perfect',
            icon: Clock,
            color: 'amber',
            progress: 94,
            desc: '12 consecutive days'
          },
          {
            title: 'Active Tasks',
            value: '2 Tasks',
            trend: 'Priority',
            icon: Target,
            color: 'pink',
            desc: 'Next: Data Structures Exam'
          }
        ].map((stat, idx) => (
          <RetroCard
            key={idx}
            variant="primary"
            className="group cursor-pointer relative overflow-hidden !rounded-3xl border-white/5 hover:border-white/20"
          >
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-sm bg-white/10 text-white group-hover:bg-white group-hover:text-black"
              )}>
                <stat.icon size={28} strokeWidth={2} />
              </div>
              <span className="px-3 py-1 bg-black border border-white/5 text-white/40 text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-sm">
                {stat.trend}
              </span>
            </div>

            <div className="relative z-10">
              <p className="text-white/40 font-semibold mb-1 uppercase tracking-wider text-[11px]">{stat.title}</p>
              <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">{stat.value}</h3>

              {stat.progress ? (
                <div className="mt-4">
                  <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden px-0">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.progress}%` }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                      className="h-full bg-white/80"
                    ></motion.div>
                  </div>
                  <p className="text-white/40 text-[11px] mt-3 font-medium flex items-center gap-2">
                    <Sparkles size={12} className="text-white" /> {stat.desc}
                  </p>
                </div>
              ) : (
                <p className="text-white/40 text-[11px] mt-1 font-medium flex items-center gap-2">
                  <Star size={12} className="text-white" fill="#ffffff" /> {stat.desc}
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
            <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-4">
              <div className="w-1.5 h-8 bg-white rounded-full"></div>
              Recent Activity
            </h2>
            <RetroButton
              variant="outline"
              size="sm"
              onClick={() => navigate('/bookings')}
              className="text-xs font-semibold rounded-xl"
            >
              Explore All
            </RetroButton>
          </div>

          <div className="space-y-4">
            {[
              { room: 'Study Pod B', location: 'Main Library', time: '2:00 PM - 4:00 PM', status: 'Confirmed', color: 'blue' },
              { room: 'Physics Lab 04', location: 'Science Block', time: 'Tomorrow, 9:00 AM', status: 'Pending', color: 'pink' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ x: 5 }}
                className={cn(
                  "bg-white/5 border rounded-2xl p-5 flex items-center gap-6 group cursor-pointer border-white/5 shadow-classic transition-all hover:border-white/20"
                )}
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm bg-white/10 text-white group-hover:bg-white group-hover:text-black transition-colors">
                  <Building size={24} strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-bold text-white text-lg">{item.room}</h4>
                    <span className={cn(
                      "px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider",
                      item.status === 'Confirmed' ? 'bg-white/10 text-white' : 'bg-white/5 text-white/40'
                    )}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-white/40 font-medium text-xs flex items-center gap-2">
                    {item.location} <span className="w-1 h-1 bg-white/10 rounded-full"></span> {item.time}
                  </p>
                </div>
                <div className="bg-white/5 text-white/30 group-hover:bg-white group-hover:text-black p-2.5 rounded-xl transition-all">
                  <ArrowRight size={18} />
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
          <div className="relative h-full overflow-hidden rounded-[2rem] bg-white/5 border border-white/10 p-10 flex flex-col justify-between shadow-classic-xl">
            {/* Background Gradient Effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-white/10 transition-all duration-500"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/10 shadow-lg">
                  <Bot size={30} strokeWidth={2} />
                </div>
                <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">Chloris v2.0 AI</span>
                  </div>
                </div>
              </div>

              <h3 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6 tracking-tight">
                Stuck with <br />
                your studies? <br />
                <span className="text-white/20">Ask Chloris.</span>
              </h3>

              <p className="text-white/60 font-medium text-sm leading-relaxed max-w-xs">
                Instant intelligence about campus, policies, and your academic future.
              </p>
            </div>

            <RetroButton
              variant="primary"
              size="lg"
              onClick={() => navigate('/chat')}
              className="w-full text-lg mt-8 rounded-2xl bg-white text-black border-none hover:bg-white/90"
            >
              Start Chat
              <Zap size={22} className="ml-3 text-black" fill="currentColor" />
            </RetroButton>
          </div>
        </motion.div>
      </div>

    </motion.div>
  );
};

export default Dashboard;