"use client";

import React from 'react'
import { Button } from '../button';
import { SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '../sheet';
import { Label } from '../label';
import { Input } from '../input';
import { SignUpButton } from '@/components/SignUpButton';
import { UseFormReturn } from 'react-hook-form';
import { signUpSchemaType } from '@/schemas/auth-schemas';
import { useSignUpMutation } from '@/hooks/useSignIUpMutation';

interface SignupContentProps {
    signUpForm: UseFormReturn<signUpSchemaType>;
    handleClose?: () => void;
    switchToSignIn: () => void;
}

function SignupContent({ signUpForm, switchToSignIn }: SignupContentProps) {
    const { mutate, isPending } = useSignUpMutation();

    return (
        <div className="w-full flex-shrink-0 space-y-6">
            <SheetHeader>
                <SheetTitle>Create your account</SheetTitle>
                <SheetDescription>
                    Fill in your details to create a new account.
                </SheetDescription>
            </SheetHeader>

            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="signup-first_name" className="text-right">First Name</Label>
                    <div className="col-span-3 space-y-1">
                        <Input
                            id="signup-fisrt_name"
                            type="text"
                            {...signUpForm.register("first_name")}
                        />
                        {signUpForm.formState.errors.first_name && (
                            <p className="text-sm text-red-500">
                                {signUpForm.formState.errors.first_name.message}
                            </p>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="signup-last_name" className="text-right">Last Name</Label>
                    <div className="col-span-3 space-y-1">
                        <Input
                            id="signup-last_name"
                            type="text"
                            {...signUpForm.register("last_name")}
                        />
                        {signUpForm.formState.errors.last_name && (
                            <p className="text-sm text-red-500">
                                {signUpForm.formState.errors.last_name.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="signup-email" className="text-right">Email</Label>
                    <div className="col-span-3 space-y-1">
                        <Input
                            id="signup-email"
                            type="email"
                            {...signUpForm.register("email")}
                        />
                        {signUpForm.formState.errors.email && (
                            <p className="text-sm text-red-500">
                                {signUpForm.formState.errors.email.message}
                            </p>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="signup-phone" className="text-right">Phone Number</Label>
                    <div className="col-span-3 space-y-1">
                        <Input
                            id="signup-phone"
                            type="tel"
                            {...signUpForm.register("phone")}
                        />
                        {signUpForm.formState.errors.phone && (
                            <p className="text-sm text-red-500">
                                {signUpForm.formState.errors.phone.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="signup-password" className="text-right">Password</Label>
                    <div className="col-span-3 space-y-1">
                        <Input
                            id="signup-password"
                            type="password"
                            {...signUpForm.register("password")}
                        />
                        {signUpForm.formState.errors.password && (
                            <p className="text-sm text-red-500">
                                {signUpForm.formState.errors.password.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="signup-confirm-password" className="text-right">Confirm Password</Label>
                    <div className="col-span-3 space-y-1">
                        <Input
                            id="signup-confirm-password"
                            type="password"
                            {...signUpForm.register("password_confirmation")}
                        />
                        {signUpForm.formState.errors.password_confirmation && (
                            <p className="text-sm text-red-500">
                                {signUpForm.formState.errors.password_confirmation.message}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <SheetFooter className="grid grid-cols-1 gap-5">
                <div className="flex justify-end">
                    <SignUpButton
                        onClick={signUpForm.handleSubmit((data) =>
                            mutate(data, {
                                onSuccess: () => {
                                    switchToSignIn();
                                },
                            })
                        )}
                        isPending={isPending}
                    />
                </div>

                <div className="text-center text-sm">
                    Already have an account?{" "}
                    <Button
                        className="text-blue-500 p-0 h-auto font-medium"
                        variant="link"
                        onClick={switchToSignIn}
                        type="button"
                    >
                        Sign in here
                    </Button>
                </div>
            </SheetFooter>
        </div>
    )
}

export default SignupContent
