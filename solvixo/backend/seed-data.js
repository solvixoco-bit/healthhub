const mysql = require('mysql2/promise');
require('dotenv').config();

async function seedData() {
  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'hospital_management'
    });

    console.log('🌱 Starting data seeding...\n');

    // Get hospital ID
    const [hospitals] = await conn.query('SELECT id FROM hospitals LIMIT 1');
    if (hospitals.length === 0) {
      console.log('❌ No hospital found. Please create a hospital first.');
      return;
    }
    const hospitalId = hospitals[0].id;
    console.log(`✅ Using hospital ID: ${hospitalId}\n`);

    // Check and insert patients
    const [existingPatients] = await conn.query('SELECT COUNT(*) as count FROM patients WHERE hospital_id = ?', [hospitalId]);
    if (existingPatients[0].count < 10) {
      console.log('📝 Inserting patients...');
      const patients = [
        [hospitalId, 'PAT001', 'Rajesh Kumar', 45, 'male', '9876543210', 'rajesh.kumar@email.com', '123 MG Road, Delhi', 'O+', '9876543211', 'Priya Kumar', 'Diabetes, Hypertension'],
        [hospitalId, 'PAT002', 'Priya Sharma', 32, 'female', '9876543212', 'priya.sharma@email.com', '456 Park Street, Mumbai', 'A+', '9876543213', 'Amit Sharma', 'Asthma'],
        [hospitalId, 'PAT003', 'Amit Patel', 28, 'male', '9876543214', 'amit.patel@email.com', '789 Lake View, Bangalore', 'B+', '9876543215', 'Neha Patel', 'None'],
        [hospitalId, 'PAT004', 'Neha Singh', 55, 'female', '9876543216', 'neha.singh@email.com', '321 Hill Road, Pune', 'AB+', '9876543217', 'Vikram Singh', 'Heart Disease'],
        [hospitalId, 'PAT005', 'Vikram Reddy', 40, 'male', '9876543218', 'vikram.reddy@email.com', '654 Beach Road, Chennai', 'O-', '9876543219', 'Lakshmi Reddy', 'Kidney Stones'],
        [hospitalId, 'PAT006', 'Lakshmi Iyer', 35, 'female', '9876543220', 'lakshmi.iyer@email.com', '987 Temple Street, Hyderabad', 'A-', '9876543221', 'Suresh Iyer', 'Thyroid'],
        [hospitalId, 'PAT007', 'Suresh Gupta', 50, 'male', '9876543222', 'suresh.gupta@email.com', '147 Market Road, Kolkata', 'B-', '9876543223', 'Anjali Gupta', 'Arthritis'],
        [hospitalId, 'PAT008', 'Anjali Verma', 29, 'female', '9876543224', 'anjali.verma@email.com', '258 Garden Lane, Jaipur', 'AB-', '9876543225', 'Rohit Verma', 'Migraine'],
        [hospitalId, 'PAT009', 'Rohit Malhotra', 42, 'male', '9876543226', 'rohit.malhotra@email.com', '369 River View, Ahmedabad', 'O+', '9876543227', 'Pooja Malhotra', 'Back Pain'],
        [hospitalId, 'PAT010', 'Pooja Kapoor', 38, 'female', '9876543228', 'pooja.kapoor@email.com', '741 City Center, Lucknow', 'A+', '9876543229', 'Karan Kapoor', 'Allergy']
      ];

      for (const patient of patients) {
        try {
          await conn.query(
            'INSERT INTO patients (hospital_id, patient_id, name, age, gender, phone, email, address, blood_group, emergency_contact, emergency_contact_name, medical_history) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            patient
          );
        } catch (err) {
          if (!err.message.includes('Duplicate entry')) {
            console.error(`Error inserting patient: ${err.message}`);
          }
        }
      }
      console.log('✅ Patients inserted\n');
    } else {
      console.log('✅ Patients already exist\n');
    }

    // Check and insert departments
    const [existingDepts] = await conn.query('SELECT COUNT(*) as count FROM departments WHERE hospital_id = ?', [hospitalId]);
    if (existingDepts[0].count < 10) {
      console.log('📝 Inserting departments...');
      const departments = [
        [hospitalId, 'Cardiology', 'Heart and cardiovascular system'],
        [hospitalId, 'Neurology', 'Brain and nervous system'],
        [hospitalId, 'Orthopedics', 'Bones and joints'],
        [hospitalId, 'Pediatrics', 'Children healthcare'],
        [hospitalId, 'Gynecology', 'Women healthcare'],
        [hospitalId, 'Dermatology', 'Skin conditions'],
        [hospitalId, 'ENT', 'Ear, Nose, and Throat'],
        [hospitalId, 'Ophthalmology', 'Eye care'],
        [hospitalId, 'Psychiatry', 'Mental health'],
        [hospitalId, 'General Medicine', 'General healthcare']
      ];

      for (const dept of departments) {
        try {
          await conn.query(
            'INSERT INTO departments (hospital_id, name, description) VALUES (?, ?, ?)',
            dept
          );
        } catch (err) {
          if (!err.message.includes('Duplicate entry')) {
            console.error(`Error inserting department: ${err.message}`);
          }
        }
      }
      console.log('✅ Departments inserted\n');
    } else {
      console.log('✅ Departments already exist\n');
    }

    // Get department IDs
    const [depts] = await conn.query('SELECT id FROM departments WHERE hospital_id = ? LIMIT 10', [hospitalId]);

    // Check and insert doctors
    const [existingDoctors] = await conn.query('SELECT COUNT(*) as count FROM doctors WHERE hospital_id = ?', [hospitalId]);
    if (existingDoctors[0].count < 10 && depts.length > 0) {
      console.log('📝 Inserting doctors...');
      const doctors = [
        [hospitalId, depts[0]?.id, 'Dr. Arun Mehta', 'Cardiologist', 'MBBS, MD Cardiology', '9123456780', 'arun.mehta@hospital.com', 15, 1500.00],
        [hospitalId, depts[1]?.id, 'Dr. Sneha Rao', 'Neurologist', 'MBBS, DM Neurology', '9123456781', 'sneha.rao@hospital.com', 12, 1200.00],
        [hospitalId, depts[2]?.id, 'Dr. Rahul Joshi', 'Orthopedic Surgeon', 'MBBS, MS Orthopedics', '9123456782', 'rahul.joshi@hospital.com', 10, 1000.00],
        [hospitalId, depts[3]?.id, 'Dr. Kavita Nair', 'Pediatrician', 'MBBS, MD Pediatrics', '9123456783', 'kavita.nair@hospital.com', 8, 800.00],
        [hospitalId, depts[4]?.id, 'Dr. Deepak Sharma', 'Gynecologist', 'MBBS, MS Gynecology', '9123456784', 'deepak.sharma@hospital.com', 14, 1300.00],
        [hospitalId, depts[5]?.id, 'Dr. Meera Desai', 'Dermatologist', 'MBBS, MD Dermatology', '9123456785', 'meera.desai@hospital.com', 9, 900.00],
        [hospitalId, depts[6]?.id, 'Dr. Sanjay Kumar', 'ENT Specialist', 'MBBS, MS ENT', '9123456786', 'sanjay.kumar@hospital.com', 11, 1100.00],
        [hospitalId, depts[7]?.id, 'Dr. Priyanka Singh', 'Ophthalmologist', 'MBBS, MS Ophthalmology', '9123456787', 'priyanka.singh@hospital.com', 7, 700.00],
        [hospitalId, depts[8]?.id, 'Dr. Arjun Reddy', 'Psychiatrist', 'MBBS, MD Psychiatry', '9123456788', 'arjun.reddy@hospital.com', 13, 1400.00],
        [hospitalId, depts[9]?.id, 'Dr. Nisha Patel', 'General Physician', 'MBBS, MD Medicine', '9123456789', 'nisha.patel@hospital.com', 16, 600.00]
      ];

      for (const doctor of doctors) {
        try {
          await conn.query(
            'INSERT INTO doctors (hospital_id, department_id, name, specialization, qualification, phone, email, experience, consultation_fee) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            doctor
          );
        } catch (err) {
          if (!err.message.includes('Duplicate entry')) {
            console.error(`Error inserting doctor: ${err.message}`);
          }
        }
      }
      console.log('✅ Doctors inserted\n');
    } else {
      console.log('✅ Doctors already exist\n');
    }

    // Insert medicines
    const [existingMeds] = await conn.query('SELECT COUNT(*) as count FROM medicines WHERE hospital_id = ?', [hospitalId]);
    if (existingMeds[0].count < 10) {
      console.log('📝 Inserting medicines...');
      const medicines = [
        [hospitalId, 'Paracetamol 500mg', 'Paracetamol', 'Cipla', 'BATCH001', '2025-12-31', 500, 5.00, 100],
        [hospitalId, 'Amoxicillin 250mg', 'Amoxicillin', 'Sun Pharma', 'BATCH002', '2025-11-30', 300, 15.00, 50],
        [hospitalId, 'Ibuprofen 400mg', 'Ibuprofen', 'Dr. Reddy', 'BATCH003', '2025-10-31', 400, 8.00, 80],
        [hospitalId, 'Metformin 500mg', 'Metformin', 'Lupin', 'BATCH004', '2026-01-31', 600, 12.00, 100],
        [hospitalId, 'Atorvastatin 10mg', 'Atorvastatin', 'Ranbaxy', 'BATCH005', '2025-09-30', 250, 20.00, 50],
        [hospitalId, 'Omeprazole 20mg', 'Omeprazole', 'Torrent', 'BATCH006', '2025-08-31', 350, 10.00, 70],
        [hospitalId, 'Cetirizine 10mg', 'Cetirizine', 'Zydus', 'BATCH007', '2026-02-28', 450, 6.00, 90],
        [hospitalId, 'Azithromycin 500mg', 'Azithromycin', 'Alkem', 'BATCH008', '2025-07-31', 200, 25.00, 40],
        [hospitalId, 'Losartan 50mg', 'Losartan', 'Mankind', 'BATCH009', '2026-03-31', 300, 18.00, 60],
        [hospitalId, 'Aspirin 75mg', 'Aspirin', 'Bayer', 'BATCH010', '2025-12-31', 550, 4.00, 100]
      ];

      for (const med of medicines) {
        try {
          await conn.query(
            'INSERT INTO medicines (hospital_id, name, generic_name, manufacturer, batch_no, expiry_date, quantity, price, reorder_level) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            med
          );
        } catch (err) {
          if (!err.message.includes('Duplicate entry')) {
            console.error(`Error inserting medicine: ${err.message}`);
          }
        }
      }
      console.log('✅ Medicines inserted\n');
    } else {
      console.log('✅ Medicines already exist\n');
    }

    // Insert lab tests
    const [existingTests] = await conn.query('SELECT COUNT(*) as count FROM lab_tests WHERE hospital_id = ?', [hospitalId]);
    if (existingTests[0].count < 10) {
      console.log('📝 Inserting lab tests...');
      const tests = [
        [hospitalId, 'Complete Blood Count', 'CBC', 500.00, 'WBC: 4000-11000, RBC: 4.5-5.5'],
        [hospitalId, 'Blood Sugar Fasting', 'BSF', 200.00, '70-100 mg/dL'],
        [hospitalId, 'Lipid Profile', 'LIPID', 800.00, 'Total Cholesterol < 200 mg/dL'],
        [hospitalId, 'Liver Function Test', 'LFT', 600.00, 'ALT: 7-56 U/L, AST: 10-40 U/L'],
        [hospitalId, 'Kidney Function Test', 'KFT', 650.00, 'Creatinine: 0.7-1.3 mg/dL'],
        [hospitalId, 'Thyroid Profile', 'THYROID', 700.00, 'TSH: 0.4-4.0 mIU/L'],
        [hospitalId, 'Urine Routine', 'URINE', 300.00, 'pH: 4.5-8.0'],
        [hospitalId, 'ECG', 'ECG', 400.00, 'Heart Rate: 60-100 bpm'],
        [hospitalId, 'X-Ray Chest', 'XRAY', 500.00, 'Normal lung fields'],
        [hospitalId, 'Ultrasound Abdomen', 'USG', 1200.00, 'Normal organs']
      ];

      for (const test of tests) {
        try {
          await conn.query(
            'INSERT INTO lab_tests (hospital_id, test_name, test_code, price, normal_range) VALUES (?, ?, ?, ?, ?)',
            test
          );
        } catch (err) {
          if (!err.message.includes('Duplicate entry')) {
            console.error(`Error inserting lab test: ${err.message}`);
          }
        }
      }
      console.log('✅ Lab tests inserted\n');
    } else {
      console.log('✅ Lab tests already exist\n');
    }

    // Insert inventory
    const [existingInv] = await conn.query('SELECT COUNT(*) as count FROM inventory WHERE hospital_id = ?', [hospitalId]);
    if (existingInv[0].count < 10) {
      console.log('📝 Inserting inventory items...');
      const inventory = [
        [hospitalId, 'Surgical Gloves', 'Medical Supplies', 1000, 'pairs', '2024-01-15'],
        [hospitalId, 'Syringes 5ml', 'Medical Supplies', 500, 'pieces', '2024-02-10'],
        [hospitalId, 'Bandages', 'Medical Supplies', 200, 'rolls', '2024-01-20'],
        [hospitalId, 'Cotton Wool', 'Medical Supplies', 150, 'packets', '2024-03-05'],
        [hospitalId, 'Surgical Masks', 'PPE', 2000, 'pieces', '2024-01-10'],
        [hospitalId, 'Hand Sanitizer', 'Hygiene', 100, 'bottles', '2024-02-15'],
        [hospitalId, 'Thermometers', 'Equipment', 50, 'pieces', '2024-01-25'],
        [hospitalId, 'BP Monitors', 'Equipment', 30, 'pieces', '2024-03-01'],
        [hospitalId, 'Oxygen Cylinders', 'Equipment', 20, 'pieces', '2024-02-20'],
        [hospitalId, 'Wheelchairs', 'Equipment', 15, 'pieces', '2024-01-30']
      ];

      for (const item of inventory) {
        try {
          await conn.query(
            'INSERT INTO inventory (hospital_id, item_name, category, quantity, unit, purchase_date) VALUES (?, ?, ?, ?, ?, ?)',
            item
          );
        } catch (err) {
          console.error(`Error inserting inventory: ${err.message}`);
        }
      }
      console.log('✅ Inventory items inserted\n');
    } else {
      console.log('✅ Inventory already exists\n');
    }

    console.log('🎉 Data seeding completed successfully!\n');
    
    // Show summary
    const [patientCount] = await conn.query('SELECT COUNT(*) as count FROM patients WHERE hospital_id = ?', [hospitalId]);
    const [doctorCount] = await conn.query('SELECT COUNT(*) as count FROM doctors WHERE hospital_id = ?', [hospitalId]);
    const [deptCount] = await conn.query('SELECT COUNT(*) as count FROM departments WHERE hospital_id = ?', [hospitalId]);
    const [medCount] = await conn.query('SELECT COUNT(*) as count FROM medicines WHERE hospital_id = ?', [hospitalId]);
    const [testCount] = await conn.query('SELECT COUNT(*) as count FROM lab_tests WHERE hospital_id = ?', [hospitalId]);
    const [invCount] = await conn.query('SELECT COUNT(*) as count FROM inventory WHERE hospital_id = ?', [hospitalId]);

    console.log('📊 Data Summary:');
    console.log(`   Patients: ${patientCount[0].count}`);
    console.log(`   Doctors: ${doctorCount[0].count}`);
    console.log(`   Departments: ${deptCount[0].count}`);
    console.log(`   Medicines: ${medCount[0].count}`);
    console.log(`   Lab Tests: ${testCount[0].count}`);
    console.log(`   Inventory Items: ${invCount[0].count}`);

    await conn.end();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

seedData();
