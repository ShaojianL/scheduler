import { NextResponse } from 'next/server';

// GET /api/availability - Check available time slots for a staff member
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const staffId = searchParams.get('staff_id');
    const date = searchParams.get('date');
    const serviceId = searchParams.get('service_id');

    if (!staffId || !date || !serviceId) {
      return NextResponse.json(
        { error: 'Staff ID, date, and service ID are required' },
        { status: 400 }
      );
    }

    // Validate date format
    const targetDate = new Date(date);
    if (isNaN(targetDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date format' },
        { status: 400 }
      );
    }

    // Get day of week
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayOfWeek = days[targetDate.getDay()];

    // TODO: Replace with actual database queries
    // 1. Get staff's time slots for this day
    const staffTimeSlots = [
      {
        slot_id: 1,
        staff_id: parseInt(staffId),
        day: dayOfWeek,
        start_time: '09:00:00',
        end_time: '17:00:00'
      }
    ];

    // 2. Get service duration
    const services = [
      {
        service_id: 1,
        name: 'Cardiology Consultation',
        duration_minutes: 30,
        price: 150.00
      },
      {
        service_id: 2,
        name: 'Neurology Consultation',
        duration_minutes: 45,
        price: 200.00
      }
    ];

    const service = services.find(s => s.service_id === parseInt(serviceId));
    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    // 3. Get existing appointments for this staff member on this date
    const existingAppointments = [
      {
        appointment_id: 1,
        start_time: '2024-01-15T10:00:00Z',
        end_time: '2024-01-15T10:30:00Z'
      },
      {
        appointment_id: 2,
        start_time: '2024-01-15T14:00:00Z',
        end_time: '2024-01-15T14:45:00Z'
      }
    ];

    // Calculate available slots
    const availableSlots = [];
    
    if (staffTimeSlots.length > 0) {
      const timeSlot = staffTimeSlots[0];
      
      // Convert time slot to datetime for the target date
      const slotStart = new Date(`${date}T${timeSlot.start_time}`);
      const slotEnd = new Date(`${date}T${timeSlot.end_time}`);
      
      // Generate 30-minute slots within the time slot
      const slotDuration = 30; // minutes
      let currentTime = new Date(slotStart);
      
      while (currentTime < slotEnd) {
        const slotEndTime = new Date(currentTime.getTime() + (service.duration_minutes * 60000));
        
        // Check if this slot conflicts with existing appointments
        const hasConflict = existingAppointments.some(appointment => {
          const appStart = new Date(appointment.start_time);
          const appEnd = new Date(appointment.end_time);
          
          return (currentTime < appEnd && slotEndTime > appStart);
        });
        
        if (!hasConflict && slotEndTime <= slotEnd) {
          availableSlots.push({
            start_time: currentTime.toISOString(),
            end_time: slotEndTime.toISOString(),
            duration_minutes: service.duration_minutes
          });
        }
        
        currentTime = new Date(currentTime.getTime() + (slotDuration * 60000));
      }
    }

    return NextResponse.json({
      staff_id: parseInt(staffId),
      date: date,
      service_id: parseInt(serviceId),
      service_name: service.name,
      service_duration: service.duration_minutes,
      available_slots: availableSlots
    });
  } catch (error) {
    console.error('Error checking availability:', error);
    return NextResponse.json(
      { error: 'Failed to check availability' },
      { status: 500 }
    );
  }
} 