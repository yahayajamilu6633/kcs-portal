import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import Teachers from "@/models/Teachers";

// GET single teacher
export async function GET(req, { params }) {
  await connectDB();
  const teacher = await Teachers.findById(params.id);
  return NextResponse.json(teacher);
}

// UPDATE (Approve / Reject)
export async function PATCH(req, { params }) {
  await connectDB();
  const body = await req.json();

  const teacher = await Teacher.findByIdAndUpdate(
    params.id,
    body,
    { new: true }
  );

  return NextResponse.json(teacher);
}

// DELETE (optional)
export async function DELETE(req, { params }) {
  await connectDB();
  await Teacher.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Teacher deleted" });
}
