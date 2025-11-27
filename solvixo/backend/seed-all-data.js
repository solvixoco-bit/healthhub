const mysql = require('mysql2/promise');
require('dotenv').config();

async function seedAllData() {
  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'hospital_management'
    });

    console.log('🌱 Starting comprehensive data seeding...\n');

    // Get hospital ID
    const [hospitals] = await conn.query('SELECT id FROM hospitals LIMIT 1');
    if (hospitals.length === 0) {
      console.log('❌ No hospital found. Please run setup-complete.js first.');
      return;
    }
    const hospitalId = hospitals[0].id;
    console.log(`✅ Using hospital ID: ${hospitalId}\n`);

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await conn.query('DELETE FROM appointments WHERE hospital_id = ?', [hospitalId]);
    await conn.query('DELETE FROM lab_bookings WHERE hospital_id = ?', [hospitalId]);
    await conn.query('DELETE FROM billing WHERE hospital_id = ?', [hospitalId]);
    await conn.query('DELETE FROM emergency_cases WHERE hospital_id = ?', [hospitalId]);
    await conn.query('DELETE FROM beds WHERE hospital_id = ?', [hospitalId]);
    await conn.query('DELETE FROM wards WHERE hospital_id = ?', [hospitalId]);
    await conn.query('DELETE FROM doctors WHERE hospital_id = ?', [hospitalId]);
    await conn.query('DELETE FROM patients WHERE hospital_id = ?', [hospitalId]);
    await conn.query('DELETE FROM departments WHERE hospital_id = ?', [hospitalId]);
    await conn.query('DELETE FROM medicines WHERE hospital_id = ?', [hospitalId]);
    await conn.query('DELETE FROM lab_tests WHERE hospital_id = ?', [hospitalId]);
    await conn.query('DELETE FROM inventory WHERE hospital_id = ?', [hospitalId]);
    console.log('✅ Cleared existing data\n');

    // 1. DEPARTMENTS (15 entries)
    console.log('📝 Inserting 15 departments...');
    const departments = [
      [hospitalId, 'Cardiology', 'Heart and cardiovascular system'],
      [hospitalId, 'Neurology', 'Brain and nervous system'],
      [hospitalId, 'Orthopedics', 'Bones, joints and muscles'],
      [hospitalId, 'Pediatrics', 'Children healthcare'],
      [hospitalId, 'Gynecology', 'Women healthcare'],
      [hospitalId, 'Dermatology', 'Skin conditions'],
      [hospitalId, 'ENT', 'Ear, Nose, and Throat'],
      [hospitalId, 'Ophthalmology', 'Eye care'],
      [hospitalId, 'Psychiatry', 'Mental health'],
      [hospitalId, 'General Medicine', 'General healthcare'],
      [hospitalId, 'Radiology', 'Medical imaging'],
      [hospitalId, 'Anesthesiology', 'Anesthesia and pain management'],
      [hospitalId, 'Urology', 'Urinary system'],
      [hospitalId, 'Oncology', 'Cancer treatment'],
      [hospitalId, 'Emergency Medicine', 'Emergency care']
    ];
    for (const dept of departments) {
      await conn.query('INSERT INTO departments (hospital_id, name, description) VALUES (?, ?, ?)', dept);
    }
    const [depts] = await conn.query('SELECT id FROM departments WHERE hospital_id = ?', [hospitalId]);
    console.log(`✅ Inserted ${depts.length} departments\n`);

    // 2. PATIENTS (20 entries)
    console.log('📝 Inserting 20 patients...');
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
      [hospitalId, 'PAT010', 'Pooja Kapoor', 38, 'female', '9876543228', 'pooja.kapoor@email.com', '741 City Center, Lucknow', 'A+', '9876543229', 'Karan Kapoor', 'Allergy'],
      [hospitalId, 'PAT011', 'Karan Mehta', 52, 'male', '9876543230', 'karan.mehta@email.com', '852 Station Road, Surat', 'B+', '9876543231', 'Ritu Mehta', 'High BP'],
      [hospitalId, 'PAT012', 'Ritu Joshi', 27, 'female', '9876543232', 'ritu.joshi@email.com', '963 Mall Road, Chandigarh', 'O+', '9876543233', 'Nitin Joshi', 'None'],
      [hospitalId, 'PAT013', 'Nitin Agarwal', 48, 'male', '9876543234', 'nitin.agarwal@email.com', '159 Ring Road, Indore', 'A-', '9876543235', 'Sonia Agarwal', 'Diabetes'],
      [hospitalId, 'PAT014', 'Sonia Desai', 33, 'female', '9876543236', 'sonia.desai@email.com', '357 Civil Lines, Nagpur', 'AB+', '9876543237', 'Rahul Desai', 'Anemia'],
      [hospitalId, 'PAT015', 'Rahul Saxena', 41, 'male', '9876543238', 'rahul.saxena@email.com', '753 Sector 5, Noida', 'O-', '9876543239', 'Kavita Saxena', 'Cholesterol'],
      [hospitalId, 'PAT016', 'Kavita Bose', 36, 'female', '9876543240', 'kavita.bose@email.com', '951 Salt Lake, Kolkata', 'B-', '9876543241', 'Arjun Bose', 'Thyroid'],
      [hospitalId, 'PAT017', 'Arjun Nair', 44, 'male', '9876543242', 'arjun.nair@email.com', '246 Marine Drive, Kochi', 'A+', '9876543243', 'Meera Nair', 'Asthma'],
      [hospitalId, 'PAT018', 'Meera Pillai', 31, 'female', '9876543244', 'meera.pillai@email.com', '468 Beach Road, Vizag', 'O+', '9876543245', 'Deepak Pillai', 'None'],
      [hospitalId, 'PAT019', 'Deepak Rao', 54, 'male', '9876543246', 'deepak.rao@email.com', '579 IT Park, Pune', 'AB-', '9876543247', 'Sneha Rao', 'Heart Disease'],
      [hospitalId, 'PAT020', 'Sneha Kulkarni', 39, 'female', '9876543248', 'sneha.kulkarni@email.com', '680 Camp Area, Pune', 'B+', '9876543249', 'Anil Kulkarni', 'Migraine']
    ];
    for (const patient of patients) {
      await conn.query('INSERT INTO patients (hospital_id, patient_id, name, age, gender, phone, email, address, blood_group, emergency_contact, emergency_contact_name, medical_history) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', patient);
    }
    const [pts] = await conn.query('SELECT id FROM patients WHERE hospital_id = ?', [hospitalId]);
    console.log(`✅ Inserted ${pts.length} patients\n`);

    // 3. DOCTORS (15 entries)
    console.log('📝 Inserting 15 doctors...');
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
      [hospitalId, depts[9]?.id, 'Dr. Nisha Patel', 'General Physician', 'MBBS, MD Medicine', '9123456789', 'nisha.patel@hospital.com', 16, 600.00],
      [hospitalId, depts[10]?.id, 'Dr. Vikram Malhotra', 'Radiologist', 'MBBS, MD Radiology', '9123456790', 'vikram.malhotra@hospital.com', 10, 1000.00],
      [hospitalId, depts[11]?.id, 'Dr. Anjali Kapoor', 'Anesthesiologist', 'MBBS, MD Anesthesia', '9123456791', 'anjali.kapoor@hospital.com', 9, 950.00],
      [hospitalId, depts[12]?.id, 'Dr. Suresh Iyer', 'Urologist', 'MBBS, MCh Urology', '9123456792', 'suresh.iyer@hospital.com', 11, 1100.00],
      [hospitalId, depts[13]?.id, 'Dr. Pooja Verma', 'Oncologist', 'MBBS, DM Oncology', '9123456793', 'pooja.verma@hospital.com', 14, 1600.00],
      [hospitalId, depts[14]?.id, 'Dr. Karan Gupta', 'Emergency Physician', 'MBBS, MD Emergency', '9123456794', 'karan.gupta@hospital.com', 8, 800.00]
    ];
    for (const doctor of doctors) {
      await conn.query('INSERT INTO doctors (hospital_id, department_id, name, specialization, qualification, phone, email, experience, consultation_fee) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', doctor);
    }
    const [docs] = await conn.query('SELECT id FROM doctors WHERE hospital_id = ?', [hospitalId]);
    console.log(`✅ Inserted ${docs.length} doctors\n`);

    // 4. MEDICINES (20 entries)
    console.log('📝 Inserting 20 medicines...');
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
      [hospitalId, 'Aspirin 75mg', 'Aspirin', 'Bayer', 'BATCH010', '2025-12-31', 550, 4.00, 100],
      [hospitalId, 'Ciprofloxacin 500mg', 'Ciprofloxacin', 'Cipla', 'BATCH011', '2026-01-15', 280, 22.00, 50],
      [hospitalId, 'Diclofenac 50mg', 'Diclofenac', 'Sun Pharma', 'BATCH012', '2025-11-20', 320, 9.00, 70],
      [hospitalId, 'Ranitidine 150mg', 'Ranitidine', 'Dr. Reddy', 'BATCH013', '2026-02-10', 400, 7.00, 80],
      [hospitalId, 'Amlodipine 5mg', 'Amlodipine', 'Lupin', 'BATCH014', '2025-10-25', 350, 11.00, 60],
      [hospitalId, 'Levothyroxine 50mcg', 'Levothyroxine', 'Abbott', 'BATCH015', '2026-03-15', 500, 14.00, 90],
      [hospitalId, 'Pantoprazole 40mg', 'Pantoprazole', 'Torrent', 'BATCH016', '2025-12-20', 380, 13.00, 70],
      [hospitalId, 'Montelukast 10mg', 'Montelukast', 'Zydus', 'BATCH017', '2026-01-25', 270, 16.00, 50],
      [hospitalId, 'Clopidogrel 75mg', 'Clopidogrel', 'Alkem', 'BATCH018', '2025-11-15', 220, 19.00, 40],
      [hospitalId, 'Gabapentin 300mg', 'Gabapentin', 'Mankind', 'BATCH019', '2026-02-20', 310, 17.00, 60],
      [hospitalId, 'Tramadol 50mg', 'Tramadol', 'Ranbaxy', 'BATCH020', '2025-12-10', 180, 21.00, 30]
    ];
    for (const med of medicines) {
      await conn.query('INSERT INTO medicines (hospital_id, name, generic_name, manufacturer, batch_no, expiry_date, quantity, price, reorder_level) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', med);
    }
    const [meds] = await conn.query('SELECT id FROM medicines WHERE hospital_id = ?', [hospitalId]);
    console.log(`✅ Inserted ${meds.length} medicines\n`);

    // 5. LAB TESTS (15 entries)
    console.log('📝 Inserting 15 lab tests...');
    const labTests = [
      [hospitalId, 'Complete Blood Count', 'CBC', 500.00, 'WBC: 4000-11000, RBC: 4.5-5.5'],
      [hospitalId, 'Blood Sugar Fasting', 'BSF', 200.00, '70-100 mg/dL'],
      [hospitalId, 'Lipid Profile', 'LIPID', 800.00, 'Total Cholesterol < 200 mg/dL'],
      [hospitalId, 'Liver Function Test', 'LFT', 600.00, 'ALT: 7-56 U/L, AST: 10-40 U/L'],
      [hospitalId, 'Kidney Function Test', 'KFT', 650.00, 'Creatinine: 0.7-1.3 mg/dL'],
      [hospitalId, 'Thyroid Profile', 'THYROID', 700.00, 'TSH: 0.4-4.0 mIU/L'],
      [hospitalId, 'Urine Routine', 'URINE', 300.00, 'pH: 4.5-8.0'],
      [hospitalId, 'ECG', 'ECG', 400.00, 'Heart Rate: 60-100 bpm'],
      [hospitalId, 'X-Ray Chest', 'XRAY', 500.00, 'Normal lung fields'],
      [hospitalId, 'Ultrasound Abdomen', 'USG', 1200.00, 'Normal organs'],
      [hospitalId, 'HbA1c Test', 'HBA1C', 550.00, '< 5.7%'],
      [hospitalId, 'Vitamin D Test', 'VITD', 900.00, '30-100 ng/mL'],
      [hospitalId, 'Vitamin B12 Test', 'VITB12', 850.00, '200-900 pg/mL'],
      [hospitalId, 'CT Scan Head', 'CT', 3500.00, 'Normal brain structure'],
      [hospitalId, 'MRI Spine', 'MRI', 5000.00, 'Normal spinal cord']
    ];
    for (const test of labTests) {
      await conn.query('INSERT INTO lab_tests (hospital_id, test_name, test_code, price, normal_range) VALUES (?, ?, ?, ?, ?)', test);
    }
    const [tests] = await conn.query('SELECT id FROM lab_tests WHERE hospital_id = ?', [hospitalId]);
    console.log(`✅ Inserted ${tests.length} lab tests\n`);

    // 6. INVENTORY (15 entries)
    console.log('📝 Inserting 15 inventory items...');
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
      [hospitalId, 'Wheelchairs', 'Equipment', 15, 'pieces', '2024-01-30'],
      [hospitalId, 'IV Stands', 'Equipment', 40, 'pieces', '2024-02-05'],
      [hospitalId, 'Stethoscopes', 'Equipment', 25, 'pieces', '2024-01-18'],
      [hospitalId, 'Pulse Oximeters', 'Equipment', 35, 'pieces', '2024-02-25'],
      [hospitalId, 'Nebulizers', 'Equipment', 18, 'pieces', '2024-03-10'],
      [hospitalId, 'Stretchers', 'Equipment', 12, 'pieces', '2024-01-22']
    ];
    for (const item of inventory) {
      await conn.query('INSERT INTO inventory (hospital_id, item_name, category, quantity, unit, purchase_date) VALUES (?, ?, ?, ?, ?, ?)', item);
    }
    const [inv] = await conn.query('SELECT id FROM inventory WHERE hospital_id = ?', [hospitalId]);
    console.log(`✅ Inserted ${inv.length} inventory items\n`);

    // 7. WARDS (10 entries)
    console.log('📝 Inserting 10 wards...');
    const wards = [
      [hospitalId, 'General Ward A', 'general', 20],
      [hospitalId, 'General Ward B', 'general', 20],
      [hospitalId, 'ICU Ward', 'icu', 10],
      [hospitalId, 'Private Ward 1', 'private', 5],
      [hospitalId, 'Private Ward 2', 'private', 5],
      [hospitalId, 'Semi-Private Ward', 'semi-private', 10],
      [hospitalId, 'Pediatric Ward', 'general', 15],
      [hospitalId, 'Maternity Ward', 'general', 12],
      [hospitalId, 'Emergency Ward', 'general', 8],
      [hospitalId, 'Post-Op Ward', 'semi-private', 10]
    ];
    for (const ward of wards) {
      await conn.query('INSERT INTO wards (hospital_id, name, ward_type, total_beds) VALUES (?, ?, ?, ?)', ward);
    }
    const [wardsData] = await conn.query('SELECT id FROM wards WHERE hospital_id = ?', [hospitalId]);
    console.log(`✅ Inserted ${wardsData.length} wards\n`);

    // 8. BEDS (50 entries across wards)
    console.log('📝 Inserting 50 beds...');
    let bedCount = 0;
    for (let i = 0; i < wardsData.length; i++) {
      const wardId = wardsData[i].id;
      const bedsInWard = wards[i][3]; // total_beds from wards array
      for (let j = 1; j <= bedsInWard && bedCount < 50; j++) {
        const bedNumber = `W${i + 1}-B${j}`;
        const bedType = wards[i][2]; // ward_type
        const status = Math.random() > 0.3 ? 'available' : 'occupied';
        await conn.query('INSERT INTO beds (hospital_id, ward_id, bed_number, bed_type, status) VALUES (?, ?, ?, ?, ?)', 
          [hospitalId, wardId, bedNumber, bedType, status]);
        bedCount++;
      }
    }
    console.log(`✅ Inserted ${bedCount} beds\n`);

    // 9. APPOINTMENTS (20 entries)
    console.log('📝 Inserting 20 appointments...');
    const statuses = ['scheduled', 'completed', 'cancelled', 'rescheduled'];
    for (let i = 0; i < 20; i++) {
      const patientId = pts[i % pts.length].id;
      const doctorId = docs[i % docs.length].id;
      const daysOffset = Math.floor(Math.random() * 30) - 15; // -15 to +15 days
      const appointmentDate = new Date();
      appointmentDate.setDate(appointmentDate.getDate() + daysOffset);
      const hours = 9 + Math.floor(Math.random() * 8); // 9 AM to 5 PM
      const appointmentTime = `${hours.toString().padStart(2, '0')}:00:00`;
      const status = daysOffset < 0 ? statuses[Math.floor(Math.random() * 2) + 1] : statuses[0]; // Past: completed/cancelled, Future: scheduled
      const tokenNumber = i + 1;
      const reason = ['Regular checkup', 'Follow-up visit', 'New consultation', 'Emergency', 'Routine examination'][Math.floor(Math.random() * 5)];
      
      await conn.query(
        'INSERT INTO appointments (hospital_id, patient_id, doctor_id, appointment_date, appointment_time, token_number, reason, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [hospitalId, patientId, doctorId, appointmentDate.toISOString().split('T')[0], appointmentTime, tokenNumber, reason, status]
      );
    }
    const [appts] = await conn.query('SELECT id FROM appointments WHERE hospital_id = ?', [hospitalId]);
    console.log(`✅ Inserted ${appts.length} appointments\n`);

    // 10. LAB BOOKINGS (15 entries)
    console.log('📝 Inserting 15 lab bookings...');
    const labStatuses = ['pending', 'sample_collected', 'completed'];
    for (let i = 0; i < 15; i++) {
      const patientId = pts[i % pts.length].id;
      const testId = tests[i % tests.length].id;
      const doctorId = docs[i % docs.length].id;
      const status = labStatuses[Math.floor(Math.random() * labStatuses.length)];
      const resultValue = status === 'completed' ? 'Normal' : null;
      
      await conn.query(
        'INSERT INTO lab_bookings (hospital_id, patient_id, test_id, doctor_id, status, result_value) VALUES (?, ?, ?, ?, ?, ?)',
        [hospitalId, patientId, testId, doctorId, status, resultValue]
      );
    }
    const [labBookings] = await conn.query('SELECT id FROM lab_bookings WHERE hospital_id = ?', [hospitalId]);
    console.log(`✅ Inserted ${labBookings.length} lab bookings\n`);

    // 11. BILLING (15 entries)
    console.log('📝 Inserting 15 billing records...');
    const paymentMethods = ['cash', 'card', 'upi', 'insurance'];
    const paymentStatuses = ['paid', 'pending', 'partial'];
    for (let i = 0; i < 15; i++) {
      const patientId = pts[i % pts.length].id;
      const billNumber = `BILL${(1001 + i).toString()}`;
      const items = JSON.stringify([
        { name: 'Consultation Fee', quantity: 1, price: 600 },
        { name: 'Lab Test', quantity: 1, price: 500 },
        { name: 'Medicines', quantity: 3, price: 150 }
      ]);
      const totalAmount = 600 + 500 + 450;
      const discount = Math.floor(Math.random() * 100);
      const tax = (totalAmount - discount) * 0.05;
      const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
      const paymentStatus = paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)];
      
      await conn.query(
        'INSERT INTO billing (hospital_id, patient_id, bill_number, items, total_amount, discount, tax, payment_method, payment_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [hospitalId, patientId, billNumber, items, totalAmount, discount, tax, paymentMethod, paymentStatus]
      );
    }
    const [bills] = await conn.query('SELECT id FROM billing WHERE hospital_id = ?', [hospitalId]);
    console.log(`✅ Inserted ${bills.length} billing records\n`);

    // 12. EMERGENCY CASES (10 entries)
    console.log('📝 Inserting 10 emergency cases...');
    const severities = ['low', 'medium', 'high', 'critical'];
    const emergencyStatuses = ['active', 'admitted', 'discharged'];
    const complaints = [
      'Chest pain and breathing difficulty',
      'Severe headache and dizziness',
      'High fever and body ache',
      'Accident - minor injuries',
      'Abdominal pain',
      'Allergic reaction',
      'Fracture - left arm',
      'Severe vomiting',
      'Unconscious state',
      'Heart palpitations'
    ];
    
    for (let i = 0; i < 10; i++) {
      const patientId = pts[i % pts.length].id;
      const complaint = complaints[i];
      const severity = severities[Math.floor(Math.random() * severities.length)];
      const status = emergencyStatuses[Math.floor(Math.random() * emergencyStatuses.length)];
      const vitalSigns = JSON.stringify({
        bp: '120/80',
        pulse: 72 + Math.floor(Math.random() * 20),
        temperature: 98 + Math.random() * 2,
        oxygen: 95 + Math.floor(Math.random() * 5)
      });
      
      await conn.query(
        'INSERT INTO emergency_cases (hospital_id, patient_id, complaint, severity, vital_signs, status) VALUES (?, ?, ?, ?, ?, ?)',
        [hospitalId, patientId, complaint, severity, vitalSigns, status]
      );
    }
    const [emergencies] = await conn.query('SELECT id FROM emergency_cases WHERE hospital_id = ?', [hospitalId]);
    console.log(`✅ Inserted ${emergencies.length} emergency cases\n`);

    // Summary
    console.log('🎉 Data seeding completed successfully!\n');
    console.log('📊 Summary:');
    console.log(`   Departments: ${depts.length}`);
    console.log(`   Patients: ${pts.length}`);
    console.log(`   Doctors: ${docs.length}`);
    console.log(`   Medicines: ${meds.length}`);
    console.log(`   Lab Tests: ${tests.length}`);
    console.log(`   Inventory Items: ${inv.length}`);
    console.log(`   Wards: ${wardsData.length}`);
    console.log(`   Beds: ${bedCount}`);
    console.log(`   Appointments: ${appts.length}`);
    console.log(`   Lab Bookings: ${labBookings.length}`);
    console.log(`   Billing Records: ${bills.length}`);
    console.log(`   Emergency Cases: ${emergencies.length}\n`);

    await conn.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

seedAllData();
