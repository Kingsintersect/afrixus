import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

interface SignUpButtonProps {
    onClick: () => void;
    isPending: boolean;
    onSuccess?: () => void;
}
export function SignUpButton({
    onClick,
    isPending,
}: SignUpButtonProps) {

    return (
        <Button
            onClick={onClick}
            variant="secondary"
            disabled={isPending}
        >
            {isPending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                </>
            ) : (
                "Create Account"
            )}
        </Button>
    );
}