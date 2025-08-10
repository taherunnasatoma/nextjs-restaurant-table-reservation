
import Link from "next/link";
import React from "react";
import LoginForm from "./components/LoginForm";

export default function LoginPage() {
  return (
 
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome to Login 
        </h2>

        {/* Form */}
        <LoginForm></LoginForm>

        {/* Don't have an account */}
        <p className="mt-6 text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <Link href="/register" className="text-indigo-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  
  );
}
