import React, { useState } from 'react';
import { format } from 'date-fns';
import { Clock, Users, MapPin, CheckCircle2, History, Zap } from 'lucide-react';
import CalendarView from '../components/calendar/CalendarView';
import RetroButton from '../components/retro/RetroButton';
import RetroCard from '../components/retro/RetroCard';

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
    <div className="space-y-8 pb-10 font-sora bg-[#0A0A0C] min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 px-1 pt-4">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              <Zap size={20} className="text-primary" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-text-primary tracking-tight uppercase tracking-widest">Study Sanctuary</h1>
          </div>
          <p className="text-text-muted text-sm font-medium opacity-60">Reserve your ideal space for deep focus or group collaboration.</p>
        </div>
        <div className="flex gap-4">
          <RetroButton variant="secondary" className="px-6 py-2.5 text-xs shadow-xl rounded-xl border-white/10 bg-[#111113]" title="View my bookings history">
            <History size={16} className="mr-2" /> History
          </RetroButton>
          <RetroButton variant="primary" className="px-6 py-2.5 text-xs shadow-xl shadow-primary/20 rounded-xl" title="Quickly book an available room">
            Quick Book
          </RetroButton>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
        {/* Left Area: Calendar */}
        <div className="flex-1 w-full overflow-hidden animate-in fade-in slide-in-from-left-6 duration-700">
          <RetroCard variant="modern-3d" className="relative p-0 overflow-hidden !rounded-[2rem] border-white/5 shadow-2xl">
            <CalendarView
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
            />
          </RetroCard>

          <div className="mt-10 flex flex-wrap gap-10 px-8">
            <div className="flex items-center gap-3">
              <span className="w-3.5 h-3.5 rounded-full bg-primary shadow-[0_0_10px_rgba(139,92,246,0.6)]"></span>
              <span className="text-[11px] font-bold text-text-muted uppercase tracking-widest opacity-40">Selected</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]"></span>
              <span className="text-[11px] font-bold text-text-muted uppercase tracking-widest opacity-40">Reserved</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-3.5 h-3.5 rounded-full bg-white/5 border border-white/10"></span>
              <span className="text-[11px] font-bold text-text-muted uppercase tracking-widest opacity-40 text-opacity-20">Full</span>
            </div>
          </div>
        </div>

        {/* Right Area: Selection Sidebar */}
        <div className="w-full lg:w-[400px] space-y-6 animate-in fade-in slide-in-from-right-6 duration-700">
          <RetroCard variant="modern-3d" className="p-6 rounded-[2rem] border-white/5 shadow-2xl lg:sticky lg:top-10">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-xl font-bold text-text-primary tracking-[0.05em] uppercase text-xs">
                {format(selectedDate, 'MMM d, yyyy')}
              </h3>
              <div className="px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-bold rounded-xl uppercase tracking-widest border border-primary/20">
                {demoSlots.filter(s => s.status === 'available').length} Open
              </div>
            </div>

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {demoSlots.map((slot) => (
                <div
                  key={slot.id}
                  onClick={() => slot.status === 'available' && setSelectedSlot(slot.id)}
                  className={`
                    p-6 rounded-[1.5rem] border transition-all duration-300 cursor-pointer group relative overflow-hidden
                    ${slot.status === 'booked'
                      ? 'bg-white/5 border-white/5 opacity-20 cursor-not-allowed shadow-none'
                      : selectedSlot === slot.id
                        ? 'bg-primary text-white border-primary shadow-2xl shadow-primary/20 scale-[1.02]'
                        : 'bg-[#111113] border-white/5 hover:border-primary/30 hover:bg-primary/5 shadow-lg'
                    }
                  `}
                >
                  {selectedSlot === slot.id && (
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-white/30"></div>
                  )}

                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors border ${selectedSlot === slot.id ? 'bg-white/20 text-white border-white/20' : 'bg-primary/10 text-primary border-primary/10'}`}>
                        <Clock size={18} />
                      </div>
                      <span className={`text-[13px] font-bold tracking-widest uppercase ${selectedSlot === slot.id ? 'text-white' : 'text-text-primary'}`}>
                        {slot.time}
                      </span>
                    </div>
                    {selectedSlot === slot.id && (
                      <CheckCircle2 size={20} className="text-white animate-in zoom-in duration-300" />
                    )}
                  </div>

                  <div className="flex items-center gap-5 ml-[3.25rem]">
                    <div className={`flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest ${selectedSlot === slot.id ? 'text-white/80' : 'text-text-muted opacity-40'}`}>
                      <MapPin size={12} className={selectedSlot === slot.id ? 'text-white/60' : 'text-primary/40'} />
                      {slot.room}
                    </div>
                    <div className={`flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest ${selectedSlot === slot.id ? 'text-white/80' : 'text-text-muted opacity-40'}`}>
                      <Users size={12} className={selectedSlot === slot.id ? 'text-white/60' : 'text-primary/40'} />
                      MAX {slot.capacity}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-10 mt-10 border-t border-white/5">
              <RetroButton
                size="lg"
                className={`w-full rounded-xl shadow-2xl transition-all border ${selectedSlot ? 'bg-primary text-white shadow-primary/20' : 'bg-white/5 border-white/5 text-text-muted/20 opacity-30 cursor-not-allowed'}`}
                disabled={!selectedSlot}
                title="Confirm Reservation"
              >
                Confirm Reservation
              </RetroButton>
              <p className="text-[10px] text-center text-text-muted/40 mt-5 font-bold uppercase tracking-widest leading-loose">
                Secured DIU Study Portal
              </p>
            </div>
          </RetroCard>
        </div>
      </div>
    </div>

  );
};

export default RoomBooking;