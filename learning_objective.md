# Airbnb Cleaning Services - Full-Stack Project Structure

## **Project Overview**
This is a **full-stack web application** for scheduling Airbnb cleaning services. It demonstrates modern web development practices with a clear separation between frontend and backend, proper encapsulation, and scalable architecture.

## **Technology Stack**
- **Frontend**: Next.js 14 (React framework)
- **Backend**: Next.js API Routes (serverless functions)
- **Database**: Placeholder for Prisma ORM
- **Authentication**: Clerk
- **Styling**: Tailwind CSS + shadcn/ui components

## **Project Structure**

```
scheduler/
├── app/                    # Next.js App Router (Frontend + Backend)
│   ├── api/               # Backend API Routes
│   │   ├── properties/    # Property management endpoints
│   │   ├── cleaners/      # Cleaner management endpoints
│   │   ├── clients/       # Client management endpoints
│   │   ├── service-types/ # Service type endpoints
│   │   ├── bookings/      # Booking management endpoints
│   │   ├── time-slots/    # Time slot endpoints
│   │   └── availability/  # Availability checking endpoints
│   ├── dashboard/         # Frontend dashboard page
│   ├── sign-in/          # Authentication pages
│   ├── sign-up/          # Authentication pages
│   ├── layout.js         # Root layout component
│   └── page.js           # Home page
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components (shadcn/ui)
│   ├── Header.jsx        # Navigation header
│   ├── Footer.jsx        # Footer component
│   └── Hero.jsx          # Landing page hero
├── lib/                  # Utility libraries
│   ├── api.js           # Frontend API client
│   ├── db.js            # Database service layer
│   └── utils.js         # Helper functions
└── public/              # Static assets
```

## **Frontend-Backend Interaction Architecture**

