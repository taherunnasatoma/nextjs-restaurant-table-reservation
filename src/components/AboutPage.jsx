"use client";

import { useState } from "react";

export default function AboutPage() {
  const [showMore, setShowMore] = useState(false);

  return (
    <main id='about' className=" p-6">
      <section className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Left side - Image */}
        <div className="md:w-1/2">
          <img
            src="/assets/about.jpg"
            alt="Restaurant interior"
            className="rounded-lg shadow-lg w-full object-cover max-h-96"
          />
        </div>

        {/* Right side - About info */}
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold mb-4">About Our Restaurant</h1>
          <p className="text-gray-700 mb-4">
            Welcome to DineReserve, where we connect food lovers with the best dining experiences. Our mission is to simplify your table bookings and make dining joyful.
          </p>

          {/* Conditionally shown extended info */}
          {showMore && (
            <div className="text-gray-600 mb-4">
              <p>
                Founded in 2024, we bring together technology and passion for great food. Our platform offers real-time availability, menu previews, and personalized recommendations to enhance your dining experience.
              </p>
              <p className="mt-2">
                Whether you're planning a romantic dinner, a family gathering, or a business lunch, DineReserve helps you find the perfect spot with ease and confidence.
              </p>
            </div>
          )}

          <button
            onClick={() => setShowMore(!showMore)}
            className="px-6 py-2 bg-[#f7ff5d] hover:bg-yellow-500 rounded font-semibold transition"
          >
            {showMore ? "Show Less" : "More"}
          </button>
        </div>
      </section>
    </main>
  );
}
