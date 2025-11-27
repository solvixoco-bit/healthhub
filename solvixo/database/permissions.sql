-- Permissions System for Hospital Management

-- Permissions Table
CREATE TABLE IF NOT EXISTS permissions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) UNIQUE NOT NULL,
  module VARCHAR(50) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Role Permissions Table
CREATE TABLE IF NOT EXISTS role_permissions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  role ENUM('super_admin', 'admin', 'doctor', 'nurse', 'receptionist', 'pharmacist', 'lab_technician', 'staff') NOT NULL,
  permission_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE,
  UNIQUE KEY unique_role_permission (role, permission_id)
);

-- Insert all permissions
INSERT INTO permissions (name, module, description) VALUES
-- Dashboard
('view_dashboard', 'dashboard', 'View dashboard statistics'),

-- Patients
('view_patients', 'patients', 'View patients list'),
('create_patient', 'patients', 'Add new patient'),
('edit_patient', 'patients', 'Edit patient details'),
('delete_patient', 'patients', 'Delete patient'),
('export_patients', 'patients', 'Export patients data'),

-- Doctors
('view_doctors', 'doctors', 'View doctors list'),
('create_doctor', 'doctors', 'Add new doctor'),
('edit_doctor', 'doctors', 'Edit doctor details'),
('delete_doctor', 'doctors', 'Delete doctor'),
('export_doctors', 'doctors', 'Export doctors data'),

-- Appointments
('view_appointments', 'appointments', 'View appointments'),
('create_appointment', 'appointments', 'Book appointment'),
('edit_appointment', 'appointments', 'Edit appointment'),
('delete_appointment', 'appointments', 'Cancel appointment'),
('export_appointments', 'appointments', 'Export appointments'),

-- Departments
('view_departments', 'departments', 'View departments'),
('create_department', 'departments', 'Add department'),
('edit_department', 'departments', 'Edit department'),
('delete_department', 'departments', 'Delete department'),

-- Billing
('view_billing', 'billing', 'View bills'),
('create_bill', 'billing', 'Create bill'),
('edit_bill', 'billing', 'Edit bill'),
('delete_bill', 'billing', 'Delete bill'),
('export_billing', 'billing', 'Export billing data'),

-- Pharmacy
('view_pharmacy', 'pharmacy', 'View medicines'),
('create_medicine', 'pharmacy', 'Add medicine'),
('edit_medicine', 'pharmacy', 'Edit medicine'),
('delete_medicine', 'pharmacy', 'Delete medicine'),
('export_pharmacy', 'pharmacy', 'Export pharmacy data'),

-- Laboratory
('view_laboratory', 'laboratory', 'View lab tests'),
('create_lab_test', 'laboratory', 'Book lab test'),
('edit_lab_test', 'laboratory', 'Edit lab test'),
('delete_lab_test', 'laboratory', 'Delete lab test'),
('export_laboratory', 'laboratory', 'Export lab data'),

-- Inventory
('view_inventory', 'inventory', 'View inventory'),
('create_inventory', 'inventory', 'Add inventory item'),
('edit_inventory', 'inventory', 'Edit inventory item'),
('delete_inventory', 'inventory', 'Delete inventory item'),
('export_inventory', 'inventory', 'Export inventory data'),

-- Emergency
('view_emergency', 'emergency', 'View emergency cases'),
('create_emergency', 'emergency', 'Register emergency'),
('edit_emergency', 'emergency', 'Edit emergency case'),
('delete_emergency', 'emergency', 'Delete emergency case'),

-- Users
('view_users', 'users', 'View users'),
('create_user', 'users', 'Add user'),
('edit_user', 'users', 'Edit user'),
('delete_user', 'users', 'Delete user'),
('export_users', 'users', 'Export users'),

-- Reports
('view_reports', 'reports', 'View reports'),
('export_reports', 'reports', 'Export reports'),

-- Settings
('view_settings', 'settings', 'View settings'),
('edit_settings', 'settings', 'Edit settings');

-- Assign permissions to Super Admin (all permissions)
INSERT INTO role_permissions (role, permission_id)
SELECT 'super_admin', id FROM permissions;

-- Assign permissions to Admin (most permissions except user management)
INSERT INTO role_permissions (role, permission_id)
SELECT 'admin', id FROM permissions 
WHERE module != 'users' OR name IN ('view_users');

-- Assign permissions to Doctor
INSERT INTO role_permissions (role, permission_id)
SELECT 'doctor', id FROM permissions 
WHERE name IN (
  'view_dashboard',
  'view_patients', 'create_patient', 'edit_patient',
  'view_appointments', 'create_appointment', 'edit_appointment',
  'view_laboratory', 'create_lab_test',
  'view_pharmacy',
  'view_emergency', 'create_emergency', 'edit_emergency'
);

-- Assign permissions to Nurse
INSERT INTO role_permissions (role, permission_id)
SELECT 'nurse', id FROM permissions 
WHERE name IN (
  'view_dashboard',
  'view_patients', 'edit_patient',
  'view_appointments',
  'view_laboratory',
  'view_pharmacy',
  'view_emergency', 'create_emergency', 'edit_emergency'
);

-- Assign permissions to Receptionist
INSERT INTO role_permissions (role, permission_id)
SELECT 'receptionist', id FROM permissions 
WHERE name IN (
  'view_dashboard',
  'view_patients', 'create_patient', 'edit_patient',
  'view_doctors',
  'view_appointments', 'create_appointment', 'edit_appointment', 'delete_appointment',
  'view_billing', 'create_bill',
  'view_laboratory', 'create_lab_test'
);

-- Assign permissions to Pharmacist
INSERT INTO role_permissions (role, permission_id)
SELECT 'pharmacist', id FROM permissions 
WHERE name IN (
  'view_dashboard',
  'view_patients',
  'view_pharmacy', 'create_medicine', 'edit_medicine', 'export_pharmacy',
  'view_inventory', 'create_inventory', 'edit_inventory'
);

-- Assign permissions to Lab Technician
INSERT INTO role_permissions (role, permission_id)
SELECT 'lab_technician', id FROM permissions 
WHERE name IN (
  'view_dashboard',
  'view_patients',
  'view_laboratory', 'create_lab_test', 'edit_lab_test', 'export_laboratory'
);

-- Assign permissions to Staff
INSERT INTO role_permissions (role, permission_id)
SELECT 'staff', id FROM permissions 
WHERE name IN (
  'view_dashboard',
  'view_patients',
  'view_appointments',
  'view_inventory'
);
