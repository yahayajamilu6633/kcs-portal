// app/api/login/route.js

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/utils/db";
import Student from "@/models/Students";  // Make sure file is Students.js
import Teacher from "@/models/Teachers";  // And Teachers.js

export async function POST(req) {
  try {
    await connectDB();

    const { name, password, role } = await req.json();

    if (!name || !password || !role) {
      return NextResponse.json(
        { error: "Please provide name, password and role" },
        { status: 400 }
      );
    }

    let user;

    // ============================
    // STUDENT LOGIN
    // ============================
    if (role === "student") {
      user = await Student.findOne({
        $or: [
          { firstName: name },
          { surname: name },
          { email: name }
        ],
      });

      if (!user) {
        return NextResponse.json(
          { error: "Invalid student name or password" },
          { status: 401 }
        );
      }

      // Ensure passwordHash exists to avoid bcrypt crash
      if (!user.passwordHash) {
        console.error("Student has NO passwordHash in DB:", user._id);
        return NextResponse.json(
          { error: "Account error: missing password. Contact admin." },
          { status: 500 }
        );
      }

      const isMatch = await bcrypt.compare(password, user.passwordHash);

      if (!isMatch) {
        return NextResponse.json(
          { error: "Invalid student name or password" },
          { status: 401 }
        );
      }
    }

    // ============================
    // TEACHER LOGIN
    // ============================
    else if (role === "teacher") {
      user = await Teacher.findOne({
        $or: [
          { firstName: name },
          { surname: name },
          { email: name }
        ],
      });

      if (!user) {
        return NextResponse.json(
          { error: "Invalid teacher name or password" },
          { status: 401 }
        );
      }

      if (!user.passwordHash) {
        console.error("Teacher has NO passwordHash in DB:", user._id);
        return NextResponse.json(
          { error: "Account error: missing password. Contact admin." },
          { status: 500 }
        );
      }

      const isMatch = await bcrypt.compare(password, user.passwordHash);

      if (!isMatch) {
        return NextResponse.json(
          { error: "Invalid teacher name or password" },
          { status: 401 }
        );
      }
    }

    // ============================
    // UNKNOWN ROLE
    // ============================
    else {
      return NextResponse.json(
        { error: "Invalid role" },
        { status: 400 }
      );
    }

    // Clean sensitive fields
    const safeUser = user.toObject();
    delete safeUser.passwordHash;

    return NextResponse.json(
      { message: "Login successful", user: safeUser },
      { status: 200 }
    );

  } catch (err) {
    console.error("Login Error:", err);
    return NextResponse.json(
      { error: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}
