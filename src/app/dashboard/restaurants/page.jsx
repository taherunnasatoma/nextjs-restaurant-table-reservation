// src/app/dashboard/restaurants/page.jsx
import dbConnect from "@/lib/dbConnect";
import RestaurantTable from "@/components/RestaurantTable";
import Link from "next/link";

export default async function RestaurantsPage() {
  const collection = await dbConnect("restaurants");
  const restaurants = await collection.find({}).sort({ createdAt: -1 }).toArray();

  const restaurantList = restaurants.map(r => ({
    ...r,
    _id: r._id.toString(),
  }));

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Restaurants</h1>
        <Link href="/dashboard/restaurants/create" className="px-4 py-2 bg-yellow-400 rounded">
          Add
        </Link>
      </div>

      {/* Pass restaurantList as prop to client component */}
      <RestaurantTable initialData={restaurantList} />
    </div>
  );
}
