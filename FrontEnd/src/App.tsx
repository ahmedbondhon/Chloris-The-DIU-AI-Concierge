import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import MainLayout from './components/layout/MainLayout';


// --- Pages ---
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ChatAssistant from './pages/ChatAssistant';
import RoomBooking from './pages/RoomBooking';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';

// --- The Security Guard ---
// This component checks if you have a "Ticket" (Token).
// If yes -> Show the page.
// If no -> Kick you to Login.
// --- The Security Guard (TEMPORARILY BYPASSED for development) ---
// This component previously checked for authentication.
// For now, it just shows the page directly.
const ProtectedRoute = () => {
  return <Outlet />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* 🟢 PUBLIC ROUTES */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* 🔒 PROTECTED ROUTES (BYPASSED) */}
          <Route element={<ProtectedRoute />}>

            {/* 🎨 MAIN LAYOUT (Adds Sidebar & Navbar to all these pages) */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/chat" element={<ChatAssistant />} />
              <Route path="/bookings" element={<RoomBooking />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

          </Route>

          {/* 🛑 CATCH ALL (Redirect unknown URLs to Dashboard) */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;