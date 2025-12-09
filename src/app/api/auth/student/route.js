import clientPromise from "@/utils/db";
import bcrypt from "bcryptjs";

// POST /api/auth/student   -> login
// PUT  /api/auth/student   -> signup

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return Response.json({ error: "All fields required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("AB-Fashion-Design");

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

// SIGNUP
export async function PUT(req) {
  try {
    const { username, password, name } = await req.json();

    if (!username || !password || !name) {
      return Response.json({ error: "All fields required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("AB-Fashion-Design");

    const exists = await db.collection("students").findOne({ username });
    if (exists) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);

    const result = await db.collection("students").insertOne({
      username,
      password: hashed,
      name,
    });

    return Response.json(
      { message: "Student registered successfully" },
      { status: 201 }
    );
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
// GET /api/auth/student  -> fetch student profile
export async function GET(req) {
  try {
    const username = req.headers.get("x-username"); // or session/cookie later

    if (!username) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("AB-Fashion-Design");

    const student = await db.collection("students").findOne(
      { username },
      {
        projection: {
          password: 0,
        },
      }
    );

    if (!student) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json({ user: student }, { status: 200 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
