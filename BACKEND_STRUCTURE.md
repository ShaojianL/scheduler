This manual explains the relationship between `lib/db.js` and the API routes like `app/api/staff/route.js`. This is a crucial architectural concept.

## **Current Relationship (What We Have Now):**

### **`app/api/staff/route.js` (API Layer)**
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

1. **Frontend** makes request: `GET /api/staff?dept_id=1`
2. **`staff/route.js`** receives the request
3. **`staff/route.js`** calls `healthcareDB.getStaff({ dept_id: 1 })`
4. **`db.js`** executes database query
5. **`db.js`** returns data to `staff/route.js`
6. **`staff/route.js`** sends JSON response to frontend

## **Current Problem:**

Right now, both files have **TODO comments** because they're not connected. The API routes use hardcoded data instead of calling the database service.

## **What We Need to Do:**

### **1. Connect the Layers**

In `app/api/staff/route.js`, we should replace:
```javascript
// Current (hardcoded)
const staff = [
  { staff_id: 1, name: 'Dr. Sarah Johnson', ... }
];

// Should be (connected to database)
const staff = await healthcareDB.getStaff({ dept_id: parseInt(deptId) });
```

### **2. Implement Database Methods**

In `lib/db.js`, we should replace:
```javascript
// Current (placeholder)
async getStaff(filters = {}) {
  // TODO: Implement actual database query
  return [];
}

// Should be (actual Prisma queries)
async getStaff(filters = {}) {
  return await prisma.staff.findMany({
    where: filters,
    include: { department: true }
  });
}
```

## **Benefits of This Architecture:**

✅ **Separation of Concerns**: API handles HTTP, DB service handles data  
✅ **Reusability**: Database methods can be used by multiple API routes  
✅ **Testability**: Can test database logic separately from HTTP logic  
✅ **Maintainability**: Changes to database logic don't affect API structure  
✅ **Type Safety**: Prisma will generate types for both layers  

## **Next Steps:**

1. **Set up Prisma** with your schema
2. **Implement the database methods** in `db.js`
3. **Connect API routes** to use the database service
4. **Remove hardcoded data** from API routes

Would you like me to help you set up Prisma and connect these layers properly?