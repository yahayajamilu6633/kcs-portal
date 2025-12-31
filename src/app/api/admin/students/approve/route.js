import Students from "@/models/Students";
import { connectDB } from "@/utils/db";
import { sendEmail } from "@/utils/mailer";
import { NextResponse } from "next/server";


export async function POST(req) {
  await connectDB();
  const { studentId, notifyGuardian } = await req.json();

  const student = await Students.findById(studentId);
  if (!student) {
    return NextResponse.json({ error: "Student not found" }, { status: 404 });
  }

  student.status = "approved";
  await student.save();

  // Decide who receives the email
  const recipients = [];
  if (student.email) recipients.push(student.email);
  if (notifyGuardian && student.guardianEmail)
    recipients.push(student.guardianEmail);

  await sendEmail({
    to: recipients.join(","),
    subject: "Admission Approved",
    html: `
      <h2>Congratulations!</h2>
      <p>${student.firstName} has been <strong>approved</strong>.</p>
      <p>Please contact the school for next steps.</p>
    `,
  });

  return NextResponse.json({ message: "Student approved and email sent" });
}
