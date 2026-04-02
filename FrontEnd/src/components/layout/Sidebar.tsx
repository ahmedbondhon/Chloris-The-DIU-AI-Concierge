import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, Calendar, FileText, LogOut, X, User } from 'lucide-react';
import { authService } from '../../services/authService';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/chat', label: 'AI Assistant', icon: MessageSquare },
    { path: '/bookings', label: 'Bookings', icon: Calendar },
    { path: '/requests', label: 'Service Requests', icon: FileText },
    { path: '/profile', label: 'My Profile', icon: User },
  ];

  const handleLogout = () => {
    authService.logout();
  };

  return (
    <AnimatePresence>
      <aside className={`
        w-76 h-[calc(100vh-3rem)] fixed left-6 top-6 bottom-6 flex flex-col z-50 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]
        lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-[120%]'}
        rounded-[3.5rem] border border-white/5 shadow-2xl shadow-black/80 overflow-hidden bg-slate-900/60 backdrop-blur-3xl
      `}>
        {/* Abstract Background Glows */}
        <div className="absolute top-0 left-0 w-full h-32 bg-indigo-600/10 blur-[80px] -mt-16 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-full h-32 bg-violet-600/5 blur-[80px] -mb-16 pointer-events-none"></div>

        {/* Branding Area - Minimalist */}
        <div className="h-40 flex flex-col items-center justify-center relative px-8">
          <motion.div
            whileHover={{ scale: 1.05, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
            className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-violet-600 p-4 shadow-2xl shadow-indigo-500/20 cursor-pointer group mb-4"
            onClick={() => (window.location.href = '/dashboard')}
          >
            <img src="/logo.png" alt="Logo" className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
          </motion.div>
          <div className="text-center">
            <h2 className="text-xl font-black text-white tracking-[0.2em] leading-none mb-1">CHLORIS</h2>
            <div className="flex items-center justify-center gap-2">
              <span className="h-[1px] w-4 bg-indigo-500/50"></span>
              <span className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.3em]">AI Concierge</span>
              <span className="h-[1px] w-4 bg-indigo-500/50"></span>
            </div>
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className="lg:hidden absolute top-8 right-8 p-3 bg-slate-800/80 rounded-2xl text-slate-400 hover:text-white transition-all"
            title="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation - Architectural Floating Dock Style */}
        <nav className="flex-1 px-4 py-6 space-y-4 overflow-y-auto custom-scrollbar relative z-10 flex flex-col items-center">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => { if (window.innerWidth < 1024) onClose(); }}
                className="relative group w-full flex justify-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    w-[85%] flex items-center gap-4 px-6 py-4.5 rounded-[2rem] transition-all duration-500 font-bold
                    ${isActive
                      ? 'bg-white text-slate-900 shadow-2xl shadow-white/5'
                      : 'text-slate-400 hover:text-indigo-400'
                    }
                  `}
                >
                  <item.icon size={22} strokeWidth={isActive ? 3 : 2} className="transition-transform duration-500" />
                  <span className="text-[14px] tracking-tight">{item.label}</span>

                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 w-1.5 h-8 bg-indigo-500 rounded-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.div>

                {/* Magnetic Hover Glow */}
                {!isActive && (
                  <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/5 rounded-[2.5rem] blur-xl transition-all duration-500 -z-10 mx-4"></div>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Account Pod - Distinct Floating Element */}
        <div className="p-8 mt-auto">
          <NavLink to="/profile" className="relative group block">
            <div className="absolute inset-0 bg-indigo-600/10 blur-2xl group-hover:bg-indigo-600/20 transition-all rounded-[3rem]"></div>
            <div className="relative bg-slate-800/40 backdrop-blur-xl p-6 rounded-[3rem] border border-white/5 space-y-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-black text-lg shadow-xl"
                  >
                    JD
                  </motion.div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-slate-800 rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-slate-100 text-[14px] truncate tracking-tight">John Doe</p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                    <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">L4 Student</p>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
                className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-white/5 text-slate-400 text-[10px] font-black tracking-widest hover:bg-rose-500/10 hover:text-rose-400 transition-all duration-500 border border-transparent hover:border-rose-500/20"
              >
                <LogOut size={14} strokeWidth={3} />
                LOGOUT
              </motion.button>
            </div>
          </NavLink>
        </div>
      </aside>
    </AnimatePresence>
  );
};

export default Sidebar;