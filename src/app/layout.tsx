import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "./providers/AuthProvider";
import { Toaster } from "@/components/ui/sonner";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import NextAuthSessionProvider from "@/providers/NextAuthSessionProvider";
import { SITE_NAME } from "@/lib/config";
import CartSyncClient from "@/components/cart/cart-sync-client";
import { AuthSheetProvider } from "@/contexts/auth-sheet-context";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: SITE_NAME,
	description: "A market for high quality fabrics",
	icons: {
		icon: [
			{ url: "/af-logo-1.ico", sizes: "any" },
			{ url: "/af-logo-1.png", type: "image/png" }
		]
	}

};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/af-logo-1.ico" type="image/x-icon" />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ReactQueryProvider>
					<NextAuthSessionProvider>
						<AuthProvider>
							<AuthSheetProvider>
								<main>
									{children}
									<CartSyncClient />
								</main>
							</AuthSheetProvider>
						</AuthProvider>
					</NextAuthSessionProvider>
				</ReactQueryProvider>
				<Toaster position="top-right" expand={false} richColors />
			</body>
		</html>
	);
}
