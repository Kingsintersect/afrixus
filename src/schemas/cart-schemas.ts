import { Product } from "./product-schema";

export type CartItem = {
    id: number;
    customer_id: number;
    product_id: number;
    quantity: number;
    added_at: string;
};

export type CartItemWithProduct = CartItem & {
    product: Product;
};