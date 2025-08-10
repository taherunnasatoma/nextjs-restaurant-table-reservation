// src/components/CreateRestaurantForm.jsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateRestaurantForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.target;
    const payload = {
      name: form.name.value.trim(),
      location: form.location.value.trim(),
      cuisine: form.cuisine.value.trim(),
      tables: form.tables.value,
      openingHours: form.openingHours.value.trim(),
      image: form.image.value.trim(), // for now we accept an image URL
    };

    // client-side minimal validation
    if (!payload.name || !payload.location || !payload.tables) {
      setError("Please provide name, location and number of tables.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/restaurants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to create restaurant");
      // success — redirect to restaurants list or dashboard
      router.push("/dashboard/restaurants");
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Add Restaurant</h2>

      {error && <div className="mb-4 text-sm text-red-600">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input name="name" className="mt-1 w-full p-2 border rounded" required />
        </div>

        <div>
          <label className="block text-sm font-medium">Location</label>
          <input name="location" className="mt-1 w-full p-2 border rounded" required />
        </div>

        <div>
          <label className="block text-sm font-medium">Cuisine</label>
          <input name="cuisine" className="mt-1 w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Number of tables</label>
          <input name="tables" type="number" min="1" className="mt-1 w-full p-2 border rounded" required />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium">Opening Hours</label>
          <input name="openingHours" className="mt-1 w-full p-2 border rounded" placeholder="e.g. 11:00 - 22:00" />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium">Image URL</label>
          <input name="image" className="mt-1 w-full p-2 border rounded" placeholder="https://..." />
         
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          className="px-5 py-2 rounded bg-[#f5f527] text-black font-semibold shadow hover:brightness-95"
          disabled={loading}
        >
          {loading ? "Saving..." : "Create Restaurant"}
        </button>

        <button type="button" onClick={() => router.back()} className="px-4 py-2 rounded border">
          Cancel
        </button>
      </div>
    </form>
  );
}
