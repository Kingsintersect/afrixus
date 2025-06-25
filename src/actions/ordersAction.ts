"use server";

import { auth } from "@/actions/auth";
import { UseDataTableOptions } from "@/hooks/useDataTable";
import { apiCall } from "@/lib/api.utils";
import { AllOrdersResponse, CreateOrderResponse, GetCustomerOrderResponse, OrderDetails } from "@/schemas/order-schema";

interface CategoryApiResponse {
	status: boolean;
	message?: string;
	data: {
		data: OrderDetails[];
		total: number;
	};
}
export async function getAllOrdersForAdmin(options?: UseDataTableOptions): Promise<{ data: OrderDetails[]; total: number }> {
	const session = await auth();
	const {
		pageIndex = 0,
		pageSize = 10,
		sortBy = "id",
		sortOrder = "desc",
		search = "",
		filters = {},
	} = options ?? {};

	const query = new URLSearchParams({
		page: (pageIndex + 1).toString(),
		limit: pageSize.toString(),
		sortBy,
		sortOrder,
		search,
		...filters,
	});

	const response = await apiCall<undefined, CategoryApiResponse>({
		url: `/orders/admin-orders?${query.toString()}`,
		method: "GET",
		accessToken: session?.user.access_token
	});

	if (response?.status && response.data?.data) {
		return {
			data: response.data.data,
			total: response.data.total,
		};
	} else {
		console.error("Failed to fetch categories");
		return { data: [], total: 0 };
	}
}

export async function getAllOrders(): Promise<OrderDetails[]> {
	const session = await auth();

	const res = await apiCall<undefined, AllOrdersResponse>({
		url: `/orders/admin-orders?`,
		method: "GET",
		accessToken: session?.user.access_token
	});

	if (!res || !res.status || !res.data || !Array.isArray(res.data.data)) {
		return [];
	}

	return res.data.data;
}

export async function filterAllOrders(query?: string): Promise<OrderDetails[]> {
	const session = await auth();

	const res = await apiCall<undefined, AllOrdersResponse>({
		url: `/orders/admin-orders?search=${query}`,
		method: "GET",
		accessToken: session?.user.access_token
	});

	if (!res || !res.status || !res.data || !Array.isArray(res.data.data)) {
		return [];
	}

	return res.data.data;
}

export async function getCustomerOrders(): Promise<OrderDetails[]> {
	const session = await auth();

	const res = await apiCall<undefined, { status: boolean; data: GetCustomerOrderResponse }>({
		url: `/orders/all`,
		method: "GET",
		accessToken: session?.user.access_token,
	});

	if (!res || !res.status || !res.data || !Array.isArray(res.data.data)) {
		return [];
	}

	return res.data.data;
}

export async function getCustomerOrdersDetails(id: string): Promise<OrderDetails | null> {
	const session = await auth();

	const res = await apiCall<undefined, { status: boolean; data: OrderDetails }>({
		url: `/orders/${id}`,
		method: "GET",
		accessToken: session?.user.access_token,
	});

	if (!res || !res.data) {
		return null;
	}
	return res.data;
}


type OrderItemInput = {
	productId: number;
	quantity: number;
	price: number;
};
type CreateOrderPayload = [string, string | number, number, number][];
export async function createOrder(
	userId: string,
	items: OrderItemInput[]
): Promise<{ orderId: number | string; orderNumber: string }> {
	const session = await auth();

	const orderNumber = crypto.randomUUID();

	const values: CreateOrderPayload = items.map((item) => [
		orderNumber,
		item.productId,
		item.quantity,
		item.price,
	]);

	const response = await apiCall<CreateOrderPayload, CreateOrderResponse>({
		url: `/orders/create`,
		method: "POST",
		accessToken: session?.user.access_token,
		data: values,
	});

	if (!response?.status || !response?.data) {
		console.error("Invalid API response", response);
		throw new Error("Failed to update product");
	}

	return {
		orderId: response.data.id ?? "",
		orderNumber: String(response.data.id) ?? ""
	};
}