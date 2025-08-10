// src/components/RestaurantTable.jsx
"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function RestaurantTable({ initialData }) {
  const [restaurants, setRestaurants] = useState(initialData);
  const [loadingId, setLoadingId] = useState(null);
  const [error, setError] = useState(null);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this restaurant?")) return;

    setLoadingId(id);
    setError(null);

    try {
      const res = await fetch(`/api/restaurants/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete restaurant");

      // Remove deleted restaurant from state to update UI
      setRestaurants(restaurants.filter(r => r._id !== id));
    } catch (err) {
      setError(err.message || "Error deleting restaurant");
    } finally {
      setLoadingId(null);
    }
  };

  if (restaurants.length === 0)
    return <p>No restaurants found.</p>;

  return (
    <>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
             <th className="border border-gray-300 px-4 py-2">Image</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Location</th>
            <th className="border border-gray-300 px-4 py-2">Cuisine</th>
            <th className="border border-gray-300 px-4 py-2">Tables</th>
            <th className="border border-gray-300 px-4 py-2">Opening Hours</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map(({ _id, name, location, cuisine, tables, openingHours ,image}) => (
            <tr key={_id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
          {image ? (
            <img
              src={image}
              alt={name}
              className="h-16 w-24 object-cover rounded"
            />
          ) : (
            <span className="text-gray-400">No image</span>
          )}
        </td>
              <td className="border border-gray-300 px-4 py-2">{name}</td>
              <td className="border border-gray-300 px-4 py-2">{location}</td>
              <td className="border border-gray-300 px-4 py-2">{cuisine || "-"}</td>
              <td className="border border-gray-300 px-4 py-2">{tables}</td>
              <td className="border border-gray-300 px-4 py-2">{openingHours || "-"}</td>
              <td className="border border-gray-300 px-4 py-2 space-x-2">
                <Link
                  href={`/dashboard/restaurants/edit/${_id}`}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </Link>
                <button
                  disabled={loadingId === _id}
                  onClick={() => handleDelete(_id)}
                  className={`px-2 py-1 text-white rounded hover:brightness-90 ${
                    loadingId === _id ? "bg-gray-400" : "bg-red-500"
                  }`}
                >
                  {loadingId === _id ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
