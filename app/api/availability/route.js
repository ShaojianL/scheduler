import { NextResponse } from 'next/server';
import { cleaningServicesDB } from '@/lib/db';

// GET /api/availability - Check available time slots for a cleaner
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const cleanerId = searchParams.get('cleaner_id');
    const date = searchParams.get('date');
    const serviceTypeId = searchParams.get('service_type_id');

    if (!cleanerId || !date || !serviceTypeId) {
      return NextResponse.json(
        { error: 'Cleaner ID, date, and service type ID are required' },
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
    // 1. Get cleaner's time slots for this day
    const cleanerTimeSlots = [
      {
        slot_id: 1,
        cleaner_id: parseInt(cleanerId),
        day: dayOfWeek,
        start_time: '08:00:00',
        end_time: '18:00:00'
      }
    ];

    // 2. Get service type duration
    const serviceTypes = [
      {
        service_type_id: 1,
        name: 'Regular Cleaning',
        category: 'standard',
        base_price: 80.00,
        duration_hours: 2,
        description: 'Standard cleaning including dusting, vacuuming, and bathroom cleaning'
      },
      {
        service_type_id: 2,
        name: 'Deep Cleaning',
        category: 'premium',
        base_price: 150.00,
        duration_hours: 4,
        description: 'Comprehensive cleaning including inside appliances and detailed attention'
      },
      {
        service_type_id: 3,
        name: 'Move-out Cleaning',
        category: 'specialized',
        base_price: 200.00,
        duration_hours: 6,
        description: 'Complete cleaning for property turnover including carpet cleaning'
      }
    ];

    const serviceType = serviceTypes.find(s => s.service_type_id === parseInt(serviceTypeId));
    if (!serviceType) {
      return NextResponse.json(
        { error: 'Service type not found' },
        { status: 404 }
      );
    }

    // 3. Get existing bookings for this cleaner on this date
    const existingBookings = [
      {
        booking_id: 1,
        scheduled_date: '2024-01-15',
        start_time: '10:00:00',
        end_time: '12:00:00'
      },
      {
        booking_id: 2,
        scheduled_date: '2024-01-15',
        start_time: '14:00:00',
        end_time: '18:00:00'
      }
    ];

    // Calculate available slots
    const availableSlots = [];
    
    if (cleanerTimeSlots.length > 0) {
      const timeSlot = cleanerTimeSlots[0];
      
      // Convert time slot to datetime for the target date
      const slotStart = new Date(`${date}T${timeSlot.start_time}`);
      const slotEnd = new Date(`${date}T${timeSlot.end_time}`);
      
      // Generate 1-hour slots within the time slot
      const slotDuration = 60; // minutes
      let currentTime = new Date(slotStart);
      
      while (currentTime < slotEnd) {
        const slotEndTime = new Date(currentTime.getTime() + (serviceType.duration_hours * 60 * 60000));
        
        // Check if this slot conflicts with existing bookings
        const hasConflict = existingBookings.some(booking => {
          if (booking.scheduled_date !== date) return false;
          
          const bookingStart = new Date(`${date}T${booking.start_time}`);
          const bookingEnd = new Date(`${date}T${booking.end_time}`);
          
          return (currentTime < bookingEnd && slotEndTime > bookingStart);
        });
        
        if (!hasConflict && slotEndTime <= slotEnd) {
          availableSlots.push({
            start_time: currentTime.toTimeString().slice(0, 8),
            end_time: slotEndTime.toTimeString().slice(0, 8),
            duration_hours: serviceType.duration_hours,
            estimated_price: serviceType.base_price
          });
        }
        
        currentTime = new Date(currentTime.getTime() + (slotDuration * 60000));
      }
    }

    return NextResponse.json({
      cleaner_id: parseInt(cleanerId),
      date: date,
      service_type_id: parseInt(serviceTypeId),
      service_type_name: serviceType.name,
      service_duration_hours: serviceType.duration_hours,
      base_price: serviceType.base_price,
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