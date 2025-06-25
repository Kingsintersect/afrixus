"use client";

import { useMutation } from "@tanstack/react-query";
import { signUpAction } from "@/actions/authActions";
import { useSession } from "next-auth/react";
import { signUpSchemaType } from "@/schemas/auth-schemas";
import { toastApiError, toastSuccess } from "@/lib/toastApiError";
// import { ApiError } from "@/lib/api.utils";


// export function useSignUpMutation() {
// 	const { update } = useSession();
// 	return useMutation({
// 		mutationFn: async (data: signUpSchemaType) => {
// 			return await signUpAction(data);
// 		},
// 		onSuccess: async () => {
// 			toastSuccess("Account created successfully!");
// 			await update();
// 		},
// 		onError: (error: Error) => {
// 			// Handle ApiError specifically
// 			if (error instanceof ApiError) {
// 				toastApiError(error.message);
// 			} else {
// 				toastApiError(error.message || "Failed to create account");
// 			}
// 		},
// 	});
// }
export function useSignUpMutation() {
	const { update } = useSession();
	return useMutation({
		mutationFn: async (data: signUpSchemaType) => {
			return await signUpAction(data);
		},
		onSuccess: async () => {
			toastSuccess("Account created successfully!");
			await update();
		},
		onError: (error: Error) => {
			console.log('mutation error', error)
			toastApiError(error, "Signup failed");
		},
	});
}
