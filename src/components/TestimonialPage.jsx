export default function TestimonialPage() {
  const testimonials = [
    {
      id: 1,
      name: "Jane Doe",
      role: "Food Blogger",
      image: "/assets/1.jpeg",
      text: "DineReserve made booking a table so easy and quick! Highly recommended.",
    },
    {
      id: 2,
      name: "John Smith",
      role: "Chef",
      image: "/assets/2.jpeg",
      text: "Great user experience and amazing restaurants featured here!",
    },
    {
      id: 3,
      name: "Emily Johnson",
      role: "Traveler",
      image: "/assets/5.jpg",
      text: "I found the best local spots thanks to DineReserve.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl text-center font-bold mb-10">What Our Customers Say</h1>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map(({ id, name, role, image, text }) => (
          <div
            key={id}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={image}
              alt={name}
              className="w-24 h-24 rounded-full object-cover mb-4"
              loading="lazy"
            />
            <p className="text-gray-700 mb-4 italic">"{text}"</p>
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-yellow-500">{role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
