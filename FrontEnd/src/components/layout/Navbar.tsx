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
    <header className="flex items-center justify-between py-6 font-outfit">
      {/* Page Title & Breadcrumb-ish info */}
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">{getPageTitle()}</h1>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[11px] font-semibold text-white uppercase tracking-wider px-2 py-0.5 bg-white/10 rounded-md">Main</span>
          <span className="text-white/20 text-[10px]">/</span>
          <span className="text-white/40 text-[11px] font-medium tracking-wide">{getPageTitle()}</span>
        </div>
      </div>

      {/* Action Icons */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-xl shadow-sm px-4 py-2.5 text-white/30 focus-within:border-white focus-within:ring-2 focus-within:ring-white/5 transition-all w-72">
          <Search size={18} className="text-white/30" />
          <input type="text" placeholder="Search resources..." className="bg-transparent border-none outline-none text-sm ml-3 w-full font-medium text-white placeholder:text-white/30" />
        </div>

        <button className="relative p-3 bg-white/5 border border-white/10 rounded-xl shadow-sm text-white/60 hover:bg-white/10 transition-all group" title="View notifications">
          <Bell size={22} className="group-hover:scale-110 transition-transform" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-white rounded-full border-2 border-black"></span>
        </button>
      </div>
    </header>

  );
};

export default Navbar;