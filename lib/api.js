// API utility functions for Airbnb cleaning services scheduling
/**
 * Provides a clean, centralized interface for making HTTP requests to the backend API endpoints.
 * Abstracts away the complexity of fetch requests and error handling.
 * Offers a consistent API for frontend components to interact with the backend.
 * 
 * Handles all HTTP requests to the backend API endpoints.
 * Automatically handles JSON serialization and deserialization.
 * Returns parsed JSON responses.
 * Throws errors for failed requests.
 * 
 * Usage:
 * import { apiRequest } from '@/lib/api';
 * 
 * const properties = await apiRequest('/properties');
 * const cleaner = await apiRequest(`/cleaners/${cleanerId}`);
 * const bookings = await apiRequest('/bookings', {
 *   method: 'POST',
 *   body: JSON.stringify({ client_id: 1, cleaner_id: 2, property_id: 3, date: '2025-01-01' }),
 */

const API_BASE_URL = '/api';

// Generic API request function
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Property API functions
export const propertyAPI = {
  // Get all properties
  getProperties: () => 
    apiRequest('/properties'),
  
  // Get property by ID
  getPropertyById: (propertyId) => 
    apiRequest(`/properties/${propertyId}`),
  
  // Create a new property
  createProperty: (propertyData) => 
    apiRequest('/properties', {
      method: 'POST',
      body: JSON.stringify(propertyData),
    }),
  
  // Update a property
  updateProperty: (propertyId, propertyData) => 
    apiRequest(`/properties/${propertyId}`, {
      method: 'PUT',
      body: JSON.stringify(propertyData),
    }),
};

// Cleaner API functions
export const cleanerAPI = {
  // Get all cleaners or filter by property type
  getCleaners: (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.property_type) params.append('property_type', filters.property_type);
    return apiRequest(`/cleaners?${params.toString()}`);
  },
  
  // Get cleaner by ID
  getCleanerById: (cleanerId) => 
    apiRequest(`/cleaners/${cleanerId}`),
  
  // Create a new cleaner
  createCleaner: (cleanerData) => 
    apiRequest('/cleaners', {
      method: 'POST',
      body: JSON.stringify(cleanerData),
    }),
  
  // Update a cleaner
  updateCleaner: (cleanerId, cleanerData) => 
    apiRequest(`/cleaners/${cleanerId}`, {
      method: 'PUT',
      body: JSON.stringify(cleanerData),
    }),
};

// Client API functions
export const clientAPI = {
  // Get all clients or filter by property owner
  getClients: (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.property_owner_id) params.append('property_owner_id', filters.property_owner_id);
    return apiRequest(`/clients?${params.toString()}`);
  },
  
  // Get client by ID
  getClientById: (clientId) => 
    apiRequest(`/clients/${clientId}`),
  
  // Create a new client
  createClient: (clientData) => 
    apiRequest('/clients', {
      method: 'POST',
      body: JSON.stringify(clientData),
    }),
  
  // Update a client
  updateClient: (clientId, clientData) => 
    apiRequest(`/clients/${clientId}`, {
      method: 'PUT',
      body: JSON.stringify(clientData),
    }),
};

// Service Type API functions
export const serviceTypeAPI = {
  // Get all service types
  getServiceTypes: () => 
    apiRequest('/service-types'),
  
  // Get service type by ID
  getServiceTypeById: (serviceTypeId) => 
    apiRequest(`/service-types/${serviceTypeId}`),
  
  // Create a new service type
  createServiceType: (serviceTypeData) => 
    apiRequest('/service-types', {
      method: 'POST',
      body: JSON.stringify(serviceTypeData),
    }),
};

// Booking API functions
export const bookingAPI = {
  // Get bookings with filters
  getBookings: (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.client_id) params.append('client_id', filters.client_id);
    if (filters.cleaner_id) params.append('cleaner_id', filters.cleaner_id);
    if (filters.property_id) params.append('property_id', filters.property_id);
    if (filters.date) params.append('date', filters.date);
    if (filters.status) params.append('status', filters.status);
    return apiRequest(`/bookings?${params.toString()}`);
  },
  
  // Get booking by ID
  getBookingById: (bookingId) => 
    apiRequest(`/bookings/${bookingId}`),
  
  // Create a new booking
  createBooking: (bookingData) => 
    apiRequest('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    }),
  
  // Update a booking
  updateBooking: (bookingId, bookingData) => 
    apiRequest(`/bookings/${bookingId}`, {
      method: 'PUT',
      body: JSON.stringify(bookingData),
    }),
  
  // Delete a booking
  deleteBooking: (bookingId) => 
    apiRequest(`/bookings/${bookingId}`, {
      method: 'DELETE',
    }),
};

// Time slot API functions
export const timeSlotAPI = {
  // Get time slots with filters
  getTimeSlots: (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.cleaner_id) params.append('cleaner_id', filters.cleaner_id);
    if (filters.day) params.append('day', filters.day);
    return apiRequest(`/time-slots?${params.toString()}`);
  },
  
  // Create a new time slot
  createTimeSlot: (timeSlotData) => 
    apiRequest('/time-slots', {
      method: 'POST',
      body: JSON.stringify(timeSlotData),
    }),
};

// Availability API functions
export const availabilityAPI = {
  // Check available time slots for a cleaner
  checkAvailability: (cleanerId, date, serviceTypeId) => 
    apiRequest(`/availability?cleaner_id=${cleanerId}&date=${date}&service_type_id=${serviceTypeId}`),
};

// Export the generic function for custom requests
export { apiRequest }; 