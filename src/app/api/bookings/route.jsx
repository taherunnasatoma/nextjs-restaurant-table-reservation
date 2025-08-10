import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth/next"; // if using next-auth
import { authOptions } from "../auth/[...nextauth]/route";


export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { restaurantId, restaurantName, bookingDate } = body;

    if (!restaurantId || !restaurantName || !bookingDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const db = await dbConnect("bookings");

    const bookingData = {
      userEmail: session.user.email,
      restaurantId,
      restaurantName,
      bookingDate: new Date(bookingDate),
      createdAt: new Date(),
    };

    const result = await db.insertOne(bookingData);

    return NextResponse.json({ success: true, bookingId: result.insertedId });
  } catch (err) {
    console.error("POST /api/bookings error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
