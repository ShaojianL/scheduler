I'll analyze the current API structure and database service to describe the schema with entities, attributes, and relationships for the Airbnb cleaning services system.

Read file: lib/db.js
Now let me examine the API routes to understand the complete data structure:

Read file: app/api/properties/route.js
Read file: app/api/cleaners/route.js
Read file: app/api/clients/route.js
Read file: app/api/service-types/route.js
Read file: app/api/bookings/route.js
Read file: app/api/time-slots/route.js
Based on my analysis of the codebase, here's the complete schema description for the Airbnb Cleaning Services scheduling system:

## **Database Schema for Airbnb Cleaning Services**

### **1. Properties Entity**
**Purpose**: Represents Airbnb properties that need cleaning services

**Attributes**:
- `property_id` (Primary Key) - Unique identifier
- `name` - Property name (e.g., "Downtown Luxury Condo")
- `address` - Full property address
- `bedrooms` - Number of bedrooms (integer)
- `bathrooms` - Number of bathrooms (integer)
- `square_feet` - Property size in square feet (integer, nullable)
- `property_type` - Type of property (enum: 'condo', 'house', 'cabin', 'apartment')
- `owner_id` - Foreign key to Clients table (nullable)
- `cleaning_instructions` - Special cleaning instructions (text)

### **2. Cleaners Entity**
**Purpose**: Represents cleaning staff who provide services

**Attributes**:
- `cleaner_id` (Primary Key) - Unique identifier
- `name` - Cleaner's full name
- `email` - Email address (nullable)
- `phone` - Phone number (nullable)
- `hourly_rate` - Hourly rate in dollars (decimal)
- `specialties` - Array of cleaning specialties (e.g., ['deep_cleaning', 'eco_friendly'])
- `experience_years` - Years of experience (integer)
- `rating` - Average rating (decimal, 0-5 scale)
- `available` - Whether cleaner is currently available (boolean)
- `preferred_property_types` - Array of preferred property types

### **3. Clients Entity**
**Purpose**: Represents property owners who book cleaning services

**Attributes**:
- `client_id` (Primary Key) - Unique identifier
- `name` - Client's full name
- `email` - Email address
- `phone` - Phone number (nullable)
- `address` - Client's address (nullable)
- `property_count` - Number of properties owned (integer)
- `preferred_cleaning_frequency` - Preferred cleaning schedule (enum: 'weekly', 'bi_weekly', 'monthly')
- `special_instructions` - General cleaning preferences (text)
- `payment_method` - Preferred payment method (enum: 'credit_card', 'paypal', 'bank_transfer')

### **4. Service Types Entity**
**Purpose**: Defines different types of cleaning services offered

**Attributes**:
- `service_type_id` (Primary Key) - Unique identifier
- `name` - Service name (e.g., "Regular Cleaning")
- `category` - Service category (enum: 'standard', 'premium', 'specialized')
- `base_price` - Base price in dollars (decimal)
- `duration_hours` - Estimated duration in hours (integer)
- `description` - Detailed service description (text)
- `includes` - Array of included tasks (e.g., ['dusting', 'vacuuming', 'bathroom_cleaning'])

### **5. Bookings Entity**
**Purpose**: Represents scheduled cleaning appointments

**Attributes**:
- `booking_id` (Primary Key) - Unique identifier
- `client_id` (Foreign Key) - References Clients table
- `cleaner_id` (Foreign Key) - References Cleaners table
- `property_id` (Foreign Key) - References Properties table
- `service_type_id` (Foreign Key) - References Service Types table
- `scheduled_date` - Date of the booking (date)
- `start_time` - Start time (time)
- `end_time` - End time (time)
- `status` - Booking status (enum: 'pending', 'confirmed', 'in_progress', 'completed', 'cancelled')
- `total_price` - Total price for the booking (decimal)
- `special_instructions` - Special instructions for this booking (text)
- `payment_status` - Payment status (enum: 'pending', 'paid', 'failed')

### **6. Time Slots Entity**
**Purpose**: Defines cleaner availability schedules

**Attributes**:
- `slot_id` (Primary Key) - Unique identifier
- `cleaner_id` (Foreign Key) - References Cleaners table
- `day` - Day of the week (enum: 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun')
- `start_time` - Start time of availability (time)
- `end_time` - End time of availability (time)
- `max_bookings_per_day` - Maximum bookings allowed per day (integer, 1-8)

## **Relationships**

### **One-to-Many Relationships**:
1. **Client → Properties**: One client can own multiple properties
   - `Properties.owner_id` → `Clients.client_id`

2. **Cleaner → Time Slots**: One cleaner can have multiple time slots
   - `TimeSlots.cleaner_id` → `Cleaners.cleaner_id`

3. **Cleaner → Bookings**: One cleaner can have multiple bookings
   - `Bookings.cleaner_id` → `Cleaners.cleaner_id`

4. **Client → Bookings**: One client can have multiple bookings
   - `Bookings.client_id` → `Clients.client_id`

5. **Property → Bookings**: One property can have multiple bookings
   - `Bookings.property_id` → `Properties.property_id`

6. **Service Type → Bookings**: One service type can be used in multiple bookings
   - `Bookings.service_type_id` → `ServiceTypes.service_type_id`

### **Many-to-Many Relationships** (implied through arrays):
1. **Cleaners ↔ Property Types**: Cleaners can prefer multiple property types, and property types can be preferred by multiple cleaners
2. **Cleaners ↔ Specialties**: Cleaners can have multiple specialties, and specialties can be held by multiple cleaners
3. **Service Types ↔ Included Tasks**: Service types can include multiple tasks, and tasks can be included in multiple service types

## **Key Business Rules**:

1. **Booking Validation**: 
   - Start time must be before end time
   - Booking duration should match service type duration
   - No overlapping bookings for the same cleaner

2. **Availability Rules**:
   - Bookings can only be made within cleaner's time slots
   - Maximum bookings per day limit per cleaner
   - Cleaners must be available for booking

3. **Pricing**:
   - Total price calculated based on service type base price and duration
   - Hourly rates may vary by cleaner

4. **Status Flow**:
   - Bookings start as 'pending'
   - Can be 'confirmed', 'in_progress', 'completed', or 'cancelled'

This schema provides a comprehensive foundation for managing Airbnb cleaning services with proper relationships, constraints, and business logic.