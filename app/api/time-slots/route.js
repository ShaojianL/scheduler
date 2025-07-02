import { NextResponse } from 'next/server';
import { cleaningServicesDB } from '@/lib/db';

// GET /api/time-slots - Get time slots with filters
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const cleanerId = searchParams.get('cleaner_id');
    const day = searchParams.get('day');

    // TODO: Replace with actual database query
    const timeSlots = [
      {
        slot_id: 1,
        cleaner_id: 1,
        day: 'Mon',
        start_time: '08:00:00',
        end_time: '18:00:00',
        max_bookings_per_day: 4
      },
      {
        slot_id: 2,
        cleaner_id: 1,
        day: 'Tue',
        start_time: '08:00:00',
        end_time: '18:00:00',
        max_bookings_per_day: 4
      },
      {
        slot_id: 3,
        cleaner_id: 1,
        day: 'Wed',
        start_time: '08:00:00',
        end_time: '18:00:00',
        max_bookings_per_day: 4
      },
      {
        slot_id: 4,
        cleaner_id: 2,
        day: 'Mon',
        start_time: '09:00:00',
        end_time: '17:00:00',
        max_bookings_per_day: 3
      },
      {
        slot_id: 5,
        cleaner_id: 2,
        day: 'Tue',
        start_time: '09:00:00',
        end_time: '17:00:00',
        max_bookings_per_day: 3
      },
      {
        slot_id: 6,
        cleaner_id: 3,
        day: 'Mon',
        start_time: '10:00:00',
        end_time: '16:00:00',
        max_bookings_per_day: 2
      }
    ];

    // Apply filters
    let filteredTimeSlots = timeSlots;
    
    if (cleanerId) {
      filteredTimeSlots = filteredTimeSlots.filter(slot => slot.cleaner_id === parseInt(cleanerId));
    }
    
    if (day) {
      filteredTimeSlots = filteredTimeSlots.filter(slot => slot.day === day);
    }

    return NextResponse.json({ timeSlots: filteredTimeSlots });
  } catch (error) {
    console.error('Error fetching time slots:', error);
    return NextResponse.json(
      { error: 'Failed to fetch time slots' },
      { status: 500 }
    );
  }
}

// POST /api/time-slots - Create a new time slot
export async function POST(request) {
  try {
    const body = await request.json();
    const { cleaner_id, day, start_time, end_time, max_bookings_per_day = 4 } = body;

    // Validation
    if (!cleaner_id || !day || !start_time || !end_time) {
      return NextResponse.json(
        { error: 'Cleaner ID, day, start time, and end time are required' },
        { status: 400 }
      );
    }

    // Validate day
    const validDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    if (!validDays.includes(day)) {
      return NextResponse.json(
        { error: 'Invalid day. Must be one of: Mon, Tue, Wed, Thu, Fri, Sat, Sun' },
        { status: 400 }
      );
    }

    // Validate time format (HH:MM:SS)
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    if (!timeRegex.test(start_time) || !timeRegex.test(end_time)) {
      return NextResponse.json(
        { error: 'Invalid time format. Use HH:MM:SS' },
        { status: 400 }
      );
    }

    // Validate that start time is before end time
    if (start_time >= end_time) {
      return NextResponse.json(
        { error: 'Start time must be before end time' },
        { status: 400 }
      );
    }

    // Validate max bookings per day
    if (max_bookings_per_day < 1 || max_bookings_per_day > 8) {
      return NextResponse.json(
        { error: 'Max bookings per day must be between 1 and 8' },
        { status: 400 }
      );
    }

    // TODO: Replace with actual database insert
    const newTimeSlot = {
      slot_id: Date.now(),
      cleaner_id: parseInt(cleaner_id),
      day: day,
      start_time: start_time,
      end_time: end_time,
      max_bookings_per_day: parseInt(max_bookings_per_day)
    };

    return NextResponse.json({ timeSlot: newTimeSlot }, { status: 201 });
  } catch (error) {
    console.error('Error creating time slot:', error);
    return NextResponse.json(
      { error: 'Failed to create time slot' },
      { status: 500 }
    );
  }
} 