import clientPromise from "@/utils/db";
import bcrypt from "bcryptjs";

// POST /api/auth/teacher   -> login
// PUT  /api/auth/teacher   -> signup

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return Response.json({ error: "All fields required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("AB-Fashion-Design");

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

// SIGNUP
export async function PUT(req) {
  try {
    const { username, password, name } = await req.json();

    if (!username || !password || !name) {
      return Response.json({ error: "All fields required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("AB-Fashion-Design");

    const exists = await db.collection("teachers").findOne({ username });
    if (exists) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);

    const result = await db.collection("teachers").insertOne({
      username,
      password: hashed,
      name,
    });

    return Response.json(
      { message: "Teacher registered successfully" },
      { status: 201 }
    );
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
