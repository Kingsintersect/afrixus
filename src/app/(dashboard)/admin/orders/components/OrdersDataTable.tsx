"use client";

import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { useDataTable } from '@/hooks/useDataTable'
import { getAllOrdersForAdmin } from "@/actions/ordersAction";
import { OrderDetails } from "@/schemas/order-schema";

export const OrdersDataTable = () => {
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
    } = useDataTable<OrderDetails>({
        fetchFn: getAllOrdersForAdmin,
        queryKey: ["getallOrder"],
        initialState: {
            pageIndex: 0,
            pageSize: 10,
            sortBy: "id",
            sortOrder: "desc",
        },
    });

    const columns: ColumnDef<Record<string, unknown>, OrderDetails>[] = [
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
            header: "Status",
            cell: ({ row }) => (
                <Badge variant={row.getValue("status") === "SHIPPED" ? "default" : "secondary"}>
                    {row.getValue("status")}
                </Badge>
            ),
        },
    ]

    return (
        <DataTable<Record<string, unknown>, OrderDetails>
            columns={columns}
            fetchedData={data}
            isLoading={isLoading}
            error={error}
            title="Order Management"
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
            filterConfigs={[
                {
                    key: 'status',
                    label: 'Status',
                    options: [
                        { value: 'SHIPPED', label: 'SHIPPED' },
                        { value: 'DELIVERED', label: 'DELIVERED' },
                        { value: 'DECLINED', label: 'DECLINED' }
                    ]
                },
            ]}
            getRowClickUrl={(product) => `/admin/orders/${product.id}`}
            enableRowClick={true}
        />
    )
}

