import { NextResponse } from 'next/server';
import { cleaningServicesDB } from '@/lib/db';

// GET /api/clients - Get all clients or filter by property owner
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const propertyOwnerId = searchParams.get('property_owner_id');

    // TODO: Replace with actual database query
    const clients = [
      {
        client_id: 1,
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        phone: '+1-555-0201',
        address: '123 Main St, Downtown',
        property_count: 2,
        preferred_cleaning_frequency: 'weekly',
        special_instructions: 'Use eco-friendly products only',
        payment_method: 'credit_card'
      },
      {
        client_id: 2,
        name: 'Mike Chen',
        email: 'mike.chen@email.com',
        phone: '+1-555-0202',
        address: '456 Ocean Ave, Beach City',
        property_count: 1,
        preferred_cleaning_frequency: 'bi_weekly',
        special_instructions: 'Focus on kitchen and bathrooms',
        payment_method: 'paypal'
      },
      {
        client_id: 3,
        name: 'Lisa Rodriguez',
        email: 'lisa.rodriguez@email.com',
        phone: '+1-555-0203',
        address: '789 Forest Rd, Mountain Town',
        property_count: 3,
        preferred_cleaning_frequency: 'monthly',
        special_instructions: 'Check for wildlife debris',
        payment_method: 'bank_transfer'
      }
    ];

    // Filter by property owner if specified
    const filteredClients = propertyOwnerId 
      ? clients.filter(c => c.client_id === parseInt(propertyOwnerId))
      : clients;

    return NextResponse.json({ clients: filteredClients });
  } catch (error) {
    console.error('Error fetching clients:', error);
    return NextResponse.json(
      { error: 'Failed to fetch clients' },
      { status: 500 }
    );
  }
}

// POST /api/clients - Create a new client
export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      name, 
      email, 
      phone, 
      address, 
      property_count, 
      preferred_cleaning_frequency, 
      special_instructions, 
      payment_method 
    } = body;

    // Validation
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // TODO: Replace with actual database insert
    const newClient = {
      client_id: Date.now(),
      name,
      email,
      phone: phone || null,
      address: address || null,
      property_count: property_count ? parseInt(property_count) : 0,
      preferred_cleaning_frequency: preferred_cleaning_frequency || 'weekly',
      special_instructions: special_instructions || '',
      payment_method: payment_method || 'credit_card'
    };

    return NextResponse.json({ client: newClient }, { status: 201 });
  } catch (error) {
    console.error('Error creating client:', error);
    return NextResponse.json(
      { error: 'Failed to create client' },
      { status: 500 }
    );
  }
} 