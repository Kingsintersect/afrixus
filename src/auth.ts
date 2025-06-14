import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { validateUser } from "./actions/userAction";
import { signInSchema } from "./schemas/auth-schemas";
import { UserRole } from "./lib/definitions";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			authorize: async (credentials) => {
				try {
					const parsed = signInSchema.safeParse(credentials);
					if (!parsed.success) {
						console.error(
							"Validation error:",
							parsed.error.flatten().fieldErrors
						);
						return null;
					}

					const { email, password } = parsed.data;
					const res = await validateUser({ email, password });

					if (!res || !res.access_token || !res.user) {
						console.error("Invalid email or password or missing user fields");
						return null;
					}
					const user = {
						...res.user,
						access_token: res.access_token,
						id: String(res.user.id),
					};
					return user;
				} catch (error) {
					console.error("Authorize error:", error);
					return null;
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.role = user.role;
				token.access_token = user.access_token;
				token.first_name = user.first_name;
				token.email = user.email;
			}
			return token;
		},
		async session({ session, token }) {
			if (token && session.user) {
				session.user.id = token.id as string;
				session.user.first_name = token.first_name as string;
				session.user.role = token.role as UserRole;
				session.user.access_token = token.access_token as string;
				session.user.email = token.email as string;
			}
			return session;
		},
	},
});
