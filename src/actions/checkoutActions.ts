"use server";

import { CreateCheckoutApiSuccessResponmse, PlaceOrderDataType, VerifyChoutPaymentResponse } from "@/schemas/checkout-schemas";
import { auth } from "./auth";
import { apiCall } from "@/lib/api.utils";


export const submitOrderToPaystack = async (data: PlaceOrderDataType) => {
    const session = await auth();
    console.log("PAYSTACK")

    const response = await apiCall<PlaceOrderDataType, CreateCheckoutApiSuccessResponmse>({
        url: `/orders/shipping`,
        method: "POST",
        accessToken: session?.user.access_token,
        data: data,
    });

    if (!response?.status || !response?.data) {
        console.error("Invalid API response", response);
        throw new Error("Failed to update product");
    }

    return response.data;
};

export const submitOrderToPaycomet = async (data: PlaceOrderDataType) => {
    const session = await auth();
    console.log("PAYCOMET")
    const response = await apiCall<PlaceOrderDataType, CreateCheckoutApiSuccessResponmse>({
        url: `/orders/shipping`,
        method: "POST",
        accessToken: session?.user.access_token,
        data: data,
    });

    if (!response?.status || !response?.data) {
        console.error("Invalid API response", response);
        throw new Error("Failed to update product");
    }

    return response.data;
};

export const verifyCheeckoutPayment = async (query: string): Promise<boolean> => {
    console.log('query', query)
    const session = await auth();
    const res = await apiCall<undefined, VerifyChoutPaymentResponse>({
        url: `/paystack/verify/${query}`,
        method: "GET",
        accessToken: session?.user.access_token,
    });
    return res?.status ? Boolean(res.status) : false;
}


export const fetchShippingRates = async (method: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    return method === 'standard' ? 999 : 1999;
};