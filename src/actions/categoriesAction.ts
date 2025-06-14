"use server";

import { auth } from "@/auth";
import { apiCall } from "@/lib/api.utils";
import { AllCategorysResponse, Category, CategoryFormValues, categorySchema, CreateCategoryResponse, DeleteCategoryResponse, SingleCategoryResponse } from "@/schemas/category-schema";

export async function getAllCategories() {
	const response = await apiCall<undefined, AllCategorysResponse>({
		url: "/category/all?limit=10&page=1",
		method: "GET",
	});

	if (response?.status && response.data?.data) {
		return response.data.data;
	} else {
		console.error("Failed to fetch user data");
		return [];
	}
}

export async function getCategoryById(id: number): Promise<Category | null> {
	const response = await apiCall<undefined, SingleCategoryResponse>({
		url: `/category/${id}`,
		method: "GET",
	});

	if (response?.status && response?.data) {
		return response?.data;
	} else {
		console.error("Failed to fetch user data");
		return null
	}
}

export async function createCategory(
	data: Omit<CategoryFormValues, "id">
): Promise<boolean> {
	const session = await auth();
	const parsed = categorySchema.safeParse(data);
	if (!parsed.success) throw new Error("Invalid category data");

	const response = await apiCall<CategoryFormValues, CreateCategoryResponse>({
		url: "/category/add",
		method: "POST",
		data: data,
		accessToken: session?.user.access_token,
	});
	console.log('response', response)

	if (!response?.status || !response?.data) {
		console.error("Invalid API response", response);
		throw new Error("Failed to update category");
	}

	return true;
}

export async function updateCategory(
	values: CategoryFormValues,
	id: number
): Promise<boolean> {
	const session = await auth();

	const response = await apiCall<CategoryFormValues, SingleCategoryResponse>({
		url: `/category/${id}`,
		method: "PATCH",
		data: values,
		accessToken: session?.user.access_token,
	});

	if (!response?.status || !response?.data) {
		console.error("Invalid API response", response);
		throw new Error("Failed to update category");
	}

	return true;
}


export async function deleteCategory(
	id: number
): Promise<DeleteCategoryResponse> {
	const session = await auth();

	const response = await apiCall<CategoryFormValues, DeleteCategoryResponse>({
		url: `/category/${id}`,
		method: "DELETE",
		accessToken: session?.user.access_token
	});

	if (!response?.status || !response?.message) {
		console.error("Invalid API response", response);
		throw new Error("Failed to update category");
	}

	return response;
}