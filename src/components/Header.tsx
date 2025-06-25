"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { PackageIcon, ShoppingCartIcon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { AuthSheet } from "./ui/auth-sheet";
import { CategorySelectorComponent } from "./ui/category-selector";
import { useSession } from "next-auth/react";
import { Category } from "@/schemas/category-schema";
// import { SITE_NAME } from "@/lib/config";
import { useCartStore } from "@/store/store";
import { useIsHydrated } from "@/hooks/useIsHydrated";
import Image from "next/image";

interface HeaderProps {
	categories: Category[]
}
const Header = ({ categories }: HeaderProps) => {
	const { data: session, status } = useSession();
	const { isAuthenticated } = useAuth();
	const itemCount = useCartStore((state) => state.cartItems.reduce((total, item) => total + item.quantity, 0));
	const isHydrated = useIsHydrated();

	useEffect(() => {
		return () => {
		}
	}, [session?.user])

	if (!isHydrated) return null;

	return (
		<header className="flex flex-wrap justify-between items-center px-4 py-2">
			<div className="flex w-full flex-wrap justify-between items-center">
				<Link
					href={"/"}
					className="flex items-center gap-4 text-2xl font-bold text-blue-500 hover:opacity-50 cursor-pointer mx-auto sm:mx-0 capitalize"
				>
					<div className="relative h-16 w-auto">
						<Image
							alt="LOGO"
							src="/af-logo-1.png"
							className="h-16 w-auto object-contain"
							width={0}
							height={0}
							sizes="100vw"
						/>
					</div>

					{/* <div className="">{SITE_NAME}</div> */}
				</Link>

				{categories && <CategorySelectorComponent categories={categories} />}

				<div className="flex items-center space-x-4 mt-4 sm:mt-0 flex-1 sm:flex-none">
					<Link
						href={"/cart"}
						className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					>
						<ShoppingCartIcon className="w-6 h-6" />

						<span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
							{itemCount}
						</span>
						<span>My Cart</span>
					</Link>

					{/* User area */}
					{isAuthenticated &&
						<Link
							href={"/orders"}
							className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						>
							<PackageIcon className="w-6 h-6" />
							<span>My Orders</span>
						</Link>
					}

					<div className="flex items-center gap-4">
						{status === "authenticated" && session?.user && (
							<Link href={(session.user.role === "ADMIN") ? "/admin" : "#"} className="text-sm text-muted-foreground">
								Welcome, {session.user.name || session.user.email}
							</Link>
						)}

						<AuthSheet />
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
