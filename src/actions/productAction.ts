"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";
import { Product, ProductFormValues, AllProductsResponse, SingleProductResponse, DeleteProductResponse } from "@/schemas/product-schema";
import { apiCall } from "@/lib/api.utils";
import { auth } from "@/auth";

export async function getAllProducts(): Promise<Product[]> {
	const response = await apiCall<undefined, AllProductsResponse>({
		url: "/product/all",
		method: "GET",
	});

	if (response?.status && response.data?.data) {
		return response.data.data;
	} else {
		console.error("Failed to fetch user data");
		return [];
	}
}

export async function getProductByid(id: number): Promise<Product | null> {
	const response = await apiCall<undefined, SingleProductResponse>({
		url: `/product/${id}`,
		method: "GET",
	});

	if (response?.status && response?.data) {
		return response?.data;
	} else {
		console.error("Failed to fetch user data");
		return null
	}
}

export async function getProductByCategory(id: string): Promise<Product[]> {
	const response = await apiCall<undefined, AllProductsResponse>({
		url: `/product/all/${id}`,
		method: "GET",
	});

	if (response?.status && response.data?.data) {
		return response.data.data;
	} else {
		console.error("Failed to fetch user data");
		return [];
	}
}


export async function searchProductsByName(name: string): Promise<Product[]> {
	const response = await apiCall<undefined, AllProductsResponse>({
		url: "/product/all?search=" + encodeURIComponent(name),
		method: "GET",
	});

	if (response?.status && response.data?.data) {
		return response.data.data;
	} else {
		console.error("Failed to fetch user data");
		return [];
	}
}

export async function createProduct(data: FormData) {
	const session = await auth();

	const response = await apiCall<FormData, SingleProductResponse>({
		url: `/product/add`,
		method: "POST",
		data: data,
		accessToken: session?.user.access_token
	});
	console.log('response?.data', response?.data)
	if (!response?.status || !response?.data) {
		console.error("Invalid API response", response);
		throw new Error("Failed to update product");
	}

	return true;
}

export async function updateProduct(
	values: FormData,
	id: number
): Promise<boolean> {
	const session = await auth();

	const idValue = values.get("id");
	if (!idValue || !id) {
		throw new Error("Product ID is required for update");
	}

	const response = await apiCall<FormData, SingleProductResponse>({
		url: `/product/${id}`,
		method: "PATCH",
		data: values,
		accessToken: session?.user.access_token
	});

	if (!response?.status || !response?.data) {
		console.error("Invalid API response", response);
		throw new Error("Failed to update product");
	}

	return true;
}

export async function deleteProduct(
	id: number
): Promise<DeleteProductResponse> {
	const session = await auth();

	const response = await apiCall<ProductFormValues, DeleteProductResponse>({
		url: `/product/${id}`,
		method: "DELETE",
		accessToken: session?.user.access_token
	});

	if (!response?.status || !response?.message) {
		console.error("Invalid API response", response);
		throw new Error("Failed to update product");
	}

	return response;
}









export async function uploadProductImage(
	formData: File,
	productId: number
) {
	const publicUrl = await PrepareImageUrl(formData);
	const session = await auth();

	if (!productId) {
		throw new Error("Product ID is required for update");
	}

	const response = await apiCall<File, SingleProductResponse>({
		url: `/product/${productId}`,
		method: "PATCH",
		data: formData,
		accessToken: session?.user.access_token
	});

	if (!response?.status || !response?.data) {
		console.error("Invalid API response", response);
		throw new Error("Failed to update product");
	}

	revalidatePath("/admin/products/create");

	return { success: true, url: publicUrl };
}


export async function PrepareImageUrl(fileOrFiles: File | File[]): Promise<string[]> {
	const files = Array.isArray(fileOrFiles) ? fileOrFiles : [fileOrFiles];

	const imageUrls: string[] = [];

	for (const file of files) {
		if (!file || file.size === 0) {
			throw new Error("One or more images are empty or not provided.");
		}

		const buffer = Buffer.from(await file.arrayBuffer());
		const extension = file.name.split(".").pop();
		const uniqueName = `${randomUUID()}.${extension}`;
		const uploadPath = path.join(process.cwd(), "public/uploads", uniqueName);
		const imageUrl = `/uploads/${uniqueName}`;

		await fs.writeFile(uploadPath, buffer);
		imageUrls.push(imageUrl);
	}

	return imageUrls;
}

