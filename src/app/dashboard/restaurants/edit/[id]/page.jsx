

'use client'

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditRestaurantPage() {
  const router = useRouter();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    location: "",
    cuisine: "",
    tables: "",
    openingHours: "",
    image: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch restaurant data on mount
  useEffect(() => {
    async function fetchRestaurant() {
      try {
        const res = await fetch(`/api/restaurants/${id}`);
        if (!res.ok) throw new Error("Failed to fetch restaurant");
        const data = await res.json();
        setForm({
          name: data.name || "",
          location: data.location || "",
          cuisine: data.cuisine || "",
          tables: data.tables?.toString() || "",
          openingHours: data.openingHours || "",
          image: data.image || "",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchRestaurant();
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(`/api/restaurants/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tables: Number(form.tables),
        }),
      });

      if (!res.ok) throw new Error("Failed to update restaurant");

      // Redirect back to restaurant list or dashboard
      router.push("/dashboard/restaurants");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4 p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Restaurant</h2>

      <div>
        <label>Name</label>
        <input
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label>Location</label>
        <input
          name="location"
          type="text"
          value={form.location}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label>Cuisine</label>
        <input
          name="cuisine"
          type="text"
          value={form.cuisine}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label>Tables</label>
        <input
          name="tables"
          type="number"
          value={form.tables}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label>Opening Hours</label>
        <input
          name="openingHours"
          type="text"
          value={form.openingHours}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label>Image URL</label>
        <input
          name="image"
          type="url"
          value={form.image}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300"
      >
        Update Restaurant
      </button>
    </form>
  );
}
