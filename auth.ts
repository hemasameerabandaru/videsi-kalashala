import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // 1. Database Adapter
  adapter: PrismaAdapter(db),

  // 2. Auth Providers
  providers: [
    Google({
      // 👇 FIXED: These names must match your .env.local file exactly
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user) {
          return null;
        }

        const metadata = user.metadata as any;
        const hashedPassword = metadata?.hashedPassword;

        if (!hashedPassword) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          hashedPassword
        );

        if (!passwordMatch) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],

  // 3. Callbacks (Custom Logic)
  callbacks: {
    async session({ session, user }) {
      // By default, the session only has name/email/image.
      // We manually attach the database ID so we can use it later
      if (session.user) {
        session.user.id = user.id;
        
        // You can also attach the metadata here if you want it on the frontend
        // session.user.metadata = user.metadata; 
      }
      return session;
    },
  },

  // 4. Custom Pages
  pages: {
    signIn: "/login", // Redirects here if unauthenticated
  },
});