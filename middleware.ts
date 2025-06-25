// export { auth as middleware } from "@/actions/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Public routes
const PUBLIC_PATHS = [
	"/",
	"/product",
	"/categories",
	"/cart",
	"/unauthorized",
];

export async function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;
	const token = await getToken({ req, secret: process.env.AUTH_SECRET });

	const isAuth = !!token;
	const isPublic = PUBLIC_PATHS.includes(pathname);

	// ⛔ Block unauthenticated users from protected routes
	if (!isAuth && !isPublic && pathname.startsWith("/admin")) {
		return NextResponse.redirect(new URL("/", req.url));
	}
	if (!isAuth && !isPublic && pathname.startsWith("/orders")) {
		return NextResponse.redirect(new URL("/", req.url));
	}

	// 🔐 Block non-admins from /admin
	if (pathname.startsWith("/admin") && token?.role !== "ADMIN") {
		return NextResponse.redirect(new URL("/unauthorized", req.url));
	}

	// ✅ Allow public pages or authenticated access
	return NextResponse.next();
}

export const config = {
	matcher: [
		// Your existing matcher works fine, keep it
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		"/(api|trpc)(.*)",
	],
};
