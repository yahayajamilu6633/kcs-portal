import clientPromise from "@/utils/db";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const fees = await db.collection("fees").find({}).toArray();

    return new Response(JSON.stringify({ fees }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { studentId, total, paid } = await req.json();
    const client = await clientPromise;
    const db = client.db();

    const fee = await db.collection("fees").insertOne({
      studentId,
      total,
      paid: paid || false,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ fee }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
