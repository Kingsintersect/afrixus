"use client";

import { DeleteCartData, fetchDBCart, syncCartItem, updateLocalCartData } from "@/actions/cartActions";
import { toastApiError, toastSuccess } from "@/lib/toastApiError";
import { CheckoutCartData } from "@/schemas/checkout-schemas";
import { Product } from "@/schemas/product-schema";
import { CartItem, useCartStore } from "@/store/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { toast } from "sonner";

export const addItemToCart = async (product: Product) => {
    const {
        addToCart,
        setProductProcessing,
        processingMap,
        cartItems,
    } = useCartStore.getState();

    const isProcessing = processingMap[product.id];
    if (isProcessing) return;

    setProductProcessing(String(product.id), true);
    addToCart(product);

    const updatedItem = cartItems.find(i => i.product.id === product.id);
    const quantity = updatedItem ? updatedItem.quantity + 1 : 1;

    await syncCartItem({ product_id: String(product.id), quantity });
    setProductProcessing(String(product.id), false);
};

export const removeItemFromCart = async (productId: string) => {
    const {
        removeFromCart,
        setProductProcessing,
        processingMap,
        cartItems,
    } = useCartStore.getState();

    const isProcessing = processingMap[productId];
    if (isProcessing) return;

    setProductProcessing(productId, true);
    removeFromCart(productId);

    const updatedItem = cartItems.find(i => i.product.id === Number(productId));
    const quantity = updatedItem ? updatedItem.quantity - 1 : 0;

    // if (quantity <= 0) {
    //     await DeleteCartData(`/api/cart/${productId}`);
    // } else {
    await syncCartItem({ product_id: productId, quantity });
    // }
    setProductProcessing(productId, false);
};

export const useSyncCart = () => {
    const setCart = useCartStore(state => state.setCart);
    const { data: session, status } = useSession();

    useEffect(() => {
        const fetchCart = async () => {
            try {
                if (status === "unauthenticated") return;

                const data = await fetchDBCart(session?.user?.access_token);

                const items = data.map((item: CartItem) => ({
                    product: {
                        ...item.product,
                        id: Number(item.product.id),
                    },
                    quantity: Number(item.quantity),
                }));

                setCart(items);
            } catch (err) {
                console.error("Failed to load cart from DB", err);
            }
        };

        fetchCart();
    }, [setCart, session?.user?.id, session?.user?.access_token, status]);
};

export function useClearCart() {
    const queryClient = useQueryClient();
    const { clearCart } = useCartStore();

    return useMutation({
        mutationFn: DeleteCartData,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
            toast.success("Cart cleared successfully.");
            clearCart();
        },
        onError: (error) => {
            toast.error("Failed to clear cart.");
            console.error(error);
        },
    });
}

export function useProcessCart() {
    return useMutation({
        mutationFn: async (data: CheckoutCartData) => {
            const result = await updateLocalCartData(data);
            return result;
        },
        onSuccess: (result) => {
            toastSuccess("Cart updated successfully.");
            console.log('result', result)
        },
        onError: (error) => {
            toastApiError(error, "Failed to update cart.");
            console.error(error);
        },
    });
}