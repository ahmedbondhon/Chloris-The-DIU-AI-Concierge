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
    <header className="flex items-center justify-between py-6 font-sora">
      {/* Page Title & Breadcrumb-ish info */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary tracking-tight">{getPageTitle()}</h1>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[11px] font-semibold text-primary uppercase tracking-widest px-2 py-0.5 bg-primary/20 rounded-md">Main</span>
          <span className="text-text-muted/20 text-[10px]">/</span>
          <span className="text-text-muted text-[11px] font-medium tracking-widest">{getPageTitle()}</span>
        </div>
      </div>

      {/* Action Icons */}
      <div className="flex items-center gap-4">
        <button className="relative p-3 bg-surface border border-border rounded-xl shadow-sm text-text-muted hover:bg-border transition-all group" title="View notifications">
          <Bell size={22} className="group-hover:scale-110 transition-transform" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-background"></span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;