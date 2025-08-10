'use client';

import { registerUser } from '@/app/action/auth/registerUser';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

export default function RegisterForm() {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.value;

    toast("Registering...");

    // Step 1: Register user in MongoDB
    const res = await registerUser({ name, email, password, image });

    if (res?.success) {
      // Step 2: Immediately log them in with credentials provider
      const loginRes = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (loginRes.ok) {
        toast.success("Registration successful, logging you in...");
        router.push('/');
      } else {
        toast.error("Registered, but failed to log in.");
      }
    } else {
      toast.error(res?.error || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Full Name
        </label>
        <input
          name="name"
          type="text"
          placeholder="Enter your full name"
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Email Address
        </label>
        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Password
        </label>
        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {/* Image URL */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Profile Image URL
        </label>
        <input
          name="image"
          type="url"
          placeholder="Enter image URL"
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-[#f7ff5d] hover:bg-[#fffc5deb] text-black font-medium py-2 rounded-lg transition duration-300"
      >
        Register
      </button>
    </form>
  );
}
