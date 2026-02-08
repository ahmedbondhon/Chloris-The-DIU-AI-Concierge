import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import MainLayout from './components/layout/MainLayout';


// --- Pages ---
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ChatAssistant from './pages/ChatAssistant';
import RoomBooking from './pages/RoomBooking';

// --- The Security Guard ---
// This component checks if you have a "Ticket" (Token).
// If yes -> Show the page.
// If no -> Kick you to Login.
const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
    
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* 🟢 PUBLIC ROUTES (No Sidebar, No Protection) */}
          <Route path="/login" element={<Login />} />

          {/* 🔒 PROTECTED ROUTES (Requires Login) */}
          <Route element={<ProtectedRoute />}>
            
            {/* 🎨 MAIN LAYOUT (Adds Sidebar & Navbar to all these pages) */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/chat" element={<ChatAssistant />} />
              <Route path="/bookings" element={<RoomBooking />} />
            </Route>
            
          </Route>

          {/* 🛑 CATCH ALL (Redirect unknown URLs to Login) */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;