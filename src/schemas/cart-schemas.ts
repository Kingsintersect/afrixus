import { CreateResponse, GetAllResponse } from "@/types/api-types";
import { Product } from "./product-schema";

export type DBCartItem = {
    item: string,
    user_id: string,
    quantity: number;
    product: Product;
};

export type UpdateDBCartItem = {
    product_id: string,
    quantity: number;
};


export type AllCartResponse = GetAllResponse<DBCartItem[]>;
export type UpdateCartResponse = CreateResponse<DBCartItem[]>;
export type DeleteCartResponse = GetAllResponse<DBCartItem[]>;