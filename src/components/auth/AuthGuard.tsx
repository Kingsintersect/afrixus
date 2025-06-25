"use client";

import { signOut } from "@/actions/auth";
import { useSession } from "next-auth/react";
// import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession();

    useEffect(() => {
        const expiresAt = session?.user?.expires_in
            ? Date.now() + session.user.expires_in * 1000
            : null;

        // if (expiresAt && Date.now() > expiresAt) {
        if (expiresAt !== null) {
            const earlyExpiry = expiresAt - 5 * 1000;
            if (Date.now() > earlyExpiry) {
                signOut(); // Token expired
            }
        }
    }, [session]);

    return <>{children}</>;
}
