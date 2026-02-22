const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Hospital = require('./models/Hospital');
const Department = require('./models/Department');

dotenv.config({ path: './.env' });

const departmentTypes = [
    {
        name: "Emergency",
        description: "Handles trauma, urgent care, and critical emergencies.",
        head: "Dr. Anil Sharma",
        contactNumber: "+977-1-4412345",
        services: ["Trauma Care", "24/7 Ambulance", "Emergency Surgery"]
    },
    {
        name: "Cardiology",
        description: "Specialized care for heart-related conditions.",
        head: "Dr. Sita Verma",
        contactNumber: "+977-1-4412346",
        services: ["ECG", "Echocardiography", "Stress Test"]
    },
    {
        name: "Radiology",
        description: "Advanced imaging and diagnostic services.",
        head: "Dr. Ram Prasad",
        contactNumber: "+977-1-4412347",
        services: ["MRI", "CT Scan", "X-Ray"]
    }
];

const seedDepartments = async () => {
    try {
        await mongoose.connect(process.env.DB_URI || 'mongodb://localhost:27017/medLink');
        console.log("Connected to MongoDB...");

        const hospitals = await Hospital.find();

        if (hospitals.length === 0) {
            console.log("No hospitals found. Run seedHospitals.js first.");
            process.exit();
        }

        console.log(`Found ${hospitals.length} hospitals. Seeding departments...`);

        // Clear existing departments to avoid duplicates if re-running
        await Department.deleteMany({});

        // Reset hospital departments arrays
        await Hospital.updateMany({}, { departments: [] });

        for (const hospital of hospitals) {
            // Seed 2 random departments for each hospital
            const selectedTypes = departmentTypes.sort(() => 0.5 - Math.random()).slice(0, 2);

            for (const type of selectedTypes) {
                const dept = new Department({
                    ...type,
                    name: `${type.name} - ${hospital.hospitalName}`,
                    hospital: hospital._id
                });
                await dept.save();

                hospital.departments.push(dept._id);
            }
            await hospital.save();
        }

        console.log("Departments successfully seeded and linked to hospitals!");
        process.exit();
    } catch (err) {
        console.error("Error seeding departments:", err);
        process.exit(1);
    }
};

seedDepartments();
