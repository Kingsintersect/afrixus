"use server";

import { apiCall } from "@/lib/api.utils";
import { SignInSchemaType, signUpSchemaType } from "@/schemas/auth-schemas";
import { Customer, CustomerDetails, SignInResponse } from "@/schemas/customer-schema";

export async function getUser(email: string): Promise<Customer | undefined> {
	console.log('email', email)
	return;
}
export async function getUserById(id: number): Promise<Customer | null> {
	console.log('id', id)

	return null;
}

export async function createUser(formData: signUpSchemaType): Promise<Customer | null> {
	console.log("formData", formData);
	return await apiCall<signUpSchemaType, Customer>({
		url: "/customer/register",
		method: "POST",
		data: formData,
	});
}

export async function validateUser(formData: SignInSchemaType): Promise<SignInResponse | null> {
	return await apiCall<SignInSchemaType, SignInResponse>({
		url: "/customer/login",
		method: "POST",
		data: formData,
	});
}

export async function getAllCustomers(): Promise<Customer[]> {
	return [];
}

export async function getAllCustomerDetails(
	id: number
): Promise<CustomerDetails | null> {
	console.log('id', id)

	return null;
}
