import Link from "next/link";
import dbConnect from "@/lib/dbConnect";

export default async function BrowseRestaurant() {
  const collection = await dbConnect("restaurants");
  const restaurants = await collection.find({}).sort({ createdAt: -1 }).toArray();

  const restaurantList = restaurants.map(r => ({
    ...r,
    _id: r._id.toString(),
  }));

  return (
    <main className="p-6">
      {/* Header / Title */}
      <h1 className="text-3xl text-center font-bold mb-6">Browse Restaurants</h1>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {restaurantList.map(({ _id, name, image, cuisine, location }) => (
          <Link
            key={_id}
            href={`/restaurants/${_id}`}
            className="border rounded shadow hover:shadow-lg transition p-4 flex flex-col"
          >
            {image ? (
              <img src={image} alt={name} className="h-48 w-full object-cover rounded mb-4" />
            ) : (
              <div className="h-48 w-full bg-gray-200 flex items-center justify-center rounded mb-4">
                No Image
              </div>
            )}
            <h2 className="text-xl font-semibold">{name}</h2>
            <p className="text-gray-600">{cuisine || "Cuisine not specified"}</p>
            <p className="text-gray-500 text-sm">{location}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
