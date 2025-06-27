import { NextResponse } from 'next/server';

// GET /api/events/[id] - Get a specific event
export async function GET(request, { params }) {
  try {
    const { id } = params;

    // TODO: Replace with actual database query
    const event = {
      id: id,
      title: 'Sample Event',
      description: 'This is a sample event',
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 3600000).toISOString(),
      userId: 'user123',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ event });
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json(
      { error: 'Failed to fetch event' },
      { status: 500 }
    );
  }
}

// PUT /api/events/[id] - Update a specific event
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { title, description, startTime, endTime } = body;

    // Validation
    if (!title || !startTime || !endTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // TODO: Replace with actual database update
    const updatedEvent = {
      id: id,
      title,
      description: description || '',
      startTime,
      endTime,
      userId: 'user123',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json({ event: updatedEvent });
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 }
    );
  }
}

// DELETE /api/events/[id] - Delete a specific event
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    // TODO: Replace with actual database delete
    // For now, just return success
    return NextResponse.json(
      { message: 'Event deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 }
    );
  }
} 