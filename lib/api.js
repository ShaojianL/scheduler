// API utility functions for healthcare appointment scheduling

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

// Department API functions
export const departmentAPI = {
  // Get all departments
  getDepartments: () => 
    apiRequest('/departments'),
  
  // Create a new department
  createDepartment: (departmentData) => 
    apiRequest('/departments', {
      method: 'POST',
      body: JSON.stringify(departmentData),
    }),
};

// Staff API functions
export const staffAPI = {
  // Get all staff or filter by department
  getStaff: (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.dept_id) params.append('dept_id', filters.dept_id);
    return apiRequest(`/staff?${params.toString()}`);
  },
  
  // Create a new staff member
  createStaff: (staffData) => 
    apiRequest('/staff', {
      method: 'POST',
      body: JSON.stringify(staffData),
    }),
};

// Patient API functions
export const patientAPI = {
  // Get all patients or filter by advisor
  getPatients: (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.advisor_id) params.append('advisor_id', filters.advisor_id);
    return apiRequest(`/patients?${params.toString()}`);
  },
  
  // Create a new patient
  createPatient: (patientData) => 
    apiRequest('/patients', {
      method: 'POST',
      body: JSON.stringify(patientData),
    }),
};

// Service API functions
export const serviceAPI = {
  // Get all services
  getServices: () => 
    apiRequest('/services'),
  
  // Create a new service
  createService: (serviceData) => 
    apiRequest('/services', {
      method: 'POST',
      body: JSON.stringify(serviceData),
    }),
};

// Appointment API functions
export const appointmentAPI = {
  // Get appointments with filters
  getAppointments: (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.patient_id) params.append('patient_id', filters.patient_id);
    if (filters.staff_id) params.append('staff_id', filters.staff_id);
    if (filters.date) params.append('date', filters.date);
    if (filters.status) params.append('status', filters.status);
    return apiRequest(`/appointments?${params.toString()}`);
  },
  
  // Create a new appointment
  createAppointment: (appointmentData) => 
    apiRequest('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    }),
};

// Time slot API functions
export const timeSlotAPI = {
  // Get time slots with filters
  getTimeSlots: (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.staff_id) params.append('staff_id', filters.staff_id);
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
  // Check available time slots for a staff member
  checkAvailability: (staffId, date, serviceId) => 
    apiRequest(`/availability?staff_id=${staffId}&date=${date}&service_id=${serviceId}`),
};

// Export the generic function for custom requests
export { apiRequest }; 