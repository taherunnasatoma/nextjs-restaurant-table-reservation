// 'use server'
// import bcrypt from 'bcrypt'

// import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

// export const registerUser = async (payload) => {
//     const userCollection =await  dbConnect(collectionNameObj.userCollection)
//     //validation
//     const {email ,password} = payload;
//     if(!email || !password) return null;
//     const user = await userCollection.findOne({ email: payload.email })
//     if (!user) {
//         const hashedPassword = await bcrypt.hash(password,10)
//         payload.password= hashedPassword
//         const result = await userCollection.insertOne(payload);
//         result.insertedId = result.insertedId.toString()
//         return result;
//     }
//     return null;



// }

// src/app/action/auth/registerUser.js
'use server'

import bcrypt from 'bcryptjs'
import dbConnect from '@/lib/dbConnect'
import { collectionNameObj } from '@/lib/dbConnect' // adjust if your export is different

export async function registerUser({ name, email, password, image }) {
  try {
    const usersCollection = await dbConnect(collectionNameObj.userCollection)

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email })
    if (existingUser) {
      return { success: false, error: 'Email already in use' }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const newUser = {
      name,
      email,
      password: hashedPassword,
      image: image || '/default-user.png', // fallback if no image provided
      createdAt: new Date(),
    }

    await usersCollection.insertOne(newUser)

    return { success: true }
  } catch (error) {
    console.error('Error registering user:', error)
    return { success: false, error: 'Server error' }
  }
}
