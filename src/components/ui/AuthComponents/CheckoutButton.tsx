"use client";

import { useAuth } from '@/hooks/useAuth';
import React from 'react'
import { AuthSheet } from '../auth-sheet';
import { CartItem, paymentMethodType, useCartStore } from '@/store/store';
import { PaystackPaymentButton } from '@/app/(store)/cart/compoenets/PaymentButtons';
import { toast } from 'sonner';
import { useProcessCart } from '@/hooks/useSyncCart';

interface CheckoutButtonProps {
    groupedItems: CartItem[];
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
}

function CheckoutButton({ groupedItems, isLoading, setIsLoading }: CheckoutButtonProps) {
    const { isAuthenticated } = useAuth();
    const { setPaymentMethod } = useCartStore();
    const processCartUpdateInDb = useProcessCart()

    const handleCheckout = (method: paymentMethodType) => {
        if (!isAuthenticated) return false;
        setPaymentMethod(method);

        const itemsWithoutPrice = groupedItems.filter((item) => !item.product.price2);
        if (itemsWithoutPrice.length > 0) {
            toast("Cart Error!", { description: "ome items do not have a price!" })
            throw Error("Some items do not have a price!");
        }

        setIsLoading(true);

        const cartItems = PreapareDBCartItem(groupedItems)
        processCartUpdateInDb.mutate({ cartItems: cartItems }, {
            onSuccess: () => {
                console.log(`Processing payment with ${method}`);
                window.location.href = "/checkout";
            }
        })
    };

    return (
        <>
            {isAuthenticated ? (
                <div className='flex flex-col gap-3 mt-10'>
                    <PaystackPaymentButton
                        onClick={() => handleCheckout('PAYSTACK')}
                        className="w-full sm:w-auto"
                        disabled={isLoading}
                    />

                    {/* <StripePaymentButton
                        onClick={() => handleStripeCheckout()}
                        className="w-full sm:w-auto"
                        disabled={isLoading}
                    /> */}

                    {/* <PaycometPaymentButton
                        onClick={() => handleCheckout('PAYCOMET')}
                        className="w-full sm:w-auto"
                        disabled={isLoading}
                    /> */}
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

export function PreapareDBCartItem(itemGroup: CartItem[]) {
    const cartItems = itemGroup.map((item) => ({
        product_id: String(item.product.id),
        quantity: item.quantity
    }))
    return cartItems;
}