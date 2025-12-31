import { connectDB } from "@/utils/db";
import mongoose from "mongoose";

export async function GET() {
  try {
    await connectDB();

    const db = mongoose.connection.db;
    const fees = await db.collection("fees").find({}).toArray();

    return new Response(JSON.stringify({ fees }), { status: 200 });
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

    const { studentId, total, paid } = await req.json();
    const db = mongoose.connection.db;

    const fee = await db.collection("fees").insertOne({
      studentId,
      total,
      paid: paid ?? false,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ fee }), { status: 201 });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}
