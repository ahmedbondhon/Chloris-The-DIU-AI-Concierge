import React, { useState } from 'react';
import { format } from 'date-fns';
import { Clock, Users, MapPin, CheckCircle2 } from 'lucide-react';
import CalendarView from '../components/calendar/CalendarView';
import Button from '../components/common/Button';

const RoomBooking = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  const demoSlots = [
    { id: 1, time: '10:00 AM - 11:30 AM', room: 'Room 302', capacity: 6, status: 'available' },
    { id: 2, time: '12:00 PM - 01:30 PM', room: 'Project Lab 1', capacity: 10, status: 'available' },
    { id: 3, time: '02:00 PM - 03:30 PM', room: 'Room 405', capacity: 4, status: 'available' },
    { id: 4, time: '04:00 PM - 05:30 PM', room: 'Room 201', capacity: 8, status: 'booked' },
  ];

  return (
    <div className="space-y-10 pb-16 font-outfit">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 px-1">
        <div>
          <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight mb-3">Study Sanctuary</h1>
          <p className="text-slate-400 text-lg font-medium">Reserve your ideal space for deep focus or group collaboration.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="secondary" className="px-8 shadow-sm" title="View my bookings history">History</Button>
          <Button className="px-8 shadow-xl" title="Quickly book an available room">Quick Book</Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
        {/* Left Area: Calendar */}
        <div className="flex-1 w-full overflow-hidden animate-in fade-in slide-in-from-left-6 duration-700">
          <CalendarView
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />

          <div className="mt-10 flex flex-wrap gap-10 px-4">
            <div className="flex items-center gap-3">
              <span className="w-3.5 h-3.5 rounded-full bg-indigo-500 ring-4 ring-indigo-500/20"></span>
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Selected</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20"></span>
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Reserved</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-3.5 h-3.5 rounded-full bg-slate-700 ring-4 ring-slate-800"></span>
              <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">Full</span>
            </div>
          </div>
        </div>

        {/* Right Area: Selection Sidebar */}
        <div className="w-full lg:w-[400px] space-y-6 animate-in fade-in slide-in-from-right-6 duration-700">
          <div className="bg-slate-900/60 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/5 shadow-2xl shadow-black/50 lg:sticky lg:top-10">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-black text-white tracking-tight">
                {format(selectedDate, 'MMM d, yyyy')}
              </h3>
              <div className="px-4 py-1.5 bg-indigo-500/10 text-indigo-400 text-[10px] font-black rounded-lg uppercase tracking-widest border border-indigo-500/10">
                {demoSlots.filter(s => s.status === 'available').length} Open
              </div>
            </div>

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {demoSlots.map((slot) => (
                <div
                  key={slot.id}
                  onClick={() => slot.status === 'available' && setSelectedSlot(slot.id)}
                  className={`
                    p-6 rounded-[2rem] border-2 transition-all duration-300 cursor-pointer group relative overflow-hidden
                    ${slot.status === 'booked'
                      ? 'bg-slate-800/20 border-transparent opacity-20 cursor-not-allowed'
                      : selectedSlot === slot.id
                        ? 'bg-white border-white shadow-2xl shadow-white/5'
                        : 'bg-slate-800/40 border-white/5 hover:border-indigo-500/30 hover:bg-slate-800/60'
                    }
                  `}
                >
                  {selectedSlot === slot.id && (
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-[#5b52f1]"></div>
                  )}

                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${selectedSlot === slot.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'bg-slate-900/50 text-slate-500'}`}>
                        <Clock size={20} />
                      </div>
                      <span className={`text-[15px] font-black tracking-tight ${selectedSlot === slot.id ? 'text-slate-900' : 'text-slate-100'}`}>
                        {slot.time}
                      </span>
                    </div>
                    {selectedSlot === slot.id && (
                      <CheckCircle2 size={24} className="text-indigo-600 animate-in zoom-in duration-300" />
                    )}
                  </div>

                  <div className="flex items-center gap-5 ml-[3.25rem]">
                    <div className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest ${selectedSlot === slot.id ? 'text-slate-500' : 'text-slate-400'}`}>
                      <MapPin size={14} className={selectedSlot === slot.id ? 'text-slate-400' : 'text-slate-500'} />
                      {slot.room}
                    </div>
                    <div className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest ${selectedSlot === slot.id ? 'text-slate-500' : 'text-slate-400'}`}>
                      <Users size={14} className={selectedSlot === slot.id ? 'text-slate-400' : 'text-slate-500'} />
                      MAX {slot.capacity}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-10 mt-10 border-t border-white/5">
              <Button
                size="lg"
                className={`w-full shadow-2xl transition-all ${selectedSlot ? 'shadow-indigo-500/30' : 'shadow-none'}`}
                disabled={!selectedSlot}
                title="Proceed to confirm booking"
              >
                Confirm Reservation
              </Button>
              <p className="text-[10px] text-center text-slate-500 mt-5 font-black uppercase tracking-[0.2em] opacity-60">
                Secured DIU Study Portal
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default RoomBooking;