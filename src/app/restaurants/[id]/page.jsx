"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import Swal from "sweetalert2";

export default function RestaurantDetailsPage({ params }) {
  const { id } = params;
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchRestaurant() {
      const res = await fetch(`/api/restaurants/${id}`);
      if (res.ok) {
        const data = await res.json();
        setRestaurant(data);
      }
      setLoading(false);
    }
    fetchRestaurant();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!restaurant) return <p>Restaurant not found.</p>;

  function handleBooking() {
    if (!session) {
      signIn();
    } else {
      setModalOpen(true);
    }
  }

async function handleConfirmBooking() {
  try {
    // Example: use current date/time or add date picker input in modal
    const bookingDate = new Date().toISOString();

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        restaurantId: restaurant._id,
        restaurantName: restaurant.name,
        bookingDate,
      }),
    });

    if (!res.ok) throw new Error("Booking failed");

    setModalOpen(false);
    Swal.fire({
      icon: "success",
      title: "Booking Confirmed!",
      text: `Your table at ${restaurant.name} has been booked.`,
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message || "Booking failed.",
    });
  }
}


  return (
    <div className="max-w-3xl mx-auto p-6">
      {restaurant.image && (
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}
      <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
      <p className="text-gray-700 mb-1">Cuisine: {restaurant.cuisine || "N/A"}</p>
      <p className="text-gray-700 mb-1">Location: {restaurant.location}</p>
      <p className="text-gray-700 mb-1">Tables: {restaurant.tables}</p>
      <p className="text-gray-700 mb-4">Opening Hours: {restaurant.openingHours || "N/A"}</p>

      <button
        onClick={handleBooking}
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Book Table
      </button>

      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white p-6 rounded shadow-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Confirm Booking</h2>
            <p className="mb-2">Restaurant: {restaurant.name}</p>
            <p className="mb-2">Location: {restaurant.location}</p>
            <p className="mb-4">Cuisine: {restaurant.cuisine || "N/A"}</p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBooking}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
