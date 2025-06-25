"use client";

import AddToCartButton from "@/components/AddToCartButton";
import CheckoutButton from "@/components/ui/AuthComponents/CheckoutButton";
import Loader from "@/components/ui/Loader";
import { FormatImageUrl } from "@/lib/imageUrl";
import { formatCurrency } from "@/lib/formatCurrency";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { useCartStore } from "@/store/store";
import { useClearCart } from "@/hooks/useSyncCart";

function CartPage() {
    const groupedItems = useCartStore((state) => state.getGroupedItems());
    const clearCartMutation = useClearCart()
    const router = useRouter();

    const [isClient, setIsClient] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) {
        return <Loader />
    }

    const handleClearCart = () => {
        clearCartMutation.mutate()
    }

    if (groupedItems.length === 0) {
        return (
            <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[75vh]">
                <div className="w-20 h-20 sm:w-52 sm:h-52 flex-shrink-0 mr-4">
                    <Image
                        src={"/products/default_product.png"}
                        alt="Empty Cart"
                        className="w-full h-full object-cover rounded"
                        width={96}
                        height={96}
                    />
                </div>
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Cart</h1>
                <p className="text-gray-600 text-lg"> Your cart is empty!</p>
            </div>
        )
    }
    return (
        <div className="container mx-auto p-4 max-w-6xl h-[73vh]">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-grow">
                    {groupedItems?.map((item) => (
                        <div
                            key={item.product.id}
                            className="mb-4 p-4 border rounded flex items-center justify-between"
                        >
                            <div
                                className="flex items-center cursor-pointer flex-1 min-w-0"
                                onClick={() =>
                                    router.push(`/product/${item.product.id}`)
                                }
                            >
                                <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 mr-4">
                                    {item.product.picture && (
                                        <Image
                                            src={FormatImageUrl(item.product.picture[0])}
                                            alt={item.product.title ?? "Product image"}
                                            className="w-full h-full object-cover rounded"
                                            width={96}
                                            height={96}
                                        />
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <h2 className="text-lg sm:text-xl font-semibold truncate">
                                        {item.product.title}
                                    </h2>
                                    <p className="text-sm sm:text-base">
                                        Price:
                                        {formatCurrency((Number(item.product.price2) ?? 0) * item.quantity)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center ml-4 flex-shrink-0">
                                <AddToCartButton product={item.product} />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="w-full lg:w-80 lg:sticky lg:top-4 h-fit bg-white p-6 border rounded order-first lg:order-last fixed bottom-0 left-0 lg:left-auto">
                    <h3 className="text-xl font-semibold">Order Summary</h3>
                    <div className="mt-4 space-y-2">
                        <p className="flex justify-between">
                            <span>Items:</span>
                            <span>
                                {groupedItems.reduce((total, item) => total + item.quantity, 0)}
                            </span>
                        </p>
                        <p className="flex justify-between text-2xl font-bold border-t pt-2">
                            <span>Total: </span>
                            <span>
                                {formatCurrency(useCartStore.getState().getTotalPrice(), "NGN")}
                            </span>
                        </p>
                    </div>

                    <CheckoutButton
                        groupedItems={groupedItems}
                        isLoading={isLoading}
                        setIsLoading={() => setIsLoading}
                    />

                    <Button
                        variant={"destructive"}
                        onClick={handleClearCart}
                        disabled={clearCartMutation.isPending}
                        className="mt-10 w-full bg-red-300 font-bold text-blue-950"
                    >
                        {clearCartMutation.isPending
                            ? <><Loader2Icon className=" animate-spin !h-7 !w-7" /> Clearing...</>
                            : "Clear Cart"}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CartPage
