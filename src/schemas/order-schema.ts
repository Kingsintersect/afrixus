import { GetOneResponse, GetAllResponse, CreateResponse } from "@/types/api-types";


export type OrderItem = {
	id: string | number;
	name: string;
	brand: string;
	quantity: number;
	item_price: number;
	picture?: string | string[];
	sum: number;
};

export type OrderDetails = {
	id: number;
	items: OrderItem[];
	trans_type: string;
	transaction_id: string;
	customer_id: string;
	customer: string;
	address: string | null;
	total_quantity: string;
	selling_price: string | null;
	total_price: string;
	amount: string;
	email: string;
	receipt_no: string | null;
	telephone1: string | null;
	telephone2: string | null;
	payment_type: string | null;
	city: string,
	state: string | null;
	country: string;
	shipping_cost: string | null;
	txn_ref: string;
	status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'DECLINED' | "REFUNDED";
	created_at: string;
	updated_at: string;
	tax?: number;
};


export type SingleOrderResponse = GetOneResponse<OrderDetails>;
export type AllOrdersResponse = GetAllResponse<OrderDetails[]>;
export type CreateOrderResponse = CreateResponse<OrderDetails>;
export type GetCustomerOrderResponse = GetAllResponse<OrderDetails[]>

export type SingleOrderDetailsResponse = GetOneResponse<OrderDetails>;