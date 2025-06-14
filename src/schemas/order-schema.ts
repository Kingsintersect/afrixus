import { GetOneResponse, GetAllResponse, CreateResponse, UpdateResponse, DeleteResponse } from "@/types/api-types";

export type Order = {
	id?: number;
	customer_id: number;
	order_number: string;
	total: number;
	status?: string;
	created_at?: Date;
	customerName?: string;
};

export type SingleOrderResponse = GetOneResponse<Order>;
export type AllOrdersResponse = GetAllResponse<Order[]>;
export type CreateOrderResponse = CreateResponse<Order>;
export type UpdateOrderResponse = UpdateResponse<Order>;
export type DeleteOrderResponse = DeleteResponse;

export type OrderItem = {
	id: number;
	name: string;
	brand: string;
	item_price: string;
	quantity: number;
	sum: number;
	type: string;
	picture?: string;
};

export type OrderDetails = {
	id: number;
	trans_type: string;
	transaction_id: string;
	customer_id: string;
	customer: string;
	address: string | null;
	items: OrderItem[];
	total_quantity: string;
	selling_price: string | null;
	total_price: string;
	amount: string;
	email: string;
	receipt_no: string | null;
	telephone1: string | null;
	telephone2: string | null;
	payment_type: string | null;
	state: string | null;
	country: string;
	shipping_cost: string | null;
	txn_ref: string;
	status: string;
	created_at: string;
	updated_at: string;
	tax?: number;
};


export type SingleOrderDetailsResponse = GetOneResponse<OrderDetails>;