'use client'

import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useRef, useEffect } from 'react'

export default function Navbar() {
  const { data: session, status } = useSession()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [dropdownRef])

  const navMenu = () => (
    <>
      <li><Link href="/">Home</Link></li>
      <li><Link href="/about">About</Link></li>
      <li><Link href="/services">Services</Link></li>
      <li><Link href="/contacts">Contacts</Link></li>
    </>
  )

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> 
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
              {navMenu()}
            </ul>
          </div>
          <Link href={'/'} className="flex items-center gap-2">
            <Image src={'/assets/logo.png'} alt="Logo" width={50} height={50} />
            <span className="text-xl font-bold ">DineReserve</span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navMenu()}
          </ul>
        </div>

        <div className="navbar-end gap-4 relative" ref={dropdownRef}>
          {status === 'authenticated' ? (
            <>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="btn btn-ghost btn-circle avatar"
                aria-label="User menu"
              >
                <div className="w-10 rounded-full overflow-hidden">
                  <Image
                    src={session.user?.image || '/default-user.png'}
                    alt="User"
                    width={40}
                    height={40}
                  />
                </div>
              </button>

              {dropdownOpen && (
                <ul
                  tabIndex={0}
                  className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-[#f7ff5d] rounded-box w-52 absolute right-0"
                >
                  <li><Link href="/dashboard">Dashboard</Link></li>
                  <li><a onClick={() => signOut({ callbackUrl: '/' })}>Log Out</a></li>
                </ul>
              )}
            </>
          ) : (
            <>
              <Link href="/register" className="btn bg-[#f7ff5d]">Register</Link>
              <Link href="/login" className="btn bg-[#f7ff5d]">Login</Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
