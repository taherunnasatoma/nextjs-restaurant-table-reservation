import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export const loginUser = async ({ email, password }) => {
  try {
    const userCollection = await dbConnect(collectionNameObj.userCollection);

    // Find user by email
    const user = await userCollection.findOne({ email });
    if (!user) return null;

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    // Return a minimal safe object for NextAuth
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
     image: user.image || null
    };
  } catch (error) {
    console.error("Error in loginUser:", error);
    return null;
  }
};
