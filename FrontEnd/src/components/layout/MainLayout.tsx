import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';
import { Menu, X } from 'lucide-react';

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen bg-black font-outfit">

      {/* Sidebar - Pass state and close function */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-[22rem] w-full overflow-x-hidden transition-all duration-500 ease-in-out">
        {/* Mobile Header Overlay (when sidebar is closed) */}
        {!isSidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="lg:hidden fixed top-6 left-6 z-[60] p-3 bg-white text-black backdrop-blur-md rounded-2xl shadow-xl border border-white/10 active:scale-95 transition-all"
            title="Open menu"
          >
            <Menu size={24} />
          </button>
        )}

        <div className="px-4 lg:px-10 py-4">
          <Navbar />
        </div>

        {/* 'Outlet' is where the pages (Dashboard, Chat, etc.) will appear */}
        <main className="flex-1 p-4 lg:p-10 lg:pt-2">
          <div className="max-w-[1400px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Outlet />
          </div>
        </main>

        <Footer />
      </div>

      {/* Mobile Overlay Background (when sidebar is open) */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-500"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default MainLayout;