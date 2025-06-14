"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { UserRole } from "@/lib/definitions";
import { UserStateType } from "@/schemas/customer-schema";

export function useUser() {
	const { data: session } = useSession();
	const [user, setUser] = useState<UserStateType | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (session?.user) {
			setUser({
				id: parseInt(session.user.id),
				email: session.user.email!,
				first_name: session.user.name || "",
				role: session.user.role || UserRole.USER,
			});
		} else {
			setUser(null);
		}
	}, [session]);

	const updateProfile = async (updates: { name?: string; email?: string }) => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch("/api/user/profile", {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updates),
			});

			if (!response.ok) {
				throw new Error("Failed to update profile");
			}

			const updatedUser = await response.json();
			setUser(updatedUser);
			return { success: true };
		} catch (error) {
			const errorMessage = `Failed to update profile: ${error instanceof Error ? error.message : "Unknown error"
				}`;
			setError(errorMessage);
			return { success: false, error: errorMessage };
		} finally {
			setIsLoading(false);
		}
	};

	return {
		user,
		isLoading,
		error,
		updateProfile,
		clearError: () => setError(null),
	};
}
