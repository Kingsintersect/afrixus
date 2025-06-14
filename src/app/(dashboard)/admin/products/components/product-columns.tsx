"use client";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

export type ProductTableType = {
	id: number;
	title: string;
	price1: number;
	status: string;
};

export const productColumns: ColumnDef<ProductTableType>[] = [
	{
		accessorKey: "title",
		header: "Title",
	},
	{
		accessorKey: "price1",
		header: "Price",
		cell: ({ row }) => `₦ ${(row.getValue("price1") as number).toLocaleString()}`,
	},
	{
		accessorKey: "quantity",
		header: "Quantity",
		cell: ({ row }) => `${(row.getValue("quantity") as number).toLocaleString()}`,
	},
	{
		id: "actions",
		header: "Actions",
		cell: ({ row }) => {
			const product = row.original;
			return (
				<Button
					variant="outline"
					size="sm"
					onClick={() =>
						(window.location.href = `/admin/products/${product.id}`)
					}>
					Edit
				</Button>
			);
		},
	},
];
