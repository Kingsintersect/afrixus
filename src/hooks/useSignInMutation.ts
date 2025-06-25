"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { signInAction } from "@/actions/authActions";
import { useSession } from "next-auth/react";
import { SignInSchemaType } from "@/schemas/auth-schemas";

export function useSignInMutation() {
	const { update } = useSession();

	return useMutation({
		mutationFn: async (data: SignInSchemaType) => {
			return await signInAction(data);
		},
		onSuccess: async () => {
			toast.success("Signed in successfully!");
			await update();
		},
		onError: (error: Error) => {
			console.log('error.message', error.message)
			toast.error("Sign-in failed. Try again.");
		},
	});
}
