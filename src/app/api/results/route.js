import { connectDB } from "@/utils/db";
import mongoose from "mongoose";

export async function GET() {
  try {
    await connectDB();

    const db = mongoose.connection.db;
    const results = await db.collection("results").find({}).toArray();

    return new Response(JSON.stringify({ results }), { status: 200 });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const { studentId, subject, score } = await req.json();
    const db = mongoose.connection.db;

    // Calculate grade
    let grade = "F";
    if (score >= 70) grade = "A";
    else if (score >= 60) grade = "B";
    else if (score >= 50) grade = "C";
    else if (score >= 40) grade = "D";

    const result = await db.collection("results").insertOne({
      studentId,
      subject,
      score,
      grade,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ result }), { status: 201 });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}
