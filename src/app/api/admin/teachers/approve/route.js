import Teachers from "@/models/Teachers";
import { connectDB } from "@/utils/db";
import { sendEmail } from "@/utils/mailer";
import { NextResponse } from "next/server";

// import { sendSMS } from "@/lib/sms"; // optional

export async function POST(req) {
  await connectDB();
  const { teacherId } = await req.json();

  const teacher = await Teachers.findById(teacherId);
  if (!teacher) {
    return NextResponse.json({ error: "Teacher not found" }, { status: 404 });
  }

  teacher.status = "approved";
  await teacher.save();

  // 📧 Email notification
  await sendEmail({
    to: teacher.email,
    subject: "Teaching Application Approved",
    html: `
      <h2>Congratulations ${teacher.firstName}!</h2>
      <p>Your teaching application has been <strong>approved</strong>.</p>
      <p>Please report to the school management for onboarding.</p>
    `,
  });

  // 📩 SMS (optional)
  /*
  if (teacher.phoneNumber) {
    await sendSMS(
      teacher.phoneNumber,
      "Congratulations! Your teaching application has been approved."
    );
  }
  */

  return NextResponse.json({
    message: "Teacher approved and notified",
  });
}
