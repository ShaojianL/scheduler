This manual explains the relationship between `lib/db.js` and the API routes like `app/api/cleaners/route.js`. This is a crucial architectural concept.

## **Current Relationship (What We Have Now):**

### **`app/api/cleaners/route.js` (API Layer)**
- **Purpose**: HTTP endpoint that handles web requests
- **What it does**: 
  - Receives HTTP requests (GET, POST, etc.)
  - Validates input data
  - Returns JSON responses
  - Handles HTTP status codes and errors
- **Current state**: Uses hardcoded data (TODO comments)

### **`lib/db.js` (Database Layer)**
- **Purpose**: Database service class for data operations
- **What it does**:
  - Contains methods for database operations
  - Handles data queries, inserts, updates, deletes
  - Provides a clean interface for database access
- **Current state**: Placeholder methods (TODO comments)

## **How They Should Work Together:**

```
HTTP Request → API Route → Database Service → Database
     ↑              ↓              ↓           ↓
   Frontend    Validation    Business Logic  PostgreSQL
```

### **Example Flow:**

1. **Frontend** makes request: `GET /api/cleaners?property_type=condo`
2. **`cleaners/route.js`** receives the request
3. **`cleaners/route.js`** calls `cleaningServicesDB.getCleaners({ property_type: 'condo' })`
4. **`db.js`** executes database query
5. **`db.js`** returns data to `cleaners/route.js`
6. **`cleaners/route.js`** sends JSON response to frontend

## **Current Problem:**

Right now, both files have **TODO comments** because they're not connected. The API routes use hardcoded data instead of calling the database service.

## **What We Need to Do:**

### **1. Connect the Layers**

In `app/api/cleaners/route.js`, we should replace:
```javascript
// Current (hardcoded)
const cleaners = [
  { cleaner_id: 1, name: 'Maria Garcia', ... }
];

// Should be (connected to database)
const cleaners = await cleaningServicesDB.getCleaners({ property_type: propertyType });
```

### **2. Implement Database Methods**

In `lib/db.js`, we should replace:
```javascript
// Current (placeholder)
async getCleaners(filters = {}) {
  // TODO: Implement actual database query
  return [];
}

// Should be (actual Prisma queries)
async getCleaners(filters = {}) {
  return await prisma.cleaner.findMany({
    where: filters,
    include: { specialties: true }
  });
}
```

## **New Domain Model (Airbnb Cleaning Services):**

### **Core Entities:**
- **Properties**: Airbnb properties that need cleaning
- **Cleaners**: Cleaning staff with specialties and rates
- **Clients**: Property owners who book cleaning services
- **Service Types**: Different types of cleaning services (regular, deep, move-out, etc.)
- **Bookings**: Scheduled cleaning appointments
- **Time Slots**: Cleaner availability schedules

### **Key Relationships:**
- Properties belong to Clients
- Bookings connect Clients, Cleaners, Properties, and Service Types
- Cleaners have specialties and preferred property types
- Service Types have different durations and pricing

## **Benefits of This Architecture:**

✅ **Separation of Concerns**: API handles HTTP, DB service handles data  
✅ **Reusability**: Database methods can be used by multiple API routes  
✅ **Testability**: Can test database logic separately from HTTP logic  
✅ **Maintainability**: Changes to database logic don't affect API structure  
✅ **Type Safety**: Prisma will generate types for both layers  

## **Next Steps:**

1. **Set up Prisma** with your schema for cleaning services
2. **Implement the database methods** in `db.js`
3. **Connect API routes** to use the database service
4. **Remove hardcoded data** from API routes

Would you like me to help you set up Prisma and connect these layers properly?