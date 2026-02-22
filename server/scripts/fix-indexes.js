import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGO_URI || "mongodb://localhost:27017/medlink";

async function fixIndexes() {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");

    const collection = mongoose.connection.db.collection("users");

    const indexes = await collection.indexes();
    console.log("Current indexes:", JSON.stringify(indexes, null, 2));

    // Valid fields in our schema
    const validFields = ["_id", "phone"];

    // Drop any extra unique indexes that don't match our schema
    for (const idx of indexes) {
        const keys = Object.keys(idx.key || {});
        const isStale = keys.some(k => !validFields.includes(k));
        if (isStale) {
            console.log(`Dropping stale index: ${idx.name} (keys: ${keys.join(", ")})`);
            try {
                await collection.dropIndex(idx.name);
                console.log(`Dropped: ${idx.name}`);
            } catch (e) {
                console.log(`Could not drop ${idx.name}: ${e.message}`);
            }
        }
    }

    console.log("\nFinal indexes:");
    const updatedIndexes = await collection.indexes();
    console.log(JSON.stringify(updatedIndexes, null, 2));

    await mongoose.disconnect();
    process.exit(0);
}

fixIndexes().catch((err) => {
    console.error("Error:", err);
    process.exit(1);
});
