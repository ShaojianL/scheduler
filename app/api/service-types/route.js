import { NextResponse } from 'next/server';
import { cleaningServicesDB } from '@/lib/db';

// GET /api/service-types - Get all service types
export async function GET() {
  try {
    // TODO: Replace with actual database query
    const serviceTypes = [
      {
        service_type_id: 1,
        name: 'Regular Cleaning',
        category: 'standard',
        base_price: 80.00,
        duration_hours: 2,
        description: 'Standard cleaning including dusting, vacuuming, and bathroom cleaning',
        includes: ['dusting', 'vacuuming', 'bathroom_cleaning', 'kitchen_cleaning']
      },
      {
        service_type_id: 2,
        name: 'Deep Cleaning',
        category: 'premium',
        base_price: 150.00,
        duration_hours: 4,
        description: 'Comprehensive cleaning including inside appliances and detailed attention',
        includes: ['regular_cleaning', 'appliance_cleaning', 'window_cleaning', 'baseboard_cleaning']
      },
      {
        service_type_id: 3,
        name: 'Move-out Cleaning',
        category: 'specialized',
        base_price: 200.00,
        duration_hours: 6,
        description: 'Complete cleaning for property turnover including carpet cleaning',
        includes: ['deep_cleaning', 'carpet_cleaning', 'wall_cleaning', 'cabinet_cleaning']
      },
      {
        service_type_id: 4,
        name: 'Post-Construction Cleaning',
        category: 'specialized',
        base_price: 300.00,
        duration_hours: 8,
        description: 'Heavy-duty cleaning after construction or renovation work',
        includes: ['move_out_cleaning', 'construction_debris_removal', 'paint_cleaning', 'duct_cleaning']
      },
      {
        service_type_id: 5,
        name: 'Eco-Friendly Cleaning',
        category: 'standard',
        base_price: 90.00,
        duration_hours: 2,
        description: 'Regular cleaning using environmentally friendly products',
        includes: ['regular_cleaning', 'eco_friendly_products', 'recyclable_materials']
      }
    ];

    return NextResponse.json({ serviceTypes });
  } catch (error) {
    console.error('Error fetching service types:', error);
    return NextResponse.json(
      { error: 'Failed to fetch service types' },
      { status: 500 }
    );
  }
}

// POST /api/service-types - Create a new service type
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, category, base_price, duration_hours, description, includes } = body;

    // Validation
    if (!name || !category || !base_price || !duration_hours) {
      return NextResponse.json(
        { error: 'Name, category, base price, and duration are required' },
        { status: 400 }
      );
    }

    if (duration_hours <= 0) {
      return NextResponse.json(
        { error: 'Duration must be greater than 0' },
        { status: 400 }
      );
    }

    if (base_price <= 0) {
      return NextResponse.json(
        { error: 'Base price must be greater than 0' },
        { status: 400 }
      );
    }

    // TODO: Replace with actual database insert
    const newServiceType = {
      service_type_id: Date.now(),
      name,
      category,
      base_price: parseFloat(base_price),
      duration_hours: parseInt(duration_hours),
      description: description || '',
      includes: includes || []
    };

    return NextResponse.json({ serviceType: newServiceType }, { status: 201 });
  } catch (error) {
    console.error('Error creating service type:', error);
    return NextResponse.json(
      { error: 'Failed to create service type' },
      { status: 500 }
    );
  }
} 