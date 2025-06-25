"use client";

import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { useDataTable } from '@/hooks/useDataTable'
import { getAllCustomers } from "@/actions/userAction";
import { Customer } from "@/schemas/customer-schema";
import Image from "next/image";
import { FormatImageUrl } from "@/lib/imageUrl";

export const CustomersDataTable = () => {
    const {
        data = [],
        isLoading,
        error,
        total,
        pageIndex,
        pageSize,
        setPageIndex,
        setPageSize,
        search,
        setSearch,
        setFilter,
        setSorting,
    } = useDataTable<Customer>({
        fetchFn: getAllCustomers,
        queryKey: ["allProducts"],
        initialState: {
            pageIndex: 0,
            pageSize: 10,
            sortBy: "id",
            sortOrder: "desc",
        },
    });

    const customersColumns: ColumnDef<Record<string, unknown>, Customer>[] = [
        {
            accessorKey: "id",
            header: "ID",
        },
        {
            accessorKey: "email",
            header: "Email",
            cell: ({ row }) => `${row.getValue("email")}`,
        },
        {
            accessorKey: "first_name",
            header: "First Name",
        },
        {
            accessorKey: "last_name",
            header: "Last Name",
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
                            src={FormatImageUrl(pic_ref ?? "/avatar/default-avatar.jpg")}
                            alt="Profile Image"
                            width={40}
                            height={40}
                            className="rounded-full object-contain"
                        />
                    </div>
                );
            },
        },
    ]

    return (
        <DataTable<Record<string, unknown>, Customer>
            columns={customersColumns}
            fetchedData={data}
            isLoading={isLoading}
            error={error}
            title="User Info View"
            pageIndex={pageIndex}
            pageSize={pageSize}
            totalItems={total}
            onPaginationChange={(page, size) => {
                setPageIndex(page);
                setPageSize(size);
            }}
            onSortChange={(field, order) => {
                setSorting([{ id: field, desc: order === "desc" }]);
            }}
            onSearchChange={setSearch}
            onFilterChange={(updated) => {
                Object.entries(updated).forEach(([key, value]) =>
                    setFilter(key, value)
                );
            }}
            searchConfig={{
                searchableFields: ["title", "category", "id"],
                placeholder: "Search products by title, category, or ID...",
                search,
                setSearch,
            }}
            getRowClickUrl={(customer) => `/admin/customers/${customer.id}`}
            enableRowClick={false}
        />
    )
}
