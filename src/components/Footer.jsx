import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between gap-8">

        {/* About */}
        <div className="md:w-1/3">
          <h3 className="text-white text-xl font-semibold mb-4">DineReserve</h3>
          <p className="text-sm leading-relaxed">
            Your trusted platform to book tables at the best restaurants around. Enjoy a seamless dining experience.
          </p>
        </div>

        {/* Quick Links */}
        <div className="md:w-1/3">
          <h3 className="text-white text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-[#f7ff5d] transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="#about" className="hover:text-[#f7ff5d] transition">
                About
              </Link>
            </li>
            <li>
              <Link href="#restaurant" className="hover:text-[#f7ff5d] transition">
                Browse Restaurants
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="md:w-1/3">
          <h3 className="text-white text-xl font-semibold mb-4">Contact Us</h3>
          <p className="text-sm mb-2">Email: support@dinereserve.com</p>
          <p className="text-sm mb-2">Phone: +1 (555) 123-4567</p>
          <p className="text-sm">Address: 123 Food St, Flavor Town</p>
        </div>

      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} DineReserve. All rights reserved.
      </div>
    </footer>
  )
}
