"use client";
import { Button } from "@/components/ui/button";
import { OrderDetails } from "@/schemas/order-schema";
import { ColumnDef } from "@tanstack/react-table";

export const ordersColumns: ColumnDef<OrderDetails>[] = [
	{
		accessorKey: "transaction_id",
		header: "Transaction ID",
	},
	{
		accessorKey: "total_quantity",
		header: "Quantity",
		cell: ({ row }) => `${row.getValue("total_quantity")}`,
	},
	{
		accessorKey: "total_price",
		header: "Total Price",
		cell: ({ row }) => `${row.getValue("total_price")}`,
	},
	{
		accessorKey: "customer",
		header: "Customer Name",
		cell: ({ row }) => `${row.getValue("customer")}`,
	},
	{
		accessorKey: "status",
		header: "Order Status",
		cell: ({ row }) => `${row.getValue("status")}`,
	},
	{
		id: "actions",
		header: "Actions",
		cell: ({ row }) => {
			const order = row.original;
			return (
				<Button
					variant="outline"
					size="sm"
					onClick={() =>
						(window.location.href = `/admin/orders/${order.id}`)
					}>
					Edit
				</Button>
			);
		},
	},
];
