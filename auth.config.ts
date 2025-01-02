import type { NextAuthConfig } from "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    email?: string | null;
    firstName?: string | null;
    lastName?: string | null;
  }
}

// This is the configuration for the next-auth
export const authConfig = {
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/login",
  },
  trustHost: !!process.env.AUTH_TRUST_HOST,
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const user = auth?.user;
      const authPages = ["/login", "/signup", "/forgot-password", "/reset-password", "/verify-email", "/error"];
      const isOnAuthPage = authPages.some((page) => nextUrl.pathname.startsWith(page));

      // If the user is not logged in, redirect to the login page if not on the login page
      if (!user) {
        if (!isOnAuthPage) return false;
        return true;
      }

      // If the user is logged in, redirect to the home page if on the login page
      if (isOnAuthPage) return Response.redirect(new URL("/", nextUrl));

      // Stay on the current page if the user is logged in and not on an auth page
      return true;
    },
  },
  providers: [],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
} satisfies NextAuthConfig;
