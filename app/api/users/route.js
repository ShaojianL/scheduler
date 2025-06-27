import { NextResponse } from 'next/server';

// GET /api/users - Get user profile
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // TODO: Replace with actual database query
    const user = {
      id: userId,
      email: 'user@example.com',
      name: 'John Doe',
      timezone: 'UTC',
      preferences: {
        defaultDuration: 60, // minutes
        workingHours: {
          start: '09:00',
          end: '17:00'
        }
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

// PUT /api/users - Update user profile
export async function PUT(request) {
  try {
    const body = await request.json();
    const { userId, name, timezone, preferences } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // TODO: Replace with actual database update
    const updatedUser = {
      id: userId,
      email: 'user@example.com',
      name: name || 'John Doe',
      timezone: timezone || 'UTC',
      preferences: preferences || {
        defaultDuration: 60,
        workingHours: {
          start: '09:00',
          end: '17:00'
        }
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
} 