"use server";

import { signIn, signOut } from "./auth";
import { createUser } from "./userAction";
import { SignInSchemaType, signUpSchemaType } from "@/schemas/auth-schemas";

export async function signUpAction(formData: signUpSchemaType) {
	try {
		const res = await createUser(formData);

		if (!res || !("user" in res && res.user)) {
			throw new Error(JSON.stringify(res));
		}

		return res;
	} catch (error) {
		console.error("SignUpAction error:", error);
		throw error;
	}
}

const errorMap: Record<string, string> = {
	"CredentialsSignin": "Invalid email or password.",
	"OAuthSignin": "There was an issue signing in with the provider.",
};
export async function signInAction(data: SignInSchemaType) {
	try {
		const result = await signIn("credentials", {
			...data,
			redirect: false,
			// callbackUrl: "/cart",
		})

		if (!result || result.error) {
			const userMessage = result?.error ? (errorMap[result.error] || "Authentication failed! Please try again.") : "Authentication failed! Please try again.";
			throw new Error(userMessage);
		}
		return result;
	} catch (error) {
		console.error("SignInAction error:", error);
		if (error instanceof Error) {
			throw new Error(error.message);
		}
		throw new Error("Something went wrong during sign in.");
	}
}

export async function signOutAction() {
	await signOut();
}
