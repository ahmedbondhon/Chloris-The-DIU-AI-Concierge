import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';
import { Menu } from 'lucide-react';
import { cn } from '../../lib/utils';

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const isChatPage = location.pathname === '/chat';

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen bg-background font-sora">
      {/* Sidebar - Pass state and close function */}
      {!isChatPage && <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />}

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-h-screen ${isChatPage ? 'lg:ml-0' : 'lg:ml-[22rem]'} w-full overflow-x-hidden transition-all duration-500 ease-in-out`}>
        {/* Mobile Header Overlay (when sidebar is closed) */}
        {!isSidebarOpen && !isChatPage && (
          <button
            onClick={toggleSidebar}
            className="lg:hidden fixed top-6 left-6 z-[60] p-3 bg-surface text-text-primary backdrop-blur-md rounded-2xl shadow-xl border border-border active:scale-95 transition-all"
            title="Open menu"
          >
            <Menu size={24} />
          </button>
        )}

        <div className={isChatPage ? 'hidden' : 'px-4 lg:px-10 py-4'}>
          <Navbar />
        </div>

        {/* 'Outlet' is where the pages (Dashboard, Chat, etc.) will appear */}
        <main className={cn("flex-1", isChatPage ? "p-0 h-full" : "p-4 lg:p-10 lg:pt-2")}>
          <div className={cn(
            "mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700",
            isChatPage ? "max-w-none h-full" : "max-w-[1400px]"
          )}>
            <Outlet />
          </div>
        </main>

        {!isChatPage && <Footer />}
      </div>

      {/* Mobile Overlay Background (when sidebar is open) */}
      {isSidebarOpen && !isChatPage && (
        <div
          className="lg:hidden fixed inset-0 bg-background/60 backdrop-blur-sm z-40 transition-all duration-500"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default MainLayout;