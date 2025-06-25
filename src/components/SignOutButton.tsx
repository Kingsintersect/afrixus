// components/SignOutButton.tsx
"use client";

import { useSignOutMutation } from "@/hooks/useSignOutMutation";
import { Button } from "@/components/ui/button";
import { Loader2, PowerIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function SignOutButton({ onSuccess, className, revealIcon }: { onSuccess?: () => void, className?: string, revealIcon?: boolean; }) {
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
            className={cn(``, className)}
        >
            {isPending ? (
                <>
                    <Loader2 className="mr-2 !h-8 !w-8 animate-spin" />
                    Signing out...
                </>
            ) : (
                <>
                    {revealIcon && <PowerIcon className="!w-8 !h-8" />}
                    {"Sign Out"}
                </>
            )}
        </Button>
    );
}

