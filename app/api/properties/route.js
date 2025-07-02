import { NextResponse } from 'next/server';
import { cleaningServicesDB } from '@/lib/db';

// GET /api/properties - Get all properties
export async function GET() {
  try {
    // TODO: Replace with actual database query
    const properties = [
      {
        property_id: 1,
        name: 'Downtown Luxury Condo',
        address: '123 Main St, Downtown',
        bedrooms: 2,
        bathrooms: 2,
        square_feet: 1200,
        property_type: 'condo',
        owner_id: 1,
        cleaning_instructions: 'Focus on kitchen and bathrooms'
      },
      {
        property_id: 2,
        name: 'Beach House',
        address: '456 Ocean Ave, Beach City',
        bedrooms: 3,
        bathrooms: 2,
        square_feet: 1800,
        property_type: 'house',
        owner_id: 2,
        cleaning_instructions: 'Remove sand from all areas'
      },
      {
        property_id: 3,
        name: 'Mountain Cabin',
        address: '789 Forest Rd, Mountain Town',
        bedrooms: 1,
        bathrooms: 1,
        square_feet: 800,
        property_type: 'cabin',
        owner_id: 3,
        cleaning_instructions: 'Check for wildlife debris'
      }
    ];

    return NextResponse.json({ properties });
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json(
      { error: 'Failed to fetch properties' },
      { status: 500 }
    );
  }
}

// POST /api/properties - Create a new property
export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      name, 
      address, 
      bedrooms, 
      bathrooms, 
      square_feet, 
      property_type, 
      owner_id, 
      cleaning_instructions 
    } = body;

    if (!name || !address || !bedrooms || !bathrooms) {
      return NextResponse.json(
        { error: 'Property name, address, bedrooms, and bathrooms are required' },
        { status: 400 }
      );
    }

    // TODO: Replace with actual database insert
    const newProperty = {
      property_id: Date.now(),
      name,
      address,
      bedrooms: parseInt(bedrooms),
      bathrooms: parseInt(bathrooms),
      square_feet: square_feet ? parseInt(square_feet) : null,
      property_type: property_type || 'house',
      owner_id: owner_id ? parseInt(owner_id) : null,
      cleaning_instructions: cleaning_instructions || ''
    };

    return NextResponse.json({ property: newProperty }, { status: 201 });
  } catch (error) {
    console.error('Error creating property:', error);
    return NextResponse.json(
      { error: 'Failed to create property' },
      { status: 500 }
    );
  }
} 