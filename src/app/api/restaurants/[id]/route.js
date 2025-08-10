import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

function isValidObjectId(id) {
  // ObjectId.isValid is a static method in mongodb driver
  return ObjectId.isValid(id) && (String)(new ObjectId(id)) === id;
}

export async function PUT(req, { params }) {
    try {
    const { id } = params;
    const body = await req.json();
    const { name, location, cuisine, tables, openingHours, image } = body;

    const collection = await dbConnect("restaurants");

    const updateResult = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name,
          location,
          cuisine: cuisine || null,
          tables: Number(tables),
          openingHours: openingHours || "",
          image: image || "",
          updatedAt: new Date(),
        }
      }
    );

    if (updateResult.matchedCount === 0) {
      return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("PUT /api/restaurants/:id error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req, { params }) {
 try {
    const { id } = params;

    // Connect to "restaurants" collection directly
    const collection = await dbConnect("restaurants");

    const restaurant = await collection.findOne({ _id: new ObjectId(id) });

    if (!restaurant) {
      return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
    }

    return NextResponse.json(restaurant);
  }  catch (err) {
  console.error("GET /api/restaurants/:id error:", err);
  console.error(err.stack);
  return NextResponse.json({ error: "Server error" }, { status: 500 });
}

}


export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    if (!isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const collection = await dbConnect("restaurants");
    const deleteResult = await collection.deleteOne({ _id: new ObjectId(id) });

    if (deleteResult.deletedCount === 0) {
      return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/restaurants/:id error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}