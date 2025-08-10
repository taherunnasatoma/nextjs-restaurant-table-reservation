"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How do I book a table?",
    answer: "Simply choose a restaurant, select your preferred date and time, then confirm your booking.",
  },
  {
    question: "Can I cancel or reschedule my booking?",
    answer: "Yes, you can manage your bookings from the dashboard, including cancellations or rescheduling.",
  },
  {
    question: "Is there a cost for booking?",
    answer: "Booking through DineReserve is free! You pay only at the restaurant.",
  },
  {
    question: "What if the restaurant is fully booked?",
    answer: "If a restaurant is fully booked, we recommend trying another date or location.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className=" mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>

      <div className="space-y-4">
        {faqs.map(({ question, answer }, index) => (
          <div
            key={index}
            className="border rounded-lg overflow-hidden shadow-sm"
          >
            <button
              className="w-full flex justify-between items-center px-6 py-4 text-left text-lg font-medium bg-[#f7ff5d] hover:bg-yellow-200 focus:outline-none"
              onClick={() => toggleFAQ(index)}
              aria-expanded={openIndex === index}
            >
              <span>{question}</span>
              <svg
                className={`w-6 h-6 transform transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            {openIndex === index && (
              <div className="px-6 py-4 bg-white text-gray-700">
                {answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
