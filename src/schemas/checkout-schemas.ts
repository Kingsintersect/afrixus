import { z } from "zod";
import { GetAllResponse, GetOneResponse, SimpleResponse } from "@/types/api-types";

export const checkoutSchema = z.object({
    // Contact Information
    email: z.string().email('Please enter a valid email address'),
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    telephone: z.string().min(10, 'Please enter a valid telephone number').optional(),

    // Shipping Address
    address: z.string().min(5, 'Please enter a valid address'),
    city: z.string().min(2, 'Please enter a valid city'),
    state: z.string().min(2, 'Please enter a valid state'),
    country: z.string().min(2, 'Please select a country'),
    shippingMethod: z.enum(['standard', 'express']),
    // shippingZip: z.string().min(5, 'Please enter a valid ZIP code'),
})

export type CheckoutFormData = z.infer<typeof checkoutSchema>;



export interface PlaceOrderDataType extends CheckoutFormData {
    totalAmount: number;
}

export type CheckoutApiErrorResponse = {
    status: false;
    message: string;
    error: Record<string, string | number>;
};

export type CreateCheckoutApiSuccessResponmse = {
    status: boolean,
    message: string,
    data: {
        authorization_url: string,
        access_code: string,
        reference: string
    },
    response: string
}

export type SingleCheckoutResponse = GetOneResponse<CheckoutFormData>;
export type AllCheckoutResponse = GetAllResponse<CheckoutFormData[]>;

export type CheckoutCartItem = {
    product_id: string;
    quantity: number;
};

export type CheckoutCartData = {
    cartItems: CheckoutCartItem[];
};

export type VerifyChoutPaymentResponse = SimpleResponse