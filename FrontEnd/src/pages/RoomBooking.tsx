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
    <div className="space-y-10 pb-16 font-outfit bg-black">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 px-1">
        <div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3">Study Sanctuary</h1>
          <p className="text-white/40 text-lg font-medium">Reserve your ideal space for deep focus or group collaboration.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="secondary" className="px-8 shadow-classic rounded-xl bg-white/5 border-white/10 text-white hover:bg-white hover:text-black" title="View my bookings history">History</Button>
          <Button className="px-8 shadow-classic-lg rounded-xl bg-white text-black hover:bg-white/90" title="Quickly book an available room">Quick Book</Button>
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
              <span className="w-3.5 h-3.5 rounded-full bg-white ring-4 ring-white/20"></span>
              <span className="text-[11px] font-bold text-white/40 uppercase tracking-widest">Selected</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/10"></span>
              <span className="text-[11px] font-bold text-white/40 uppercase tracking-widest">Reserved</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-3.5 h-3.5 rounded-full bg-white/10 ring-4 ring-white/5"></span>
              <span className="text-[11px] font-bold text-white/20 uppercase tracking-widest">Full</span>
            </div>
          </div>
        </div>

        {/* Right Area: Selection Sidebar */}
        <div className="w-full lg:w-[400px] space-y-6 animate-in fade-in slide-in-from-right-6 duration-700">
          <div className="bg-white/5 p-10 rounded-[2rem] border border-white/10 shadow-classic-xl lg:sticky lg:top-10">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {format(selectedDate, 'MMM d, yyyy')}
              </h3>
              <div className="px-4 py-1.5 bg-white/10 text-white text-[10px] font-bold rounded-lg uppercase tracking-widest border border-white/5">
                {demoSlots.filter(s => s.status === 'available').length} Open
              </div>
            </div>

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {demoSlots.map((slot) => (
                <div
                  key={slot.id}
                  onClick={() => slot.status === 'available' && setSelectedSlot(slot.id)}
                  className={`
                    p-6 rounded-2xl border transition-all duration-300 cursor-pointer group relative overflow-hidden
                    ${slot.status === 'booked'
                      ? 'bg-white/5 border-transparent opacity-40 cursor-not-allowed'
                      : selectedSlot === slot.id
                        ? 'bg-white text-black border-white shadow-classic'
                        : 'bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10'
                    }
                  `}
                >
                  {selectedSlot === slot.id && (
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-white"></div>
                  )}


                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${selectedSlot === slot.id ? 'bg-black/10 text-black' : 'bg-white/10 text-white/40'}`}>
                        <Clock size={20} />
                      </div>
                      <span className={`text-[15px] font-bold tracking-tight ${selectedSlot === slot.id ? 'text-black' : 'text-white'}`}>
                        {slot.time}
                      </span>
                    </div>
                    {selectedSlot === slot.id && (
                      <CheckCircle2 size={24} className="text-black animate-in zoom-in duration-300" />
                    )}
                  </div>

                  <div className="flex items-center gap-5 ml-[3.25rem]">
                    <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${selectedSlot === slot.id ? 'text-black/60' : 'text-white/40'}`}>
                      <MapPin size={14} className={selectedSlot === slot.id ? 'text-black/40' : 'text-white/20'} />
                      {slot.room}
                    </div>
                    <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${selectedSlot === slot.id ? 'text-black/60' : 'text-white/40'}`}>
                      <Users size={14} className={selectedSlot === slot.id ? 'text-black/40' : 'text-white/20'} />
                      MAX {slot.capacity}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-10 mt-10 border-t border-white/10">
              <Button
                size="lg"
                className={`w-full rounded-2xl shadow-classic-lg transition-all ${selectedSlot ? 'bg-white text-black hover:bg-white/90 border-none' : 'bg-white/5 border-white/10 text-white/20'}`}
                disabled={!selectedSlot}
                title="Proceed to confirm booking"
              >
                Confirm Reservation
              </Button>
              <p className="text-[10px] text-center text-white/40 mt-5 font-bold uppercase tracking-wider opacity-60">
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