import React, { useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  isToday
} from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

interface CalendarViewProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  bookedDates?: Date[]; // Optional: Highlight days that are already booked
}

const CalendarView: React.FC<CalendarViewProps> = ({
  selectedDate,
  onDateSelect,
  bookedDates = []
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // 1. Calculate the days to display
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  // 2. Navigation Handlers
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  // 3. Helper to check if a date has a booking
  const hasBooking = (date: Date) => {
    return bookedDates.some(bookedDate => isSameDay(bookedDate, date));
  };

  return (
    <div className="w-full bg-surface border border-border rounded-3xl overflow-hidden shadow-classic-xl font-sora">
      {/* --- Header: Month & Navigation --- */}
      <div className="flex items-center justify-between px-8 py-8 lg:px-10 border-b border-border bg-surface backdrop-blur-xl">
        <div className="flex items-center gap-4 lg:gap-5">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20 border border-primary/20">
            <CalendarIcon size={28} />
          </div>
          <h2 className="text-2xl lg:text-3xl font-black text-text-primary tracking-tight uppercase tracking-widest">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
        </div>
        <div className="flex gap-3">
          <button
            onClick={prevMonth}
            className="p-4 bg-background hover:bg-primary/5 rounded-2xl text-text-muted transition-all border border-border shadow-sm active:scale-95"
            title="Previous month"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextMonth}
            className="p-4 bg-background hover:bg-primary/5 rounded-2xl text-text-muted transition-all border border-border shadow-sm active:scale-95"
            title="Next month"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* --- Days of Week Header --- */}
      <div className="grid grid-cols-7 border-b border-border bg-background">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="py-6 text-center text-[10px] lg:text-[11px] font-black text-text-muted uppercase tracking-[0.2em]">
            {day}
          </div>
        ))}
      </div>

      {/* --- Calendar Grid --- */}
      <div className="grid grid-cols-7 p-2 lg:p-4 gap-1 lg:gap-2">
        {calendarDays.map((day, dayIdx) => {
          const isSelected = isSameDay(day, selectedDate);
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isDayToday = isToday(day);
          const isBooked = hasBooking(day);

          return (
            <div
              key={day.toString()}
              className={`
                relative min-h-[5rem] lg:min-h-[7rem] rounded-2xl lg:rounded-3xl p-4 cursor-pointer transition-all duration-300
                ${isSelected
                  ? 'bg-primary text-white shadow-2xl shadow-primary/20 scale-[0.98]'
                  : isCurrentMonth
                    ? 'bg-surface border border-border hover:bg-primary/5 hover:shadow-2xl hover:shadow-black/20 text-text-primary'
                    : 'text-text-muted/10 pointer-events-none opacity-20'
                }
                group
              `}
              onClick={() => onDateSelect(day)}
            >
              <div className="flex flex-col h-full justify-between relative z-10">
                <div className="flex justify-between items-start">
                  <span className={`
                    text-base lg:text-lg font-black w-8 lg:w-10 h-8 lg:h-10 flex items-center justify-center rounded-xl lg:rounded-2xl transition-all border
                    ${isDayToday && !isSelected ? 'bg-primary/10 text-primary border-primary/20' : 'border-transparent'}
                    ${isSelected ? 'bg-white/20 border-white/10' : ''}
                  `}>
                    {format(day, 'd')}
                  </span>

                  {isBooked && (
                    <span className={`w-2 h-2 rounded-full mt-1.5 ${isSelected ? 'bg-white' : 'bg-emerald-400'} shadow-sm`}></span>
                  )}
                </div>

                {isSelected && (
                  <div className="flex items-center gap-1.5 mt-auto">
                    <span className="text-[9px] font-black uppercase tracking-widest text-white/80">
                      SELECTED
                    </span>
                  </div>
                )}

                {isBooked && !isSelected && (
                  <div className="flex items-center gap-1.5 mt-auto">
                    <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400">
                      RESERVED
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>

  );
};

export default CalendarView;