### **1. Layered Architecture Pattern**

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND LAYER                           │
├─────────────────────────────────────────────────────────────┤
│  React Components (UI)                                      │
│  └── User interactions, state management, rendering         │
├─────────────────────────────────────────────────────────────┤
│  API Client Layer (lib/api.js)                              │
│  └── HTTP requests, error handling, data transformation     │
├─────────────────────────────────────────────────────────────┤
│                    BACKEND LAYER                            │
├─────────────────────────────────────────────────────────────┤
│  API Routes (app/api/*/route.js)                            │
│  └── HTTP endpoints, request validation, response handling  │
├─────────────────────────────────────────────────────────────┤
│  Database Service Layer (lib/db.js)                         │
│  └── Business logic, data operations, database queries      │
├─────────────────────────────────────────────────────────────┤
│  Database (PostgreSQL + Prisma)                             │
│  └── Data persistence, relationships, constraints           │
└─────────────────────────────────────────────────────────────┘
```

### **2. Data Flow Example: Creating a Booking**

```javascript
// 1. Frontend Component (User Interface)
const BookingForm = () => {
  const handleSubmit = async (bookingData) => {
    try {
      // 2. API Client Layer - Encapsulates HTTP logic
      const newBooking = await bookingAPI.createBooking(bookingData);
      // 3. Update UI state
      setBookings(prev => [...prev, newBooking]);
    } catch (error) {
      // Handle errors
    }
  };
};

// 4. API Client (lib/api.js) - Clean abstraction
export const bookingAPI = {
  createBooking: (bookingData) => 
    apiRequest('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    }),
};

// 5. Backend API Route (app/api/bookings/route.js)
export async function POST(request) {
  const body = await request.json();
  
  // 6. Validation and business logic
  if (!body.client_id || !body.cleaner_id) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  
  // 7. Database Service Layer - Encapsulates data operations
  const newBooking = await cleaningServicesDB.createBooking(body);
  
  // 8. Return response
  return NextResponse.json({ booking: newBooking }, { status: 201 });
}

// 9. Database Service (lib/db.js) - Business logic encapsulation
async createBooking(bookingData) {
  // TODO: Implement actual database insert
  return { booking_id: Date.now(), ...bookingData };
}
```

## **Key Software Engineering Principles Demonstrated**

### **1. Separation of Concerns**
Each layer has a specific responsibility:
- **Frontend**: User interface and user experience
- **API Client**: HTTP communication and data transformation
- **API Routes**: Request handling and validation
- **Database Service**: Business logic and data operations
- **Database**: Data persistence

### **2. Encapsulation**

#### **Function Encapsulation**
```javascript
// Good: Encapsulated API function with clear interface
export const cleanerAPI = {
  getCleaners: (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.property_type) params.append('property_type', filters.property_type);
    return apiRequest(`/cleaners?${params.toString()}`);
  },
};

// Usage: Clean, simple interface
const condoCleaners = await cleanerAPI.getCleaners({ property_type: 'condo' });
```

#### **Component Encapsulation**
```javascript
// Good: Reusable component with props interface
const PropertyCard = ({ property, onEdit, onDelete }) => {
  return (
    <div className="border rounded-lg p-4">
      <h3>{property.name}</h3>
      <p>{property.address}</p>
      <div className="flex gap-2">
        <button onClick={() => onEdit(property)}>Edit</button>
        <button onClick={() => onDelete(property.id)}>Delete</button>
      </div>
    </div>
  );
};
```

### **3. Single Responsibility Principle**
Each file/module has one clear purpose:
- `lib/api.js` → HTTP communication
- `lib/db.js` → Database operations
- `app/api/bookings/route.js` → Booking endpoint logic
- `components/PropertyCard.jsx` → Property display

### **4. Dependency Inversion**
Frontend components depend on abstractions (API interfaces) rather than concrete implementations:

```javascript
// Frontend doesn't know about HTTP details
const BookingsList = () => {
  const [bookings, setBookings] = useState([]);
  
  useEffect(() => {
    // Depends on abstraction, not implementation
    bookingAPI.getBookings().then(setBookings);
  }, []);
};
```

## **API Design Patterns**

### **1. RESTful Endpoints**
```
GET    /api/properties     # Get all properties
POST   /api/properties     # Create new property
GET    /api/properties/1   # Get specific property
PUT    /api/properties/1   # Update property
DELETE /api/properties/1   # Delete property
```

### **2. Query Parameter Filtering**
```javascript
// Flexible filtering without changing endpoint structure
GET /api/cleaners?property_type=condo
GET /api/bookings?client_id=123&status=confirmed
GET /api/time-slots?cleaner_id=456&day=Mon
```

### **3. Consistent Response Format**
```javascript
// Success response
{
  "properties": [...],
  "total": 10
}

// Error response
{
  "error": "Property name is required"
}
```

## **Error Handling Strategy**

### **1. Layered Error Handling**
```javascript
// Database layer
async createBooking(data) {
  try {
    // Database operation
  } catch (error) {
    throw new Error('Database operation failed');
  }
}

// API route layer
export async function POST(request) {
  try {
    const result = await cleaningServicesDB.createBooking(data);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// API client layer
async function apiRequest(endpoint, options) {
  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Frontend layer
const handleSubmit = async () => {
  try {
    await bookingAPI.createBooking(data);
  } catch (error) {
    setError(error.message);
  }
};
```

## **State Management**

### **1. Local Component State**
```javascript
const BookingForm = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Encapsulated state management
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      await bookingAPI.createBooking(formData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
};
```

### **2. Server State (Future Enhancement)**
Could be enhanced with React Query or SWR for:
- Caching
- Background updates
- Optimistic updates
- Error retry logic

## **Testing Strategy (Future Enhancement)**

### **1. Unit Testing**
```javascript
// Test API client functions
describe('cleanerAPI', () => {
  it('should filter cleaners by property type', async () => {
    const result = await cleanerAPI.getCleaners({ property_type: 'condo' });
    expect(result.cleaners).toHaveLength(2);
  });
});
```

### **2. Integration Testing**
```javascript
// Test API routes
describe('POST /api/bookings', () => {
  it('should create a new booking', async () => {
    const response = await fetch('/api/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData)
    });
    expect(response.status).toBe(201);
  });
});
```

## **Scalability Considerations**

### **1. Code Organization**
- Modular structure allows easy addition of new features
- Clear separation makes it easy to add new API endpoints
- Component library can be extended with new UI components

### **2. Performance**
- API routes are serverless (automatic scaling)
- Frontend components can be optimized with React.memo
- Database queries can be optimized with proper indexing

### **3. Maintainability**
- Clear file structure makes it easy to find and modify code
- Consistent patterns across the codebase
- Good documentation and naming conventions

This project demonstrates **professional full-stack development practices** with clear architecture, proper encapsulation, and scalable design patterns that are essential for real-world applications.