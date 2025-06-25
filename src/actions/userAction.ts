"use server";

import { apiCall } from "@/lib/api.utils";
import { LoginUserUserSuccess, RegisterUserSuccess, SignInSchemaType, signUpSchemaType } from "@/schemas/auth-schemas";
import { Customer, CustomerDetails } from "@/schemas/customer-schema";
import { auth } from "./auth";
import { UseDataTableOptions } from "@/hooks/useDataTable";

interface CustomerApiResponse {
	status: boolean;
	message?: string;
	data: Customer[];
	total: number;
}


export async function getUser(email: string): Promise<Customer | undefined> {
	console.log('email', email)
	return;
}
export async function getUserById(id: number): Promise<Customer | null> {
	console.log('id', id)

	return null;
}

export async function createUser(formData: signUpSchemaType): Promise<RegisterUserSuccess | null> {
	return await apiCall<signUpSchemaType, RegisterUserSuccess>({
		url: "/customer/register",
		method: "POST",
		data: formData,
	});
}

export async function validateUser(formData: SignInSchemaType): Promise<LoginUserUserSuccess | null> {
	return await apiCall<SignInSchemaType, LoginUserUserSuccess>({
		url: "/customer/login",
		method: "POST",
		data: formData,
	});
}

export async function getAllCustomers({
	pageIndex,
	pageSize,
	sortBy = "id",
	sortOrder = "desc",
	search = "",
	filters = {},
}: UseDataTableOptions): Promise<{ data: Customer[]; total: number }> {
	const session = await auth();

	const query = new URLSearchParams({
		page: (pageIndex + 1).toString(),
		limit: pageSize.toString(),
		sortBy,
		sortOrder,
		search,
		...filters,
	});

	const response = await apiCall<undefined, CustomerApiResponse>({
		url: `/account/allusers?${query.toString()}`,
		method: "GET",
		accessToken: session?.user.access_token,
	});

	if (response?.status && response.data) {
		return {
			data: response.data,
			total: response.data.length,
		};
	} else {
		console.error("Failed to fetch customers");
		return { data: [], total: 0 };
	}
}


export async function getCustomerDetails(
	id: number
): Promise<CustomerDetails | null> {
	const session = await auth();

	const res = await apiCall<undefined, { status: boolean; data: Customer }>({
		url: `/account/user/${id}`,
		method: "GET",
		accessToken: session?.user.access_token,
	});

	if (!res || !res.data) {
		return null;
	}

	return {
		profile: res.data,
		orders: [],
		communications: [],
		stats: {
			totalSpentMoney: 50000,
			totalOrders: 7,
			averageOrderValue: 25,
		},
	}
	// return res.data;
}
