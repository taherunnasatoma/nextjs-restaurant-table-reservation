'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { HiOutlineMenu, HiX } from 'react-icons/hi'

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const menuItems = [
    { label: "Add Restaurant", href: "/dashboard/restaurants/create" },
    { label: "View Restaurants", href: "/dashboard/restaurants" },
    // add more dashboard links here
  ]

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-white shadow-md w-64 z-30 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:inset-auto`}
      >

        {/* Logo + Title */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/assets/logo.png" // update path if needed
              alt="Logo"
              width={40}
              height={40}
            />
            <span className="text-lg font-bold">DineReserve</span>
          </Link>

          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <HiX className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`block px-3 py-2 rounded-md text-base font-medium
                    ${pathname === href ? "bg-[#f7ff5d] text-black" : "text-gray-700 hover:bg-yellow-300"}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-25 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Header for mobile */}
        <header className="flex items-center justify-between bg-white shadow p-4 md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <HiOutlineMenu className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">Dashboard</h1>
          <div /> {/* Empty div to balance header flex */}
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
