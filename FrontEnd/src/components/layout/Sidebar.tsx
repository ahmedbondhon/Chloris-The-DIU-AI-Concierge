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
        "lg:translate-x-0 border-r border-white/5 bg-black",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Branding Area */}
        <div className="h-40 flex flex-col items-center justify-center relative px-8 border-b border-white/5 bg-white/5">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-16 h-16 bg-white/5 rounded-2xl shadow-classic flex items-center justify-center cursor-pointer mb-3 p-3 border border-white/10"
            onClick={() => (window.location.href = '/dashboard')}
          >
            <img src="/logo.png" alt="Logo" className="w-full h-full object-contain invert" />
          </motion.div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white tracking-tight leading-none mb-1">CHLORIS</h2>
            <div className="flex items-center justify-center gap-2">
              <span className="h-[1px] w-4 bg-white/20"></span>
              <span className="text-[10px] font-semibold text-white/40 uppercase tracking-wider">AI Concierge</span>
              <span className="h-[1px] w-4 bg-white/20"></span>
            </div>
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className="lg:hidden absolute top-4 right-4 p-2 bg-black text-white hover:bg-slate-800 transition-all rounded-lg"
            title="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto relative z-10 custom-scrollbar">
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
                  whileHover={{ x: 4 }}
                  className={cn(
                    "flex items-center gap-4 px-6 py-3.5 rounded-xl transition-all font-semibold text-sm",
                    isActive
                      ? "bg-white text-black shadow-classic"
                      : "text-white/40 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  <span>{item.label}</span>
                </motion.div>
              </NavLink>
            );
          })}
        </nav>

        {/* Account Pod */}
        <div className="p-6 mt-auto border-t border-white/5 bg-white/5">
          <div className="bg-white/5 border border-white/10 p-4 rounded-2xl shadow-classic space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white font-bold text-sm border border-white/10">
                  JD
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-black rounded-full"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white text-sm truncate">John Doe</p>
                <p className="text-[10px] font-semibold text-white/40 uppercase tracking-wide">L4 Student</p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-white text-black text-[11px] font-bold rounded-xl hover:bg-slate-200 transition-all shadow-classic-lg"
            >
              <LogOut size={14} strokeWidth={2.5} />
              LOGOUT
            </motion.button>
          </div>
        </div>
      </aside>

    </AnimatePresence>
  );
};

export default Sidebar;