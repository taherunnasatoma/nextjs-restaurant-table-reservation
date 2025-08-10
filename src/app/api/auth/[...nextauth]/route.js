import { loginUser } from "@/app/action/auth/loginUser"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
    // The name to display on the sign in form (e.g. 'Sign in with...')
    name: 'Credentials',
    // The credentials is used to generate a suitable form on the sign in page.
    // You can specify whatever fields you are expecting to be submitted.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      email: { label: "Email", type: "text", placeholder: "Enter Email" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
        console.log(credentials)
      
     
      const user = await loginUser(credentials)
      console.log(user)

      // If no error and we have user data, return it
      if (user) {
        return user
      } else{
      // Return null if user data could not be retrieved
      return null
      }
    }
  }),

    
  GitHubProvider({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET
  })


  ],
  pages:{
    signIn:'/login'
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }