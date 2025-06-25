import { CreateResponse, DeleteResponse, GetAllResponse, GetOneResponse, UpdateResponse } from "@/types/api-types";
import { z } from "zod";


export enum ProductStatus {
	ACTIVE = 1,
	INACTIVE = 0,
	ARCHIVED = 2,
}
export interface Product {
	[key: string]: unknown;
	id: number;
	title: string;
	description: string;
	category: number;
	brand: string | null;
	price1: string;
	price2: string;
	picture: string[] | string | null;
	quantity: number;
	status?: ProductStatus;
	images?: File[] | undefined;
}

export type SingleProductResponse = GetOneResponse<Product>;
export type AllProductsResponse = GetAllResponse<Product[]>;
export type CreateProductResponse = CreateResponse<Product>;
export type UpdateProductResponse = UpdateResponse<Product>;
export type DeleteProductResponse = DeleteResponse;
export type DeleteProductImageResponse = DeleteResponse;
export type DeleteProductImagePayload = {
	images_to_delete: string[];
};



// Max file size (e.g., 5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const productSchema = z.object({
	id: z.number().optional(),
	title: z.string().min(1, "Title is required"),
	description: z.string().min(1, "Description is required"),
	category: z.string().min(1, "Category is required"),
	brand: z.string().nullable(),
	price1: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
	price2: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
	images: z
		.array(z.instanceof(File))
		.optional()
		// .default([]) // ensures it's always defined as an array
		.refine((files) => files ? files.every(file => file.size <= MAX_FILE_SIZE) : true, "Each image must be ≤ 5MB")
		.refine((files) => files ? files.every(file => ACCEPTED_IMAGE_TYPES.includes(file.type)) : true, "Unsupported image type"),

	picture: z.array(z.string()).optional(),
	quantity: z.number().min(0, "Quantity cannot be negative"),
	// status: z.nativeEnum(ProductStatus).optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;
