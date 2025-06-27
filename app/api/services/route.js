import { NextResponse } from 'next/server';

// GET /api/services - Get all services
export async function GET() {
  try {
    // TODO: Replace with actual database query
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
      },
      {
        service_id: 3,
        name: 'Orthopedic Consultation',
        duration_minutes: 30,
        price: 175.00
      },
      {
        service_id: 4,
        name: 'Follow-up Consultation',
        duration_minutes: 15,
        price: 75.00
      }
    ];

    return NextResponse.json({ services });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

// POST /api/services - Create a new service
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, duration_minutes, price } = body;

    // Validation
    if (!name || !duration_minutes || !price) {
      return NextResponse.json(
        { error: 'Name, duration, and price are required' },
        { status: 400 }
      );
    }

    if (duration_minutes <= 0) {
      return NextResponse.json(
        { error: 'Duration must be greater than 0' },
        { status: 400 }
      );
    }

    if (price <= 0) {
      return NextResponse.json(
        { error: 'Price must be greater than 0' },
        { status: 400 }
      );
    }

    // TODO: Replace with actual database insert
    const newService = {
      service_id: Date.now(),
      name,
      duration_minutes: parseInt(duration_minutes),
      price: parseFloat(price)
    };

    return NextResponse.json({ service: newService }, { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    );
  }
} 