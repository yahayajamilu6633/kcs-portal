import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import Students from "@/models/Students";

// GET single student
export async function GET(req, { params }) {
  await connectDB();
  const student = await Students.findById(params.id);
  return NextResponse.json(student);
}

// UPDATE (Approve / Reject)
export async function PATCH(req, { params }) {
  await connectDB();
  const body = await req.json();

  const student = await Student.findByIdAndUpdate(
    params.id,
    body,
    { new: true }
  );

  return NextResponse.json(student);
}

// DELETE (optional)
export async function DELETE(req, { params }) {
  await connectDB();
  await Student.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Student deleted" });
}
