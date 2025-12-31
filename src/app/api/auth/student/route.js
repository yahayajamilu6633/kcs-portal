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
    const student = await db.collection("students").findOne({ username });

    if (!student) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const match = await bcrypt.compare(password, student.password);
    if (!match) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }

    delete student.password;
    return Response.json({ user: student }, { status: 200 });
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
    const exists = await db.collection("students").findOne({ username });
    if (exists) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);
    await db.collection("students").insertOne({
      username,
      password: hashed,
      name,
      createdAt: new Date(),
    });

    return Response.json(
      { message: "Student registered successfully" },
      { status: 201 }
    );
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

// GET -> profile
export async function GET(req) {
  try {
    await connectDB();

    const username = req.headers.get("x-username");
    if (!username) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = mongoose.connection.db;
    const student = await db.collection("students").findOne(
      { username },
      { projection: { password: 0 } }
    );

    if (!student) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json({ user: student }, { status: 200 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
