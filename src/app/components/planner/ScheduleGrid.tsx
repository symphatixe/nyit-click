'use client';

import React from 'react';
import { ScheduleBlock } from '../../lib/types';

interface ScheduleGridProps {
  schedule: ScheduleBlock[];
}

export default function ScheduleGrid({ schedule }: ScheduleGridProps) {
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const hours = Array.from({ length: 12 }, (_, i) => i + 8); 

  // Helper function to convert time string to position from top of grid
  const timeToPosition = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;
    const dayStartMinutes = 8 * 60; // 8 AM
    return ((totalMinutes - dayStartMinutes) / 60) * 80; // 80px per hour
  };

  // Helper function to calculate height based on duration
  const calculateHeight = (startTime: string, endTime: string) => {
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    const startTotal = startHours * 60 + startMinutes;
    const endTotal = endHours * 60 + endMinutes;
    const durationMinutes = endTotal - startTotal;
    return (durationMinutes / 60) * 80; // 80px per hour
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-blue-900">Fall 2026 Class Schedule</h2>
          <p className="text-sm text-gray-600">Registration Period: April 10 - April 24, 2026</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Max Credits: <span className="font-semibold">14/18</span></span>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-medium">
            Register Classes
          </button>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden relative">
        {/* Header Row */}
        <div className="grid grid-cols-[80px_repeat(7,1fr)] gap-px bg-gray-200">
          <div className="bg-gray-50 p-3 font-semibold text-sm text-gray-700">Time</div>
          {days.map((day) => (
            <div key={day} className="bg-gray-50 p-3 font-semibold text-sm text-blue-900 text-center">
              {day}
            </div>
          ))}
        </div>

        {/* Container for grid and overlays */}
        <div className="relative">
          {/* Time Grid Background */}
          <div className="grid grid-cols-[80px_repeat(7,1fr)] gap-px bg-gray-200">
            {hours.map((hour) => (
              <React.Fragment key={hour}>
                {/* Time Label */}
                <div className="bg-white p-3 text-xs text-gray-600 border-t border-gray-200">
                  {hour === 12 ? '12:00 PM' : hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`}
                </div>
                
                {/* Day Cells */}
                {days.map((day) => (
                  <div 
                    key={`${day}-${hour}`} 
                    className="bg-white border-t border-gray-200" 
                    style={{ minHeight: '80px' }}
                  >
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>

          {/* Overlay layer for class blocks */}
          <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
            <div className="grid grid-cols-[80px_repeat(7,1fr)] h-full">
              {/* Empty cell for time column */}
              <div></div>
              
              {/* Each day column */}
              {days.map((day, dayIndex) => (
                <div key={day} className="relative">
                  {schedule
                    .filter((block) => block.day === day)
                    .map((block, idx) => {
                      const top = timeToPosition(block.startTime);
                      const height = calculateHeight(block.startTime, block.endTime);
                      
                      return (
                        <div
                          key={idx}
                          className={`absolute left-1 right-1 ${block.color} text-white p-2 rounded text-xs pointer-events-auto`}
                          style={{
                            top: `${top}px`,
                            height: `${height}px`,
                          }}
                        >
                          <div className="font-semibold">{block.courseCode}</div>
                          <div className="text-xs opacity-90 truncate">{block.courseName}</div>
                          <div className="text-xs opacity-75">{block.room}</div>
                        </div>
                      );
                    })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}