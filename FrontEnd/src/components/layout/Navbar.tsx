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
        <h1 className="text-3xl font-black text-black tracking-tighter uppercase">{getPageTitle()}</h1>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[10px] font-black text-black uppercase tracking-widest bg-retro-yellow border border-black px-2 py-0.5 shadow-retro-hard-sm">Main</span>
          <span className="text-black text-[10px] truncate">/</span>
          <span className="text-black/60 text-[10px] font-black uppercase tracking-widest">{getPageTitle()}</span>
        </div>
      </div>

      {/* Action Icons */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center bg-white border-2 border-black shadow-retro-hard-sm px-4 py-2 text-black focus-within:shadow-retro-hard transition-all w-64">
          <Search size={18} />
          <input type="text" placeholder="Search anything..." className="bg-transparent border-none outline-none text-sm ml-3 w-full font-black uppercase tracking-widest placeholder:text-black/40" />
        </div>

        <button className="relative p-3 bg-white border-2 border-black shadow-retro-hard-sm text-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all group" title="View notifications">
          <Bell size={22} className="group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-retro-pink border-2 border-black rounded-full shadow-retro-hard-sm"></span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;