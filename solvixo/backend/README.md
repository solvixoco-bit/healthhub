# Hospital Management Backend API

RESTful API built with Node.js and Express for the Multi-Hospital Management System.

## Quick Start

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Start development server
npm run dev

# Start production server
npm start
```

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication
All protected routes require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

### Endpoints

#### Auth Routes
```
POST   /auth/register    - Register new user
POST   /auth/login       - Login user
GET    /auth/profile     - Get current user profile
```

#### Hospital Routes
```
GET    /hospitals        - Get all hospitals
GET    /hospitals/:id    - Get hospital by ID
POST   /hospitals        - Create hospital (Super Admin only)
PUT    /hospitals/:id    - Update hospital
DELETE /hospitals/:id    - Delete hospital
```

#### Patient Routes
```
GET    /patients              - Get all patients (with pagination & search)
GET    /patients/:id          - Get patient by ID
POST   /patients              - Register new patient
PUT    /patients/:id          - Update patient
DELETE /patients/:id          - Delete patient
```

#### Doctor Routes
```
GET    /doctors               - Get all doctors
GET    /doctors/:id           - Get doctor by ID
POST   /doctors               - Add new doctor
PUT    /doctors/:id           - Update doctor
DELETE /doctors/:id           - Delete doctor
```

#### Appointment Routes
```
GET    /appointments          - Get appointments
POST   /appointments          - Book appointment
PUT    /appointments/:id/status - Update appointment status
```

#### Department Routes
```
GET    /departments           - Get all departments
POST   /departments           - Create department
PUT    /departments/:id       - Update department
```

#### Bed Routes
```
GET    /beds                  - Get all beds
POST   /beds                  - Create bed
PUT    /beds/:id/status       - Update bed status
```

#### Billing Routes
```
GET    /billing               - Get all bills
GET    /billing/:id           - Get bill by ID
POST   /billing               - Create bill
```

#### Pharmacy Routes
```
GET    /pharmacy/medicines    - Get all medicines
POST   /pharmacy/medicines    - Add medicine
PUT    /pharmacy/medicines/:id - Update medicine
GET    /pharmacy/low-stock    - Get low stock medicines
```

#### Laboratory Routes
```
GET    /laboratory/tests      - Get all lab tests
POST   /laboratory/tests      - Add lab test
GET    /laboratory/bookings   - Get lab bookings
POST   /laboratory/bookings   - Book lab test
PUT    /laboratory/bookings/:id - Update booking
```

#### Staff Routes
```
GET    /staff                 - Get all staff
PUT    /staff/:id/status      - Update staff status
```

#### Inventory Routes
```
GET    /inventory             - Get all inventory items
POST   /inventory             - Add inventory item
```

#### Emergency Routes
```
GET    /emergency             - Get emergency cases
POST   /emergency             - Register emergency case
PUT    /emergency/:id/status  - Update case status
```

#### Report Routes
```
GET    /reports/daily-summary - Get daily summary
GET    /reports/revenue       - Get revenue report
GET    /reports/patient-count - Get patient count report
```

#### Dashboard Routes
```
GET    /dashboard/stats       - Get dashboard statistics
```

## Database Schema

See `database/schema.sql` for complete database structure.

## Error Handling

All errors return JSON in this format:
```json
{
  "success": false,
  "message": "Error message here"
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error
