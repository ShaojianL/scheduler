import { NextResponse } from 'next/server';
import { cleaningServicesDB } from '@/lib/db';

// GET /api/cleaners - Get all cleaners or filter by property type
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const propertyType = searchParams.get('property_type');

    // TODO: Replace with actual database query
    const cleaners = [
      {
        cleaner_id: 1,
        name: 'Maria Garcia',
        email: 'maria.garcia@cleaning.com',
        phone: '+1-555-0101',
        hourly_rate: 25,
        specialties: ['deep_cleaning', 'eco_friendly'],
        experience_years: 5,
        rating: 4.8,
        available: true,
        preferred_property_types: ['condo', 'house']
      },
      {
        cleaner_id: 2,
        name: 'John Smith',
        email: 'john.smith@cleaning.com',
        phone: '+1-555-0102',
        hourly_rate: 30,
        specialties: ['post_construction', 'move_out'],
        experience_years: 8,
        rating: 4.9,
        available: true,
        preferred_property_types: ['house', 'cabin']
      },
      {
        cleaner_id: 3,
        name: 'Lisa Chen',
        email: 'lisa.chen@cleaning.com',
        phone: '+1-555-0103',
        hourly_rate: 22,
        specialties: ['regular_cleaning', 'laundry'],
        experience_years: 3,
        rating: 4.7,
        available: true,
        preferred_property_types: ['condo', 'apartment']
      }
    ];

    // Filter by property type if specified
    const filteredCleaners = propertyType 
      ? cleaners.filter(c => c.preferred_property_types.includes(propertyType))
      : cleaners;

    return NextResponse.json({ cleaners: filteredCleaners });
  } catch (error) {
    console.error('Error fetching cleaners:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cleaners' },
      { status: 500 }
    );
  }
}

// POST /api/cleaners - Create a new cleaner
export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      name, 
      email, 
      phone, 
      hourly_rate, 
      specialties, 
      experience_years, 
      preferred_property_types 
    } = body;

    // Validation
    if (!name || !hourly_rate) {
      return NextResponse.json(
        { error: 'Name and hourly rate are required' },
        { status: 400 }
      );
    }

    // TODO: Replace with actual database insert
    const newCleaner = {
      cleaner_id: Date.now(),
      name,
      email: email || null,
      phone: phone || null,
      hourly_rate: parseFloat(hourly_rate),
      specialties: specialties || [],
      experience_years: experience_years ? parseInt(experience_years) : 0,
      rating: 0,
      available: true,
      preferred_property_types: preferred_property_types || []
    };

    return NextResponse.json({ cleaner: newCleaner }, { status: 201 });
  } catch (error) {
    console.error('Error creating cleaner:', error);
    return NextResponse.json(
      { error: 'Failed to create cleaner' },
      { status: 500 }
    );
  }
} 