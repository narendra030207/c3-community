import NextAuth, { type DefaultSession, type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import prisma from "@/lib/prisma";
import type { UserRole } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      avatar: string | null;
    } & DefaultSession["user"];
  }
  interface User {
    role: UserRole;
    avatar: string | null;
  }
  interface JWT {
    id: string;
    role: UserRole;
    avatar: string | null;
  }
}

export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.isActive) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          avatar: user.avatar,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role;
        token.avatar = user.avatar;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
        session.user.avatar = token.avatar as string | null;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

// Utility to check if user has required role
export function hasRole(userRole: UserRole, requiredRole: UserRole): boolean {
  const hierarchy: Record<UserRole, number> = {
    PARTICIPANT: 0,
    MODERATOR: 1,
    ORGANIZER: 2,
    FACULTY: 3,
    ADMIN: 4,
    SUPER_ADMIN: 5,
  };
  return hierarchy[userRole] >= hierarchy[requiredRole];
}

// Get current session (server-side)
export async function getServerAuth() {
  return await auth();
}

// Check if user is admin (server-side)
export async function requireAdmin() {
  const session = await auth();
  if (!session?.user || !hasRole(session.user.role, "ADMIN")) {
    throw new Error("Unauthorized: Admin access required");
  }
  return session;
}

// Check if user is authenticated (server-side)
export async function requireAuth() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized: Authentication required");
  }
  return session;
}
