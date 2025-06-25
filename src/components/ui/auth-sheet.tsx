'use client';
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import Signin from "./AuthComponents/SigninContent";
import Signup from "./AuthComponents/SignupContent";
import SignOutContent from "./AuthComponents/SignOutContent";
import { signInSchema, SignInSchemaType, signUpSchema, signUpSchemaType } from "@/schemas/auth-schemas";
import { useAuthSheet } from "@/contexts/auth-sheet-context";

// type AuthMode = 'signin' | 'signup';

export function AuthSheet({ className = "", title }: { className?: string, title?: string | ReactNode }) {
    const { data: session, status } = useSession();
    const {
        isOpen,
        setIsOpen,
        closeAuthSheet,
        authMode,
        setAuthMode,
    } = useAuthSheet();
    // const [isOpen, setIsOpen] = useState(false);
    // const [authMode, setAuthMode] = useState<AuthMode>('signin');

    const signInForm = useForm<SignInSchemaType>({
        resolver: zodResolver(signInSchema),
    });

    const signUpForm = useForm<signUpSchemaType>({
        resolver: zodResolver(signUpSchema),
    });

    const isAuthenticated = status === "authenticated" && session?.user;
    const isLoading = status === "loading";

    const switchToSignUp = () => {
        setAuthMode('signup');
        signInForm.reset();
    };

    const switchToSignIn = () => {
        setAuthMode('signin');
        signUpForm.reset();
    };

    const handleClose = () => {
        closeAuthSheet();
        setTimeout(() => {
            setAuthMode('signin');
            signInForm.reset();
            signUpForm.reset();
        }, 200);
    };

    return (
        <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(``, className)}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        "Loading..."
                    ) : isAuthenticated ? (
                        title || "Sign Out"
                    ) : (
                        title || "Sign In"
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col justify-center h-full overflow-hidden">
                {isAuthenticated ? (
                    <SignOutContent handleClose={handleClose} />
                ) : (
                    <div className="relative w-full h-full flex items-center overflow-hidden">
                        <div
                            className="flex w-[200%] transition-transform duration-300 ease-in-out"
                            style={{
                                transform: authMode === 'signin' ? 'translateX(0%)' : 'translateX(-100%)'
                            }}
                        >
                            <Signin
                                signInForm={signInForm}
                                handleClose={handleClose}
                                switchToSignUp={switchToSignUp}
                            />
                            <Signup
                                signUpForm={signUpForm}
                                handleClose={handleClose}
                                switchToSignIn={switchToSignIn}
                            />
                        </div>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}
