"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface SignInButton {
    onClick: () => void;
    isPending: boolean;
    onSuccess?: () => void;
}
export function SignInButton({
    onClick,
    isPending,
}: SignInButton) {

    return (
        <Button
            onClick={onClick}
            variant="default"
            disabled={isPending}
        >
            {isPending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                </>
            ) : (
                "Sign In"
            )}
        </Button>
    );
}

