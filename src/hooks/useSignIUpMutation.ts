"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { signUpAction } from "@/actions/authActions";
import { useSession } from "next-auth/react";
import { signUpSchemaType } from "@/schemas/auth-schemas";


export function useSignUpMutation() {
	const { update } = useSession();
	return useMutation({
		mutationFn: async (data: signUpSchemaType) => {
			return await signUpAction(data);
		},
		onSuccess: async () => {
			toast.success("Account created successfully!");
			await update();
		},
		onError: (error: Error) => {
			toast.error(error.message ?? "Failed to create account");
		},
	});
}
