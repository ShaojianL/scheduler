// API utility functions for making requests to our backend

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

// Event API functions
export const eventAPI = {
  // Get all events for a user
  getEvents: (userId) => 
    apiRequest(`/events?userId=${userId}`),
  
  // Get a specific event
  getEvent: (id) => 
    apiRequest(`/events/${id}`),
  
  // Create a new event
  createEvent: (eventData) => 
    apiRequest('/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    }),
  
  // Update an event
  updateEvent: (id, eventData) => 
    apiRequest(`/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(eventData),
    }),
  
  // Delete an event
  deleteEvent: (id) => 
    apiRequest(`/events/${id}`, {
      method: 'DELETE',
    }),
};

// User API functions
export const userAPI = {
  // Get user profile
  getUser: (userId) => 
    apiRequest(`/users?userId=${userId}`),
  
  // Update user profile
  updateUser: (userData) => 
    apiRequest('/users', {
      method: 'PUT',
      body: JSON.stringify(userData),
    }),
};

// Export the generic function for custom requests
export { apiRequest }; 