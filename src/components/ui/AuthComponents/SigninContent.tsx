"use client";

import React from 'react';
import { Button } from '../button';
import { SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '../sheet';
import { SignInButton } from '@/components/SignInButton';
import { Label } from '../label';
import { Input } from '../input';
import { UseFormReturn } from 'react-hook-form';
import { SignInSchemaType } from '@/schemas/auth-schemas';
import { useSignInMutation } from '@/hooks/useSignInMutation';

interface SigninContentProps {
    signInForm: UseFormReturn<SignInSchemaType>;
    handleClose: () => void;
    switchToSignUp: () => void;
}

function SigninContent({ signInForm, handleClose, switchToSignUp }: SigninContentProps) {
    const { mutate, isPending } = useSignInMutation();

    return (
        <div className="w-full flex-shrink-0 space-y-6">
            <SheetHeader>
                <SheetTitle>Sign in to your account</SheetTitle>
                <SheetDescription>
                    Fill in your credentials and click Sign In.
                </SheetDescription>
            </SheetHeader>

            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="signin-email" className="text-right">Email</Label>
                    <div className="col-span-3 space-y-1">
                        <Input
                            id="signin-email"
                            type="email"
                            {...signInForm.register("email")}
                        />
                        {signInForm.formState.errors.email && (
                            <p className="text-sm text-red-500">
                                {signInForm.formState.errors.email.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="signin-password" className="text-right">Password</Label>
                    <div className="col-span-3 space-y-1">
                        <Input
                            id="signin-password"
                            type="password"
                            {...signInForm.register("password")}
                        />
                        {signInForm.formState.errors.password && (
                            <p className="text-sm text-red-500">
                                {signInForm.formState.errors.password.message}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <SheetFooter className="grid grid-cols-1 gap-5">
                <div className="flex justify-end">
                    <SignInButton
                        onClick={signInForm.handleSubmit((data) =>
                            mutate(data, {
                                onSuccess: () => {
                                    handleClose?.();
                                    signInForm.reset();
                                },
                            })
                        )}
                        isPending={isPending}
                    />
                </div>

                <div className="text-center text-sm">
                    Dont have an account?{" "}
                    <Button
                        className="text-blue-500 p-0 h-auto font-medium"
                        variant="link"
                        onClick={switchToSignUp}
                        type="button"
                    >
                        Create an account
                    </Button>
                </div>
            </SheetFooter>
        </div>
    )
}

export default SigninContent
