import { UserRole } from "@/lib/definitions";
import "next-auth";
token.role = user.role;

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      email: string;
      name?: string;
      access_token?: string;
      expires_in?: number;
    };
  }

  interface User {
    id: string;
    role: string;
    email: string;
    first_name?: string;
    access_token?: string;
    expires_in?: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}
declare module "next-auth/providers" {
  interface CredentialsInput {
    email: string;
    password: string;
  }
}