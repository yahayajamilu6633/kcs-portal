import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/utils/db";
import Student from "@/models/Students";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const {
      firstName,
      surname,
      otherName,
      phoneNumber,
      email,
      address,
      state,
      lga,
      section,
      classLevel,
      password, // plain password from form
      guardianName,
      guardianSurname,
      guardianOtherName,
      guardianPhone,
      guardianEmail,
      guardianAddress,
      guardianState,
      guardianLga,
    } = body;

    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    // ------------------------------
    // HASH THE PASSWORD
    // ------------------------------
    const passwordHash = await bcrypt.hash(password, 10);

    const newStudent = new Student({
      firstName,
      surname,
      otherName,
      phoneNumber,
      email,
      address,
      state,
      lga,
      section,
      classLevel,
      passwordHash, // MUST be saved
      guardianName,
      guardianSurname,
      guardianOtherName,
      guardianPhone,
      guardianEmail,
      guardianAddress,
      guardianState,
      guardianLga,
    });

    await newStudent.save();

    return NextResponse.json(
      { message: "Student registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Student Registration Error:", error);
    return NextResponse.json(
      { error: "Server error. Try again later." },
      { status: 500 }
    );
  }
}
