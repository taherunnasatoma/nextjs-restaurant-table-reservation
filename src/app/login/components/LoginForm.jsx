'use client'

import React from 'react'
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import SocialLogin from './SocialLogin'

export default function LoginForm() {

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const email = form.email.value;
        const password = form.password.value;
        toast("Submitting....")

        try {
            const response = await signIn('credentials', {
                email,
                password,
                callbackUrl: '/',
                redirect: false
            })

            if (response.ok) {
                toast.success("Logged In Successfully")
                router.push('/')
                form.reset()

            } else {
                toast.error("Failed to Logged In")
            }

            // console.log({ email, password })
        }
        catch (error) {

            console.log(error)
            toast.error("Failed to Logged In")

        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">
                        Email Address
                    </label>
                    <input
                        name='email'
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
                        name='password'
                        type="password"
                        placeholder="Enter your password"
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-[#f7ff5d] hover:bg-[#fffc5deb] text-black font-medium py-2 rounded-lg transition duration-300"
                >
                    Login
                </button>
            </form>
            <SocialLogin></SocialLogin>
        </div>
    )
}
