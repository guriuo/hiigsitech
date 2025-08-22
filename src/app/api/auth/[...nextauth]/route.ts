// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    // Social Login Providers
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    
    // Email & Password Provider
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "john.doe@example.com" },
        password: { label: "Password", type: "password" }
      },
      // This is where you'd add your logic to look up the user in a database.
      // For now, we'll just return a mock user for demonstration.
      async authorize(credentials, req) {
        if (credentials?.email && credentials?.password) {
          // In a real app, you'd verify the credentials against your database.
          // const user = await db.users.find({ where: { email: credentials.email }})
          // if (user && bcrypt.compareSync(credentials.password, user.password)) {
          //   return user
          // }
          
          // For this example, we'll accept any email/password
          const user = { id: "1", name: "J Smith", email: credentials.email }
          return user
        }
        return null
      }
    })
  ],
  
  // ✅ Tell NextAuth to use our custom sign-in page
  pages: {
    signIn: '/auth/signin',
  },

  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }