import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/user.js";
import MedicalInfrastructure from "./models/medicalInfrastructure.js";
import Booking from "./models/pickupdropup.js";

dotenv.config();

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");

  const users = await User.find().limit(3);
  const hospitals = await MedicalInfrastructure.find().limit(2);

  if (users.length === 0) {
    console.error("No users found in DB. Please add users first.");
    process.exit(1);
  }
  if (hospitals.length === 0) {
    console.error("No hospitals found in DB. Please add medical infrastructure first.");
    process.exit(1);
  }

  console.log(`Found ${users.length} users and ${hospitals.length} hospitals`);

  const requests = await Booking.insertMany([
    {
      user: users[0]._id,
      hospital: hospitals[0]._id,
      pickupLocation: {
        address: "123 Main St, New York, NY",
        coordinates: { type: "Point", coordinates: [-73.9654, 40.7829] },
      },
      dropLocation: {
        address: "City General Hospital, New York, NY",
        coordinates: { type: "Point", coordinates: [-73.9857, 40.7484] },
      },
      type: "Ambulance",
      status: "Pending",
      scheduledAt: new Date("2026-03-15T10:00:00Z"),
      estimatedCost: 150,
      notes: "Patient has chest pain, needs urgent care",
    },
    {
      user: users[Math.min(1, users.length - 1)]._id,
      hospital: hospitals[Math.min(1, hospitals.length - 1)]._id,
      pickupLocation: {
        address: "456 Oak Ave, Chicago, IL",
        coordinates: { type: "Point", coordinates: [-87.6501, 41.8500] },
      },
      dropLocation: {
        address: "Sunrise Medical Center, Chicago, IL",
        coordinates: { type: "Point", coordinates: [-87.6298, 41.8781] },
      },
      type: "Emergency",
      status: "Confirmed",
      scheduledAt: new Date("2026-03-16T14:30:00Z"),
      estimatedCost: 200,
      notes: "Accident victim, possible fracture",
    },
    {
      user: users[Math.min(2, users.length - 1)]._id,
      hospital: hospitals[0]._id,
      pickupLocation: {
        address: "789 Elm Rd, Brooklyn, NY",
        coordinates: { type: "Point", coordinates: [-74.0060, 40.7128] },
      },
      dropLocation: {
        address: "City General Hospital, New York, NY",
        coordinates: { type: "Point", coordinates: [-73.9857, 40.7484] },
      },
      type: "Ambulance",
      status: "In-Transit",
      scheduledAt: new Date("2026-03-14T08:00:00Z"),
      estimatedCost: 175,
      notes: "Elderly patient, requires oxygen support",
    },
    {
      user: users[0]._id,
      hospital: hospitals[Math.min(1, hospitals.length - 1)]._id,
      pickupLocation: {
        address: "321 Pine St, Chicago, IL",
        coordinates: { type: "Point", coordinates: [-87.6700, 41.8600] },
      },
      dropLocation: {
        address: "Sunrise Medical Center, Chicago, IL",
        coordinates: { type: "Point", coordinates: [-87.6298, 41.8781] },
      },
      type: "Ambulance",
      status: "Completed",
      scheduledAt: new Date("2026-03-10T09:00:00Z"),
      estimatedCost: 120,
      notes: "Routine transfer post-surgery",
    },
  ]);

  console.log(`Created ${requests.length} ambulance requests`);
  requests.forEach((r) => console.log(` - ${r._id} | ${r.type} | ${r.status}`));

  await mongoose.disconnect();
  console.log("Done.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
