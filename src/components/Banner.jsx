import React from 'react';
import Image from 'next/image';

export default function Banner() {
  return (
    <div className="relative w-full h-[700px]">
      {/* Background Image */}
      <Image
        src="/assets/banner.png" // image from public folder
        alt="Restaurant Banner"
        fill
        className="object-cover"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-opacity-40 flex items-center px-8 md:px-16">
        <div className="max-w-lg">
          {/* Heading */}
          <h1 className="text-black text-4xl md:text-5xl font-bold mb-4">
            Discover the Best Restaurants
          </h1>

          {/* Subtitle */}
          <p className="text-black text-lg md:text-xl mb-6">
            Book your table now and enjoy an unforgettable dining experience.
          </p>

          {/* Button */}
          <button className="bg-black  text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition duration-300">
            Browse Restaurants
          </button>
        </div>
      </div>
    </div>
  );
}
