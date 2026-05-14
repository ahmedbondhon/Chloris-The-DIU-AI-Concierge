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
        "lg:translate-x-0 border-r border-border bg-[#0e0010]",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Branding Area */}
        <div className="h-40 flex flex-col items-center justify-center relative px-8 border-b border-border bg-surface/50">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-text-primary tracking-tight leading-none mb-1">CHLORIS</h2>
            <div className="flex items-center justify-center gap-2">
              <span className="h-[1px] w-4 bg-border"></span>
              <span className="text-[10px] font-semibold text-text-muted uppercase tracking-widest">AI Concierge</span>
              <span className="h-[1px] w-4 bg-border"></span>
            </div>
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className="lg:hidden absolute top-4 right-4 p-2 bg-surface text-text-primary hover:bg-border transition-all rounded-lg"
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
                      ? "bg-[#1e1a2e] text-primary shadow-classic"
                      : "text-text-muted hover:bg-surface hover:text-text-primary"
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
        <div className="p-6 mt-auto border-t border-border bg-surface/50">
          <div className="bg-surface border border-border p-4 rounded-2xl shadow-classic space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold text-sm border border-primary/20">
                  T
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-background rounded-full"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-text-primary text-sm truncate">Tonmoy</p>
                <p className="text-[10px] font-semibold text-text-muted uppercase tracking-widest">L4 Student</p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, x: 2 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary text-white text-[11px] font-bold rounded-xl hover:opacity-90 transition-all shadow-classic-lg"
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