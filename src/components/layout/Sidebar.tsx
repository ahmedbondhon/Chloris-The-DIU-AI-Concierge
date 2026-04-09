import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, Calendar, FileText, LogOut, X, User } from 'lucide-react';
import { authService } from '../../services/authService';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

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
      <aside className={cn(
        "w-76 h-screen fixed left-0 top-0 bottom-0 flex flex-col z-50 transition-all duration-500",
        "lg:translate-x-0 border-r-4 border-black bg-white",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Branding Area */}
        <div className="h-40 flex flex-col items-center justify-center relative px-8 border-b-4 border-black bg-retro-yellow">
          <motion.div
            whileHover={{ scale: 1.05, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
            className="w-16 h-16 bg-white border-2 border-black p-2 shadow-retro-hard-sm cursor-pointer mb-3"
            onClick={() => (window.location.href = '/dashboard')}
          >
            <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
          </motion.div>
          <div className="text-center">
            <h2 className="text-2xl font-black text-black tracking-tighter leading-none mb-1">CHLORIS</h2>
            <div className="flex items-center justify-center gap-2">
              <span className="h-[2px] w-4 bg-black"></span>
              <span className="text-[10px] font-black text-black uppercase tracking-widest">AI Concierge</span>
              <span className="h-[2px] w-4 bg-black"></span>
            </div>
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className="lg:hidden absolute top-4 right-4 p-2 bg-black text-white hover:bg-retro-pink transition-all border-2 border-white"
            title="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-8 space-y-4 overflow-y-auto relative z-10 custom-scrollbar">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => { if (window.innerWidth < 1024) onClose(); }}
                className="block"
              >
                <motion.div
                  whileHover={{ x: 5 }}
                  className={cn(
                    "flex items-center gap-4 px-6 py-4 border-2 border-black transition-all font-black uppercase tracking-widest text-xs",
                    isActive
                      ? "bg-retro-blue text-black shadow-retro-hard translate-x-1"
                      : "bg-white text-black hover:bg-retro-yellow/10"
                  )}
                >
                  <item.icon size={18} strokeWidth={isActive ? 3 : 2} />
                  <span>{item.label}</span>
                </motion.div>
              </NavLink>
            );
          })}
        </nav>

        {/* Account Pod */}
        <div className="p-6 mt-auto border-t-4 border-black bg-retro-pink/10">
          <div className="bg-white border-2 border-black p-4 shadow-retro-hard-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-retro-pink border-2 border-black flex items-center justify-center text-white font-black text-sm">
                  JD
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-black rounded-full"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-black text-black text-xs truncate uppercase tracking-tighter">John Doe</p>
                <p className="text-[8px] font-black text-black/60 uppercase tracking-widest">L4 Student</p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, x: 2 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-black text-white text-[9px] font-black tracking-widest hover:bg-retro-pink transition-all border-2 border-black"
            >
              <LogOut size={12} strokeWidth={3} />
              LOGOUT
            </motion.button>
          </div>
        </div>
      </aside>
    </AnimatePresence>
  );
};

export default Sidebar;