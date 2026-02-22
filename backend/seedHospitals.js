const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Hospital = require('./models/Hospital');

dotenv.config({ path: './.env' });

const hospitals = [
    {
        hospitalName: "Tribhuvan University Teaching Hospital (TUTH)",
        location: { type: "Point", coordinates: [85.3303, 27.7351] },
        address: { street: "Maharajgunj", city: "Kathmandu" },
        status: "Operational"
    },
    {
        hospitalName: "Bir Hospital",
        location: { type: "Point", coordinates: [85.3123, 27.7061] },
        address: { street: "Mahabihar", city: "Kathmandu" },
        status: "Operational"
    },
    {
        hospitalName: "Kanti Children's Hospital",
        location: { type: "Point", coordinates: [85.3315, 27.7365] },
        address: { street: "Maharajgunj", city: "Kathmandu" },
        status: "Operational"
    },
    {
        hospitalName: "Norvic International Hospital",
        location: { type: "Point", coordinates: [85.3185, 27.6945] },
        address: { street: "Thapathali", city: "Kathmandu" },
        status: "Operational"
    },
    {
        hospitalName: "Grande International Hospital",
        location: { type: "Point", coordinates: [85.3255, 27.7535] },
        address: { street: "Dhapasi", city: "Kathmandu" },
        status: "Operational"
    },
    {
        hospitalName: "Nepal Mediciti Hospital",
        location: { type: "Point", coordinates: [85.3015, 27.6685] },
        address: { street: "Nakkhu", city: "Lalitpur" },
        status: "Operational"
    },
    {
        hospitalName: "Patas Institute of Health Sciences",
        location: { type: "Point", coordinates: [85.3165, 27.6745] },
        address: { street: "Lagankhel", city: "Lalitpur" },
        status: "Operational"
    },
    {
        hospitalName: "Om Hospital & Research Centre",
        location: { type: "Point", coordinates: [85.3455, 27.7215] },
        address: { street: "Chabahil", city: "Kathmandu" },
        status: "Operational"
    },
    {
        hospitalName: "HAMS Hospital",
        location: { type: "Point", coordinates: [85.3405, 27.7385] },
        address: { street: "Dhumbarahi", city: "Kathmandu" },
        status: "Operational"
    },
    {
        hospitalName: "Nepal Medical College",
        location: { type: "Point", coordinates: [85.3855, 27.7245] },
        address: { street: "Attarkhel", city: "Kathmandu" },
        status: "Operational"
    },
    {
        hospitalName: "Sahid Gangalal National Heart Center",
        location: { type: "Point", coordinates: [85.3485, 27.7365] },
        address: { street: "Bansbari", city: "Kathmandu" },
        status: "Operational"
    },
    {
        hospitalName: "Civil Service Hospital",
        location: { type: "Point", coordinates: [85.3395, 27.6885] },
        address: { street: "Minbhawan", city: "Kathmandu" },
        status: "Operational"
    },
    {
        hospitalName: "Vayodha Hospitals",
        location: { type: "Point", coordinates: [85.2865, 27.6835] },
        address: { street: "Balkhu", city: "Kathmandu" },
        status: "Operational"
    },
    {
        hospitalName: "Star Hospital",
        location: { type: "Point", coordinates: [85.3035, 27.6775] },
        address: { street: "Sanepa", city: "Lalitpur" },
        status: "Operational"
    },
    {
        hospitalName: "Manmohan Memorial Community Hospital",
        location: { type: "Point", coordinates: [85.2955, 27.7125] },
        address: { street: "Pharping", city: "Kathmandu" },
        status: "Operational"
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI || 'mongodb://localhost:27017/medLink');
        console.log("Connected to MongoDB...");

        // Clear existing data (optional, but good for a clean seed)
        // await Hospital.deleteMany({});

        await Hospital.insertMany(hospitals);
        console.log("15 Hospitals successfully seeded!");

        process.exit();
    } catch (err) {
        console.error("Error seeding database:", err);
        process.exit(1);
    }
};

seedDB();
