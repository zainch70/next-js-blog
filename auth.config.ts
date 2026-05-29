import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authConfig = {
  providers: [
    Credentials({
      authorize: async () => null,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;

      const isAuthPage =
        pathname.startsWith("/login") || pathname.startsWith("/signup");

      if (isLoggedIn && isAuthPage) {
        return Response.redirect(new URL("/", nextUrl));
      }

      // Logged-in users only see their own data on / — not /page community routes
      if (isLoggedIn && pathname.startsWith("/page")) {
        return Response.redirect(new URL("/", nextUrl));
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
