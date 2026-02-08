import React, { useState } from 'react';
import CalendarView from '../components/calendar/CalendarView';
import Button from '../components/common/Button';

const RoomBooking = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Book a Study Room</h1>
        <Button>My Bookings</Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Calendar */}
        <div className="w-full lg:w-2/3">
          <CalendarView 
            selectedDate={selectedDate} 
            onDateSelect={setSelectedDate}
          />
        </div>

        {/* Right: Available Slots */}
        <div className="w-full lg:w-1/3 bg-white p-6 rounded-xl border border-slate-200 h-fit">
          <h3 className="font-semibold text-slate-800 mb-4">
            Available on {selectedDate.toLocaleDateString()}
          </h3>
          
          <div className="space-y-3">
            {/* Demo Slots */}
            {['10:00 AM - 11:00 AM', '02:00 PM - 03:00 PM', '04:00 PM - 05:00 PM'].map((slot, i) => (
              <div key={i} className="p-3 border border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all group">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-600 group-hover:text-blue-700">{slot}</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Free</span>
                </div>
              </div>
            ))}
          </div>
          
          <Button className="w-full mt-6">Confirm Booking</Button>
        </div>
      </div>
    </div>
  );
};

export default RoomBooking;