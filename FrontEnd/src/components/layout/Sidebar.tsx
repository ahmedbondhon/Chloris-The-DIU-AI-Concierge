import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, Calendar, LogOut } from 'lucide-react';
import { authService } from '../../services/authService';

const Sidebar = () => {
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/chat', label: 'AI Concierge', icon: MessageSquare },
    { path: '/bookings', label: 'Room Booking', icon: Calendar },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen fixed left-0 top-0 flex flex-col z-10">
      {/* --- Logo Area --- */}
      <div className="h-16 flex items-center px-6 border-b border-slate-100">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
          <span className="text-white font-bold text-xl">C</span>
        </div>
        <span className="text-lg font-bold text-slate-800">Chloris AI</span>
      </div>

      {/* --- Navigation Links --- */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium
              ${isActive 
                ? 'bg-blue-50 text-blue-700' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }
            `}
          >
            <item.icon size={20} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* --- User Profile & Logout --- */}
      <div className="p-4 border-t border-slate-100">
        <div className="bg-slate-50 p-3 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
              JD
            </div>
            <div className="text-sm">
              <p className="font-medium text-slate-700">Student</p>
              <p className="text-xs text-slate-400">Online</p>
            </div>
          </div>
          <button 
            onClick={authService.logout}
            className="text-slate-400 hover:text-red-500 transition-colors p-1"
            title="Sign Out"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;