import { NextResponse } from 'next/server';

// GET /api/time-slots - Get time slots with filters
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const staffId = searchParams.get('staff_id');
    const day = searchParams.get('day');

    // TODO: Replace with actual database query
    const timeSlots = [
      {
        slot_id: 1,
        staff_id: 1,
        day: 'Mon',
        start_time: '09:00:00',
        end_time: '17:00:00'
      },
      {
        slot_id: 2,
        staff_id: 1,
        day: 'Tue',
        start_time: '09:00:00',
        end_time: '17:00:00'
      },
      {
        slot_id: 3,
        staff_id: 1,
        day: 'Wed',
        start_time: '09:00:00',
        end_time: '17:00:00'
      },
      {
        slot_id: 4,
        staff_id: 2,
        day: 'Mon',
        start_time: '10:00:00',
        end_time: '18:00:00'
      },
      {
        slot_id: 5,
        staff_id: 2,
        day: 'Tue',
        start_time: '10:00:00',
        end_time: '18:00:00'
      }
    ];

    // Apply filters
    let filteredTimeSlots = timeSlots;
    
    if (staffId) {
      filteredTimeSlots = filteredTimeSlots.filter(slot => slot.staff_id === parseInt(staffId));
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
    const { staff_id, day, start_time, end_time } = body;

    // Validation
    if (!staff_id || !day || !start_time || !end_time) {
      return NextResponse.json(
        { error: 'Staff ID, day, start time, and end time are required' },
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

    // TODO: Replace with actual database insert
    const newTimeSlot = {
      slot_id: Date.now(),
      staff_id: parseInt(staff_id),
      day: day,
      start_time: start_time,
      end_time: end_time
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