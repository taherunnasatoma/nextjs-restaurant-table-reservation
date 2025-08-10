// src/app/api/restaurants/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";


// Create restaurant (protected)
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    // Basic validation
    const { name, location, cuisine, tables, openingHours, image } = body;
    if (!name || !location || !tables) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

   
   const collection = await dbConnect("restaurants");

    const payload = {
      name,
      location,
      cuisine: cuisine || null,
      tables: Number(tables),
      openingHours: openingHours || "",
      image: image || "", // a URL or empty
      createdBy: session.user?.email || null,
      createdAt: new Date(),
    };

    const result = await collection.insertOne(payload);
    return NextResponse.json({ success: true, id: result.insertedId }, { status: 201 });
  } catch (err) {
    console.error("POST /api/restaurants error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// List restaurants (public)
export async function GET() {
  try {
    const db = await dbConnect();
    const collection = db.collection("restaurants");
    const list = await collection.find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json(list);
  } catch (err) {
    console.error("GET /api/restaurants error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
