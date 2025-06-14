import { createCheoutSession, Metadata } from '@/actions/createCheckoutSession';
import { useAuth } from '@/hooks/useAuth';
import { useUser } from '@/hooks/useUser';
import React from 'react'
import { AuthSheet } from '../auth-sheet';
import { CartItem } from '@/store/store';
import { PaycometPaymentButton, StripePaymentButton } from '@/app/(store)/cart/compoenets/PaymentButtons';

interface CheckoutButtonProps {
    groupedItems: CartItem[];
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
}

function CheckoutButton({ groupedItems, isLoading, setIsLoading }: CheckoutButtonProps) {
    const { isAuthenticated } = useAuth();
    const { user } = useUser();

    const handleCheckout = async () => {
        if (!isAuthenticated) return false;
        setIsLoading(true);

        try {
            const metadata: Metadata = {
                orderNumber: crypto.randomUUID(),
                customerName: user?.first_name ?? "Unknown",
                customerEmail: user?.email ?? "Unknown",
                userId: String(user!.id) ?? "Unknown",
            }

            const checkoutUrl = await createCheoutSession(groupedItems, metadata);

            if (checkoutUrl) {
                window.location.href = checkoutUrl;
            }
        } catch (error) {
            console.error("Error creating checkout session", error);
        } finally {
            setIsLoading(false);
        }
    }
    const handlePaycometPayment = (method: string) => {
        console.log(`Processing payment with ${method}`);
    };

    return (
        <>
            {isAuthenticated ? (
                <div className='flex flex-col gap-3 mt-10'>
                    <StripePaymentButton
                        onClick={() => handleCheckout()}
                        className="w-full sm:w-auto"
                        disabled={isLoading}
                    />

                    <PaycometPaymentButton
                        onClick={() => handlePaycometPayment('Paycomet')}
                        className="w-full sm:w-auto"
                        disabled={isLoading}
                    />
                </div>
            ) : (
                <AuthSheet
                    className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 hover:text-white"
                    title="Sign in to Checkout"
                />
            )}
        </>
    )
}

export default CheckoutButton
