"use client";
import { Button } from "@/components/ui/button";
import { Customer } from "@/schemas/customer-schema";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export const customersColumns: ColumnDef<Customer>[] = [
	{
		accessorKey: "first_name",
		header: "First Name",
	},
	{
		accessorKey: "email",
		header: "Email",
		cell: ({ row }) => `${row.getValue("email")}`,
	},
	{
		accessorKey: "picture",
		header: "Profile Image",
		cell: ({ row }) => {
			const pic_ref = row.getValue("picture") as string;
			return (
				<div
					data-pic_ref={pic_ref}
					className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border border-gray-300"
				>
					<Image
						// src={pic_ref || "/avatar/default-avatar.jpg"}
						src={"/avatar/default-avatar.jpg"}
						alt="Profile Image"
						width={40}
						height={40}
						className="rounded-full object-contain"
					/>
				</div>
			);
		},
	},
	{
		id: "actions",
		header: "Actions",
		cell: ({ row }) => {
			const customer = row.original;
			return (
				<Button
					variant="outline"
					size="sm"
					onClick={() =>
						(window.location.href = `/admin/customers/${customer.id}`)
					}>
					Edit
				</Button>
			);
		},
	},
];
