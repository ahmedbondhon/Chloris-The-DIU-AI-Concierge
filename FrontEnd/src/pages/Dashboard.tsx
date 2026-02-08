import React from 'react';
import { BookOpen, Clock, Award } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Student Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 text-green-600 rounded-lg">
              <Award size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Current CGPA</p>
              <p className="text-2xl font-bold text-slate-800">3.85</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
              <BookOpen size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Credits Completed</p>
              <p className="text-2xl font-bold text-slate-800">84 / 120</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Next Class</p>
              <p className="text-lg font-bold text-slate-800">Software Eng.</p>
              <p className="text-xs text-slate-400">2:00 PM • Room 402</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 text-center bg-white rounded-xl border border-dashed border-slate-300">
        <p className="text-slate-500">More widgets coming soon...</p>
      </div>
    </div>
  );
};

export default Dashboard;