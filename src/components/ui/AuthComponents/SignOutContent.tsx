import { useSession } from 'next-auth/react';
import React from 'react'
import { SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '../sheet';
import { Button } from '../button';
import { SignOutButton } from '@/components/SignOutButton';

interface SignOutContentProps {
    handleClose: () => void
}
function SignOutContent({ handleClose }: SignOutContentProps) {
    const { data: session } = useSession();
    return (
        <div className="space-y-6">
            <SheetHeader>
                <SheetTitle>Sign out of your account</SheetTitle>
                <SheetDescription>
                    You are currently signed in as {session?.user?.email}
                </SheetDescription>
            </SheetHeader>

            <div className="py-4">
                <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                        <strong>Name:</strong> {session?.user?.name || "Not provided"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        <strong>Email:</strong> {session?.user?.email}
                    </p>
                </div>
            </div>

            <SheetFooter className="flex gap-2">
                <Button
                    variant="outline"
                    onClick={handleClose}
                >
                    Cancel
                </Button>
                <SignOutButton onSuccess={handleClose} />
            </SheetFooter>
        </div>
    )
}

export default SignOutContent
