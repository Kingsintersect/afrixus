import type { NextAuthConfig } from "next-auth";

export const authConfig = {
	pages: {
		signIn: "/login",
	},
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user;
			const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
			const isOnAuthentication =
				nextUrl.pathname.startsWith("/login") ||
				nextUrl.pathname.startsWith("/register");
			if (isOnDashboard) {
				if (isLoggedIn) return true;
				return false; // Redirect unauthenticated customers to login page
			} else if (isLoggedIn && isOnAuthentication) {
				return Response.redirect(new URL("/dashboard", nextUrl));
			} else if (isLoggedIn) {
				// return Response.redirect(new URL('/dashboard', nextUrl));
			}
			return true;
		},
	},
	providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
