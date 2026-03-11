import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

// MedicalInfrastructure Model (inline representation for minimal script dependencies, 
// or I can import it directly)
import MedicalInfrastructure from "./src/models/medicalInfrastructure.js";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/medlinkdb";

// Kathmandu Bounding Box
const KATHMANDU_BOUNDS = {
    minLat: 27.67,
    maxLat: 27.75,
    minLng: 85.28,
    maxLng: 85.35,
};

function getRandomCoordinate(min, max) {
    return Math.random() * (max - min) + min;
}

async function fixCoordinates() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB.");

        const docs = await MedicalInfrastructure.find({});
        console.log(`Found ${docs.length} documents. Updating coordinates...`);

        let updatedCount = 0;

        for (const doc of docs) {
            const randomLng = getRandomCoordinate(KATHMANDU_BOUNDS.minLng, KATHMANDU_BOUNDS.maxLng);
            const randomLat = getRandomCoordinate(KATHMANDU_BOUNDS.minLat, KATHMANDU_BOUNDS.maxLat);

            doc.location = {
                type: "Point",
                coordinates: [randomLng, randomLat], // GeoJSON expects [longitude, latitude]
            };

            await doc.save();
            updatedCount++;
        }

        console.log(`Successfully updated ${updatedCount} documents to be in Kathmandu only.`);
        process.exit(0);
    } catch (err) {
        console.error("Error updating coordinates:", err);
        process.exit(1);
    }
}

fixCoordinates();
