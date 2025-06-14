// components/SignOutButton.tsx
"use client";

import { useSignOutMutation } from "@/hooks/useSignOutMutation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function SignOutButton({ onSuccess }: { onSuccess?: () => void }) {
    const { mutate, isPending } = useSignOutMutation();

    return (
        <Button
            onClick={() =>
                mutate(undefined, {
                    onSuccess: () => {
                        onSuccess?.();
                    },
                })
            }
            variant="destructive"
            disabled={isPending}
        >
            {isPending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing out...
                </>
            ) : (
                "Sign Out"
            )}
        </Button>
    );
}

