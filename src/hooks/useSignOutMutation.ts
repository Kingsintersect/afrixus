"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { signOutAction } from "@/actions/authActions";
import { useSession } from "next-auth/react";

export function useSignOutMutation() {
	const { update } = useSession();

	return useMutation({
		mutationFn: async () => {
			try {
				await signOutAction();
			} catch (error) {
				console.error("Sign out failed:", error);
			}
		},
		onSuccess: async () => {
			toast.success("Signed out successfully!");
			await update();
			window.location.href = "/";
		},
		onError: (error: Error) => {
			toast.error(error.message || "Failed to sign out. Please try again.");
		},
	});
}
