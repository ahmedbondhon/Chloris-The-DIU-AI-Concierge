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
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
    <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* --- Header: Month & Navigation --- */}
      <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-800">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex gap-2">
          <button 
            onClick={prevMonth}
            className="p-2 hover:bg-white hover:shadow-sm rounded-lg text-slate-600 transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={nextMonth}
            className="p-2 hover:bg-white hover:shadow-sm rounded-lg text-slate-600 transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* --- Days of Week Header --- */}
      <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/50">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="py-3 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {day}
          </div>
        ))}
      </div>

      {/* --- Calendar Grid --- */}
      <div className="grid grid-cols-7">
        {calendarDays.map((day, dayIdx) => {
          const isSelected = isSameDay(day, selectedDate);
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isDayToday = isToday(day);
          const isBooked = hasBooking(day);

          return (
            <div 
              key={day.toString()} 
              className={`
                relative min-h-[5rem] border-b border-r border-slate-50 p-2 cursor-pointer transition-colors
                ${!isCurrentMonth ? 'bg-slate-50/30 text-slate-300' : 'bg-white'}
                ${isSelected ? '!bg-blue-50' : 'hover:bg-slate-50'}
              `}
              onClick={() => onDateSelect(day)}
            >
              {/* Date Number */}
              <div className="flex justify-between items-start">
                <span className={`
                  text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full
                  ${isDayToday ? 'bg-blue-600 text-white shadow-md' : 'text-slate-700'}
                  ${!isCurrentMonth && !isDayToday && 'text-slate-300'}
                `}>
                  {format(day, 'd')}
                </span>

                {/* Optional: Dot for bookings */}
                {isBooked && (
                  <span className="w-2 h-2 rounded-full bg-green-500 mt-1 mr-1"></span>
                )}
              </div>

              {/* Selection Indicator */}
              {isSelected && (
                <p className="mt-2 text-xs font-medium text-blue-600 truncate">
                  Selected
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;