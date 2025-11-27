# 🏥 Solvixo Hospital Management System

A comprehensive hospital management system built with React, Node.js, Express, and MySQL.

## ✨ Features

- 👥 **Patient Management** - Register, view, and manage patient records
- 🩺 **Doctor Management** - Manage doctors, specializations, and schedules
- 📅 **Appointments** - Book and track patient appointments
- 💊 **Pharmacy** - Medicine inventory and prescription management
- 🧪 **Laboratory** - Lab test bookings and results
- 🚨 **Emergency** - Emergency case management
- 💳 **Billing** - Invoice generation and payment tracking
- 📦 **Inventory** - Medical equipment and supplies tracking
- 🔐 **Role-Based Access Control** - Permissions for different user roles
- 🔔 **Notifications** - Real-time system notifications
- 🔑 **Password Reset** - Secure forgot password functionality

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd hospital-management
```

2. **Install dependencies**
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. **Setup Database**
```bash
# Make sure MySQL is running
# Then run the complete setup file
mysql -u root -p < database/complete_setup.sql
```

4. **Configure Environment**
```bash
# Backend .env is already configured
# Check backend/.env and update if needed
```

5. **Start the application**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

6. **Access the application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 🔑 Default Login Credentials

**Super Admin**:
- Email: `admin@hospital.com`
- Password: `admin123`

**Doctor**:
- Email: `doctor@hospital.com`
- Password: `admin123`

**Nurse**:
- Email: `nurse@hospital.com`
- Password: `admin123`

**Receptionist**:
- Email: `receptionist@hospital.com`
- Password: `admin123`

## 📁 Project Structure

```
hospital-management/
├── backend/
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Auth & permission middleware
│   │   ├── routes/         # API routes
│   │   └── utils/          # Utility functions
│   ├── .env               # Environment variables
│   ├── server.js          # Entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API services
│   │   ├── styles/        # CSS files
│   │   └── utils/         # Utility functions
│   └── package.json
├── database/
│   ├── complete_setup.sql # Complete database setup (USE THIS)
│   ├── schema.sql         # Table schemas only
│   ├── permissions.sql    # Permissions only
│   └── notifications.sql  # Notifications table only
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router v6
- Ant Design
- Tailwind CSS
- Axios
- React Hot Toast

### Backend
- Node.js
- Express.js
- MySQL2
- JWT Authentication
- Bcrypt
- Nodemailer
- Multer (file uploads)

## 📊 Database

The system uses MySQL with 17+ tables:
- hospitals, users, patients, doctors
- appointments, departments, wards, beds
- billing, medicines, lab_tests, lab_bookings
- inventory, emergency_cases
- permissions, role_permissions
- notifications, password_reset_tokens

## 🔐 User Roles & Permissions

- **Super Admin**: Full system access
- **Admin**: Most features except user management
- **Doctor**: Patient care, appointments, lab tests
- **Nurse**: Patient viewing, emergency cases
- **Receptionist**: Patient registration, appointments, billing
- **Pharmacist**: Medicine management
- **Lab Technician**: Lab test management
- **Staff**: View-only access

## 🎨 UI Features

- Collapsible sidebar with colorful icons
- Purple gradient active menu highlighting
- Icon-based action buttons (View, Edit, Delete)
- Responsive design
- Standardized font sizes (9px-14px)
- Real-time notifications with badge
- Filter and search functionality
- Export to CSV

## 📝 API Endpoints

### Authentication
- POST `/api/auth/login` - User login
- POST `/api/auth/forgot-password` - Request password reset
- POST `/api/auth/reset-password` - Reset password

### Patients
- GET `/api/patients` - Get all patients
- POST `/api/patients` - Create patient
- PUT `/api/patients/:id` - Update patient
- DELETE `/api/patients/:id` - Delete patient

### Doctors
- GET `/api/doctors` - Get all doctors
- POST `/api/doctors` - Create doctor
- PUT `/api/doctors/:id` - Update doctor
- DELETE `/api/doctors/:id` - Deactivate doctor

### Appointments
- GET `/api/appointments` - Get all appointments
- POST `/api/appointments` - Create appointment
- PUT `/api/appointments/:id/status` - Update status

### Notifications
- GET `/api/notifications` - Get user notifications
- PUT `/api/notifications/:id/read` - Mark as read
- PUT `/api/notifications/read-all` - Mark all as read

[See full API documentation for more endpoints]

## 🧪 Testing

```bash
# Test database connection
node backend/diagnose.js

# Test backend health
curl http://localhost:5000/health
```

## 🔧 Troubleshooting

### Database Connection Failed

1. **Check MySQL is running**:
```powershell
Get-Service -Name MySQL*
Start-Service -Name MySQL80
```

2. **Verify database exists**:
```bash
mysql -u root -p -e "SHOW DATABASES;"
```

3. **Run diagnostic**:
```bash
node backend/diagnose.js
```

### Port Already in Use

```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process
taskkill /PID <PID> /F
```

## 📚 Documentation

- `SETUP_DATABASE.md` - Database setup guide
- `DATABASE_CONNECTION_FIX.md` - Connection troubleshooting
- `START_MYSQL.md` - MySQL service guide
- `QUICK_START.md` - Quick start guide

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

Developed by Solvixo Team

## 📞 Support

For support, email: solvixo.co@gmail.com

---

**Made with ❤️ by Solvixo**
