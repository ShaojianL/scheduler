import { NextResponse } from 'next/server';

// GET /api/staff - Get all staff or filter by department
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const deptId = searchParams.get('dept_id');

    // TODO: Replace with actual database query
    const staff = [
      {
        staff_id: 1,
        name: 'Dr. Sarah Johnson',
        role: 'Cardiologist',
        email: 'sarah.johnson@hospital.com',
        phone: '+1-555-0101',
        dept_id: 1
      },
      {
        staff_id: 2,
        name: 'Dr. Michael Chen',
        role: 'Neurologist',
        email: 'michael.chen@hospital.com',
        phone: '+1-555-0102',
        dept_id: 2
      },
      {
        staff_id: 3,
        name: 'Dr. Emily Rodriguez',
        role: 'Orthopedic Surgeon',
        email: 'emily.rodriguez@hospital.com',
        phone: '+1-555-0103',
        dept_id: 3
      }
    ];

    // Filter by department if specified
    const filteredStaff = deptId 
      ? staff.filter(s => s.dept_id === parseInt(deptId))
      : staff;

    return NextResponse.json({ staff: filteredStaff });
  } catch (error) {
    console.error('Error fetching staff:', error);
    return NextResponse.json(
      { error: 'Failed to fetch staff' },
      { status: 500 }
    );
  }
}

// POST /api/staff - Create a new staff member
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, role, email, phone, dept_id } = body;

    // Validation
    if (!name || !role || !dept_id) {
      return NextResponse.json(
        { error: 'Name, role, and department are required' },
        { status: 400 }
      );
    }

    // TODO: Replace with actual database insert
    const newStaff = {
      staff_id: Date.now(),
      name,
      role,
      email: email || null,
      phone: phone || null,
      dept_id: parseInt(dept_id)
    };

    return NextResponse.json({ staff: newStaff }, { status: 201 });
  } catch (error) {
    console.error('Error creating staff:', error);
    return NextResponse.json(
      { error: 'Failed to create staff member' },
      { status: 500 }
    );
  }
} 