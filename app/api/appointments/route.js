import { NextResponse } from 'next/server';

// GET /api/appointments - Get appointments with filters
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const patientId = searchParams.get('patient_id');
    const staffId = searchParams.get('staff_id');
    const date = searchParams.get('date');
    const status = searchParams.get('status');

    // TODO: Replace with actual database query
    const appointments = [
      {
        appointment_id: 1,
        patient_id: 1,
        staff_id: 1,
        service_id: 1,
        start_time: '2024-01-15T10:00:00Z',
        end_time: '2024-01-15T10:30:00Z',
        status: 'booked'
      },
      {
        appointment_id: 2,
        patient_id: 2,
        staff_id: 2,
        service_id: 2,
        start_time: '2024-01-15T14:00:00Z',
        end_time: '2024-01-15T14:45:00Z',
        status: 'booked'
      }
    ];

    // Apply filters
    let filteredAppointments = appointments;
    
    if (patientId) {
      filteredAppointments = filteredAppointments.filter(a => a.patient_id === parseInt(patientId));
    }
    
    if (staffId) {
      filteredAppointments = filteredAppointments.filter(a => a.staff_id === parseInt(staffId));
    }
    
    if (status) {
      filteredAppointments = filteredAppointments.filter(a => a.status === status);
    }

    return NextResponse.json({ appointments: filteredAppointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    );
  }
}

// POST /api/appointments - Create a new appointment
export async function POST(request) {
  try {
    const body = await request.json();
    const { patient_id, staff_id, service_id, start_time, end_time, status = 'booked' } = body;

    // Validation
    if (!patient_id || !staff_id || !service_id || !start_time || !end_time) {
      return NextResponse.json(
        { error: 'Patient, staff, service, start time, and end time are required' },
        { status: 400 }
      );
    }

    // Validate status
    const validStatuses = ['booked', 'completed', 'cancelled', 'no-show'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be one of: booked, completed, cancelled, no-show' },
        { status: 400 }
      );
    }

    // Validate time format
    const startDate = new Date(start_time);
    const endDate = new Date(end_time);
    
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date format' },
        { status: 400 }
      );
    }

    if (startDate >= endDate) {
      return NextResponse.json(
        { error: 'Start time must be before end time' },
        { status: 400 }
      );
    }

    // TODO: Add conflict checking logic here
    // Check if staff is available at this time
    // Check if appointment duration matches service duration

    // TODO: Replace with actual database insert
    const newAppointment = {
      appointment_id: Date.now(),
      patient_id: parseInt(patient_id),
      staff_id: parseInt(staff_id),
      service_id: parseInt(service_id),
      start_time: start_time,
      end_time: end_time,
      status: status
    };

    return NextResponse.json({ appointment: newAppointment }, { status: 201 });
  } catch (error) {
    console.error('Error creating appointment:', error);
    return NextResponse.json(
      { error: 'Failed to create appointment' },
      { status: 500 }
    );
  }
} 