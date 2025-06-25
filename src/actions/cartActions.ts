"use server";

import { AllCartResponse, DeleteCartResponse, UpdateCartResponse, UpdateDBCartItem } from "@/schemas/cart-schemas";
import { auth } from "./auth";
import { apiCall } from "@/lib/api.utils";
import { CartItem } from "@/store/store";
import { CheckoutCartData } from "@/schemas/checkout-schemas";

export const syncCartItem = async ({ product_id, quantity }: UpdateDBCartItem) => {
    const session = await auth();
    if (!session?.user.access_token) throw new Error("Authorization Failed")
    const res = await apiCall<UpdateDBCartItem, UpdateCartResponse>({
        url: `/cart/add`,
        method: "POST",
        accessToken: session?.user.access_token,
        data: { product_id: product_id, quantity },
    });

    if (!res?.data) throw new Error("Unable to add to your cart item");
    return res.data;
};

export const fetchDBCart = async (accessToken?: string): Promise<CartItem[]> => {
    const res = await apiCall<undefined, AllCartResponse>({
        url: `/cart/all`,
        method: "GET",
        accessToken: accessToken,
    });

    return Array.isArray(res?.data) ? res.data : [];
};


export const updateLocalCartData = async (data: CheckoutCartData): Promise<CartItem[]> => {
    const session = await auth();

    const res = await apiCall<CheckoutCartData, AllCartResponse>({
        url: `/cart/add-many`,
        method: "POST",
        accessToken: session?.user.access_token,
        data: data,
    });
    if (!res || !res.status || !res.data || !Array.isArray(res.data)) {
        return [];
    }

    return res.data;
}

export const DeleteCartData = async (): Promise<boolean> => {
    const session = await auth();
    const res = await apiCall<undefined, DeleteCartResponse>({
        url: `/cart/delete`,
        method: "DELETE",
        accessToken: session?.user.access_token,
    });
    if (!res?.data) throw new Error("Unable to clear your cart");
    return true;
};
