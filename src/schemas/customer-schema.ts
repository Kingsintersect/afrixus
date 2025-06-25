import { UserRole } from "@/lib/definitions";
import { GetAllResponse, GetOneResponse, LoginResponse } from "@/types/api-types";
import { OrderDetails } from "./order-schema";
export interface UserStateType {
	id: number;
	email: string;
	first_name: string;
	role: UserRole;
}

export type Customer = {
	id: number;
	first_name: string;
	last_name: string;
	other_name: string | null;
	username: string | null;
	gender: string | null;
	email: string;
	role: UserRole;
	address1: string | null;
	address2: string | null;
	telephone1: string;
	telephone2: string | null;
	city: string | null;
	state: string | null;
	zipcode: string | null;
	country: string;
	image: string | null;
	account_activation: number;
	tmp: string | null;
	created_by: string | null;
	last_login: string;
	disabled: number;
	deleted: number;
	updated_at: string;
	created_at: string;
};
// Define StatusType if not already defined or import it from the correct module
export type StatusType = "active" | "inactive" | "pending"; // Example values, adjust as needed

export type CustomerWithStatus = Customer & { status: StatusType };

export type SignInResponse = LoginResponse<Customer>;
export type AllCustomersResponse = GetAllResponse<Customer>;
export type CustomersResponse = GetOneResponse<CustomerDetails>;

export interface Communication {
	id: number;
	type: string; // e.g., "email", "call"
	subject: string;
	message: string;
	status: string;
	created_at: string;
}

export interface CustomerDetails {
	profile: Customer;
	orders: OrderDetails[];
	communications: Communication[];
	stats: {
		totalSpentMoney: number;
		totalOrders: number;
		averageOrderValue: number;
	};
}
