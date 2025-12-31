import { connectDB } from "@/utils/db";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// POST -> login
export async function POST(req) {
  try {
    await connectDB();

    const { username, password } = await req.json();
    if (!username || !password) {
      return Response.json({ error: "All fields required" }, { status: 400 });
    }

    const db = mongoose.connection.db;
    const teacher = await db.collection("teachers").findOne({ username });

    if (!teacher) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const match = await bcrypt.compare(password, teacher.password);
    if (!match) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }

    delete teacher.password;
    return Response.json({ user: teacher }, { status: 200 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

// PUT -> signup
export async function PUT(req) {
  try {
    await connectDB();

    const { username, password, name } = await req.json();
    if (!username || !password || !name) {
      return Response.json({ error: "All fields required" }, { status: 400 });
    }

    const db = mongoose.connection.db;
    const exists = await db.collection("teachers").findOne({ username });
    if (exists) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);
    await db.collection("teachers").insertOne({
      username,
      password: hashed,
      name,
      createdAt: new Date(),
    });

    return Response.json(
      { message: "Teacher registered successfully" },
      { status: 201 }
    );
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
