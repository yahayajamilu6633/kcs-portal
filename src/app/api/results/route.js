import clientPromise from "@/utils/db";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const results = await db.collection("results").find({}).toArray();

    return new Response(JSON.stringify({ results }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { studentId, subject, score } = await req.json();
    const client = await clientPromise;
    const db = client.db();

    // Calculate grade
    let grade = "F";
    if (score >= 70) grade = "A";
    else if (score >= 60) grade = "B";
    else if (score >= 50) grade = "C";
    else if (score >= 40) grade = "D";

    const result = await db.collection("results").insertOne({
      studentId,
      subject,
      score,
      grade,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ result }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
