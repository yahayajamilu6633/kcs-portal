import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
 throw new Error("❌ Please define MONGODB_URL in your .env file");

}

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;
  try {
    const db = await mongoose.connect(MONGODB_URL);
    isConnected = db.connections[0].readyState;
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
}
