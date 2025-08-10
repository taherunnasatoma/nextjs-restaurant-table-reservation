

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/dbConnect";



// export default async function MyBookingsPage() {
//   const session = await getServerSession(authOptions);
//   if (!session) {
//     return <p>Please log in to see your bookings.</p>;
//   }

//   const collection = await dbConnect("bookings");

//   const bookings = await collection
//     .find({ userEmail: session.user.email })
//     .sort({ createdAt: -1 })
//     .toArray();

//   if (bookings.length === 0) {
//     return <p>No bookings found.</p>;
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
//       <ul>
//         {bookings.map((booking) => (
//           <li key={booking._id.toString()} className="border p-4 rounded mb-2">
//             <p><strong>Restaurant:</strong> {booking.restaurantName}</p>
//             <p><strong>Booking Date:</strong> {new Date(booking.bookingDate).toLocaleString()}</p>
//             <p><strong>Booked At:</strong> {new Date(booking.createdAt).toLocaleString()}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }




export default async function MyBookingsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <p>Please log in to see your bookings.</p>;
  }

  const collection = await dbConnect("bookings");
  const bookings = await collection
    .find({ userEmail: session.user.email })
    .sort({ createdAt: -1 })
    .toArray();

  if (bookings.length === 0) {
    return <p>No bookings found.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Restaurant</th>
            <th className="border px-4 py-2">Booking Date</th>
            <th className="border px-4 py-2">Booked At</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id.toString()}>
              <td className="border px-4 py-2">{booking.restaurantName}</td>
              <td className="border px-4 py-2">
                {new Date(booking.bookingDate).toLocaleString()}
              </td>
              <td className="border px-4 py-2">
                {new Date(booking.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

