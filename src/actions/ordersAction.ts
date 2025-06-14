"use server";

import { auth } from "@/actions/auth";
import { apiCall } from "@/lib/api.utils";
import { AllOrdersResponse, CreateOrderResponse, Order, OrderDetails, SingleOrderDetailsResponse } from "@/schemas/order-schema";

export async function getAllOrders(): Promise<Order[]> {
	const session = await auth();

	const response = await apiCall<undefined, AllOrdersResponse>({
		url: "/orders/all",
		method: "GET",
		accessToken: session?.user.access_token
	});

	if (response?.status && response.data?.data) {
		return response.data.data;
	} else {
		console.error("Failed to fetch user data");
		return [];
	}
}

export async function getCustomerOrderDetailsById(
	orderId: number
): Promise<OrderDetails | null> {
	const session = await auth();

	const response = await apiCall<undefined, SingleOrderDetailsResponse>({
		url: `/orders/${orderId}`,
		method: "GET",
		accessToken: session?.user.access_token
	});

	if (response?.status && response?.data) {
		return response.data;
	} else {
		console.error("Failed to fetch user data");
		return null;
	}
}

export async function getMyOrders(userId: string): Promise<Order[] | null> {
	const session = await auth();

	const response = await apiCall<undefined, AllOrdersResponse>({
		url: `/orders/${userId}`,
		method: "GET",
		accessToken: session?.user.access_token
	});

	if (response?.status && response?.data.data) {
		return response.data.data;
	} else {
		console.error("Failed to fetch user data");
		return null
	}
}

export async function getOrderDetailsByOrderNumber(
	orderId: string
): Promise<OrderDetails | null> {
	const session = await auth();

	const response = await apiCall<undefined, SingleOrderDetailsResponse>({
		url: `/orders/${orderId}`,
		method: "GET",
		accessToken: session?.user.access_token
	});

	if (response?.status && response?.data) {
		return response.data
	} else {
		console.error("Failed to fetch user data");
		return null
	}
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
		orderNumber: response.data.order_number ?? ""
	};
}
