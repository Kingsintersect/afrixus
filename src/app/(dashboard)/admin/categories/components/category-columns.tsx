"use client";
import { Button } from "@/components/ui/button";
import { Category } from "@/schemas/category-schema";
import { ColumnDef } from "@tanstack/react-table";

export const categoryColumns: ColumnDef<Category>[] = [
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		id: "actions",
		header: "Actions",
		cell: ({ row }) => {
			const category = row.original;
			return (
				<Button
					variant="outline"
					size="sm"
					onClick={() =>
						(window.location.href = `/admin/categories/${category.id}`)
					}>
					Edit
				</Button>
			);
		},
	},
];
