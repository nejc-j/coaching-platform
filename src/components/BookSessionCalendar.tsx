'use client';

import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { addDays, isSameDay } from 'date-fns';
import { useSession } from 'next-auth/react'; // Import useSession

interface BookSessionCalendarProps {
  availableDates: Date[];
  unavailableDates: Date[];
}

export default function BookSessionCalendar({
  availableDates,
  unavailableDates,
}: BookSessionCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { data: session } = useSession(); // Correct use of useSession

  const isAvailable = (day: Date) => {
    return availableDates.some((availableDate) =>
      isSameDay(day, availableDate)
    );
  };

  const isUnavailable = (day: Date) => {
    return unavailableDates.some((unavailableDate) =>
      isSameDay(day, unavailableDate)
    );
  };

  const modifiers = {
    available: availableDates,
    unavailable: unavailableDates,
  };

  const modifiersClassNames = {
    available: 'bg-green-200 text-green-900',
    unavailable: 'bg-red-200 text-red-900',
  };

  return (
    <div className='text-center'>
      <h2 className='text-2xl font-bold mb-4'>Book a Session</h2>
      <Calendar
        mode='single'
        selected={date}
        onSelect={setDate}
        className='rounded-md border'
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
      />
      {!session && (
        <p className='mt-4 text-red-500'>
          If you want to book a session, please login or create an account.
        </p>
      )}
    </div>
  );
}
