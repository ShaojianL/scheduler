import { NextResponse } from 'next/server';
import { cleaningServicesDB } from '@/lib/db';

// GET /api/bookings - Get bookings with filters
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get('client_id');
    const cleanerId = searchParams.get('cleaner_id');
    const propertyId = searchParams.get('property_id');
    const date = searchParams.get('date');
    const status = searchParams.get('status');

    // TODO: Replace with actual database query
    const bookings = [
      {
        booking_id: 1,
        client_id: 1,
        cleaner_id: 1,
        property_id: 1,
        service_type_id: 1,
        scheduled_date: '2024-01-15',
        start_time: '10:00:00',
        end_time: '12:00:00',
        status: 'confirmed',
        total_price: 80.00,
        special_instructions: 'Focus on kitchen and bathrooms',
        payment_status: 'paid'
      },
      {
        booking_id: 2,
        client_id: 2,
        cleaner_id: 2,
        property_id: 2,
        service_type_id: 2,
        scheduled_date: '2024-01-15',
        start_time: '14:00:00',
        end_time: '18:00:00',
        status: 'confirmed',
        total_price: 150.00,
        special_instructions: 'Remove sand from all areas',
        payment_status: 'pending'
      }
    ];

    // Apply filters
    let filteredBookings = bookings;
    
    if (clientId) {
      filteredBookings = filteredBookings.filter(b => b.client_id === parseInt(clientId));
    }
    
    if (cleanerId) {
      filteredBookings = filteredBookings.filter(b => b.cleaner_id === parseInt(cleanerId));
    }

    if (propertyId) {
      filteredBookings = filteredBookings.filter(b => b.property_id === parseInt(propertyId));
    }
    
    if (status) {
      filteredBookings = filteredBookings.filter(b => b.status === status);
    }

    return NextResponse.json({ bookings: filteredBookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

// POST /api/bookings - Create a new booking
export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      client_id, 
      cleaner_id, 
      property_id, 
      service_type_id, 
      scheduled_date, 
      start_time, 
      end_time, 
      special_instructions,
      status = 'pending' 
    } = body;

    // Validation
    if (!client_id || !cleaner_id || !property_id || !service_type_id || !scheduled_date || !start_time || !end_time) {
      return NextResponse.json(
        { error: 'Client, cleaner, property, service type, date, start time, and end time are required' },
        { status: 400 }
      );
    }

    // Validate status
    const validStatuses = ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be one of: pending, confirmed, in_progress, completed, cancelled' },
        { status: 400 }
      );
    }

    // Validate date format
    const bookingDate = new Date(scheduled_date);
    if (isNaN(bookingDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date format' },
        { status: 400 }
      );
    }

    // Validate time format
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    if (!timeRegex.test(start_time) || !timeRegex.test(end_time)) {
      return NextResponse.json(
        { error: 'Invalid time format. Use HH:MM:SS' },
        { status: 400 }
      );
    }

    if (start_time >= end_time) {
      return NextResponse.json(
        { error: 'Start time must be before end time' },
        { status: 400 }
      );
    }

    // TODO: Add conflict checking logic here
    // Check if cleaner is available at this time
    // Check if booking duration matches service type duration

    // TODO: Replace with actual database insert
    const newBooking = {
      booking_id: Date.now(),
      client_id: parseInt(client_id),
      cleaner_id: parseInt(cleaner_id),
      property_id: parseInt(property_id),
      service_type_id: parseInt(service_type_id),
      scheduled_date: scheduled_date,
      start_time: start_time,
      end_time: end_time,
      status: status,
      total_price: 0.00, // TODO: Calculate based on service type and duration
      special_instructions: special_instructions || '',
      payment_status: 'pending'
    };

    return NextResponse.json({ booking: newBooking }, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
} 