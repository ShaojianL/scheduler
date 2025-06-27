import { NextResponse } from 'next/server';

// GET /api/departments - Get all departments
export async function GET() {
  try {
    // TODO: Replace with actual database query
    const departments = [
      {
        dept_id: 1,
        name: 'Cardiology'
      },
      {
        dept_id: 2,
        name: 'Neurology'
      },
      {
        dept_id: 3,
        name: 'Orthopedics'
      }
    ];

    return NextResponse.json({ departments });
  } catch (error) {
    console.error('Error fetching departments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch departments' },
      { status: 500 }
    );
  }
}

// POST /api/departments - Create a new department
export async function POST(request) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json(
        { error: 'Department name is required' },
        { status: 400 }
      );
    }

    // TODO: Replace with actual database insert
    const newDepartment = {
      dept_id: Date.now(),
      name: name
    };

    return NextResponse.json({ department: newDepartment }, { status: 201 });
  } catch (error) {
    console.error('Error creating department:', error);
    return NextResponse.json(
      { error: 'Failed to create department' },
      { status: 500 }
    );
  }
} 