import { NextResponse } from 'next/server';

// GET /api/patients - Get all patients or filter by advisor
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const advisorId = searchParams.get('advisor_id');

    // TODO: Replace with actual database query
    const patients = [
      {
        patient_id: 1,
        name: 'John Smith',
        email: 'john.smith@email.com',
        phone: '+1-555-0201',
        dob: '1985-03-15',
        advisor_id: 1
      },
      {
        patient_id: 2,
        name: 'Maria Garcia',
        email: 'maria.garcia@email.com',
        phone: '+1-555-0202',
        dob: '1990-07-22',
        advisor_id: 2
      },
      {
        patient_id: 3,
        name: 'David Wilson',
        email: 'david.wilson@email.com',
        phone: '+1-555-0203',
        dob: '1978-11-08',
        advisor_id: 1
      }
    ];

    // Filter by advisor if specified
    const filteredPatients = advisorId 
      ? patients.filter(p => p.advisor_id === parseInt(advisorId))
      : patients;

    return NextResponse.json({ patients: filteredPatients });
  } catch (error) {
    console.error('Error fetching patients:', error);
    return NextResponse.json(
      { error: 'Failed to fetch patients' },
      { status: 500 }
    );
  }
}

// POST /api/patients - Create a new patient
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, dob, advisor_id } = body;

    // Validation
    if (!name || !advisor_id) {
      return NextResponse.json(
        { error: 'Name and advisor are required' },
        { status: 400 }
      );
    }

    // TODO: Replace with actual database insert
    const newPatient = {
      patient_id: Date.now(),
      name,
      email: email || null,
      phone: phone || null,
      dob: dob || null,
      advisor_id: parseInt(advisor_id)
    };

    return NextResponse.json({ patient: newPatient }, { status: 201 });
  } catch (error) {
    console.error('Error creating patient:', error);
    return NextResponse.json(
      { error: 'Failed to create patient' },
      { status: 500 }
    );
  }
} 