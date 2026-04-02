import React from 'react';
import { Bell, Search } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard': return 'Dashboard';
      case '/chat': return 'Chloris AI';
      case '/bookings': return 'Room Bookings';
      case '/requests': return 'Procedures';
      case '/profile': return 'User Profile';
      default: return 'Dashboard';
    }
  };

  return (
    <header className="flex items-center justify-between py-4 font-outfit">
      {/* Page Title & Breadcrumb-ish info */}
      <div>
        <h1 className="text-3xl font-black text-slate-100 tracking-tight">{getPageTitle()}</h1>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2 py-0.5 rounded-md">Main</span>
          <span className="text-slate-700 text-[10px]">/</span>
          <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{getPageTitle()}</span>
        </div>
      </div>

      {/* Action Icons */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center bg-slate-800/50 border border-white/5 rounded-2xl px-4 py-2 text-slate-500 focus-within:bg-slate-800 focus-within:border-indigo-500/30 focus-within:shadow-2xl focus-within:shadow-indigo-500/5 transition-all w-64">
          <Search size={18} />
          <input type="text" placeholder="Search anything..." className="bg-transparent border-none outline-none text-sm ml-3 w-full font-medium text-slate-200 placeholder-slate-600" />
        </div>

        <button className="relative p-3.5 bg-slate-800 border border-white/5 rounded-2xl text-slate-400 hover:text-indigo-400 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all active:scale-95 group" title="View notifications">
          <Bell size={22} className="group-hover:rotate-12 transition-transform" />
          <span className="absolute top-3.5 right-3.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-slate-800 ring-2 ring-rose-500/20"></span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;