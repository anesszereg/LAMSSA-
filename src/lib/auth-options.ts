import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || "lamsa-local-dev-secret-change-me",
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@lamsa.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const users = [
          {
            id: "admin-1",
            email: "admin@lamsa.com",
            password: process.env.ADMIN_PASSWORD || "admin123",
            name: "Admin User",
            role: "admin",
          },
          {
            id: "user-1",
            email: "user@lamsa.com",
            password: process.env.USER_PASSWORD || "user123",
            name: "Sophia Laurent",
            role: "user",
          },
        ];

        const user = users.find(
          (u) =>
            u.email === credentials?.email && u.password === credentials?.password
        );

        if (!user) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const user = session.user as { id?: string; role?: string };
        user.id = token.id as string;
        user.role = token.role as string;
      }
      return session;
    },
  },
};
