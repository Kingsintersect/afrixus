"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/store";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function SuccessPage() {
    const searchParams = useSearchParams();
    const orderNumber = searchParams.get("orderNumber");
    const clearCart = useCartStore((state) => state.clearCart);
    const sessionId = searchParams.get("session_id");

    useEffect(() => {
        if (orderNumber) {
            clearCart();
        }
    }, [orderNumber, clearCart])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white p-12 rounded-xl shadow-lg max-w-2xl w-full mx-4">
                <div className="flex justify-center mb-8">
                    <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                        <svg
                            className="h-8 w-8 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                </div>

                <h1 className="text-4xl font-bold mb-6 text-center">
                    Thank You For Your Order!
                </h1>

                <div className="border-1 border-b border-gray-200 py-6 mb-6">
                    <p className="text-lg text-gray-700 mb-4">
                        Your order has been confirmed and will be shiped shortly.
                    </p>
                    <div className="space-y-2">
                        {orderNumber && (
                            <p className="text-gray-600 flex items-center space-x-5">
                                <span>Order Number:</span>
                                <span className="font-mono text-sm text-green-600">
                                    {orderNumber}
                                </span>
                            </p>
                        )}
                        {sessionId && (
                            <p className="text-gray-600 flex justify-between">
                                <span>Transaction ID:</span>
                                <span className="font-mono text-sm">{sessionId}</span>
                            </p>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <p className="text-gray-600">
                        A confirmation email has been sent to your registration email address.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild className="bg-green-600 hover:bg-green-700">
                            <Link href={"/orders"}>View Order Details</Link>
                        </Button>
                        <Button asChild variant={'outline'}>
                            <Link href={"/"}>Continue Shopping</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
