export type RouteParams<T extends string = string> = Promise<{
	[key in T]: string;
}>;

export type SearchParams = Promise<{
	[key: string]: string | string[] | undefined;
}>;

export interface PageTypeProps {
	params: Promise<{ id: string }>;
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export type PagePropsWithId = {
	params: RouteParams<"id">;
	searchParams?: SearchParams;
};

export enum UserRole {
	USER = "USER",
	ADMIN = "ADMIN",
}
export interface Session {
	id: string;
	session_token: string;
	customer_id: string;
	expires: Date;
}

export interface CreateUserData {
	email: string;
	password: string;
	name?: string;
	role?: UserRole;
}
export interface LoginCredentials {
	email: string;
	password: string;
}

export type User = {
	id?: string;
	name: string;
	email: string;
	password: string;
	role: UserRole;
	image_url?: string;
};

export type Invoice = {
	id?: string;
	customer_id: string;
	amount: number;
	date: string;
	status: "pending" | "paid";
};

export type Revenue = {
	month: string;
	revenue: number;
};

export type LatestInvoice = {
	id: string;
	name: string;
	image_url: string;
	email: string;
	amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, "amount"> & {
	amount: number;
};

export type InvoicesTable = {
	id: string;
	customer_id: string;
	name: string;
	email: string;
	image_url: string;
	date: string;
	amount: number;
	status: "pending" | "paid";
};

export type CustomersTableType = {
	id: string;
	name: string;
	email: string;
	image_url: string;
	total_invoices: number;
	total_pending: number;
	total_paid: number;
};

export type FormattedCustomersTable = {
	id: string;
	name: string;
	email: string;
	image_url: string;
	total_invoices: number;
	total_pending: string;
	total_paid: string;
};

export type CustomerField = {
	id: string;
	name: string;
};

export type InvoiceForm = {
	id: string;
	customer_id: string;
	amount: number;
	status: "pending" | "paid";
};

/**
 * GENERATED TYPES
 */
export interface RevenueData {
	month: string;
	revenue: number;
}
export interface DashboardInvoice {
	id: string;
	name: string;
	email: string;
	amount: string;
	image_url: string;
}

export interface RevenueEntry {
	month: string;
	revenue: number;
}

