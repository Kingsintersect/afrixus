"use client";

import { getAllProductsForAdmin } from "@/actions/productAction";
import { DataTable } from "@/components/ui/data-table";
import { useDataTable } from "@/hooks/useDataTable";
import { Product } from "@/schemas/product-schema";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const ProductDataTable = () => {
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
    } = useDataTable<Product>({
        fetchFn: getAllProductsForAdmin,
        queryKey: ["allProducts"],
        initialState: {
            pageIndex: 0,
            pageSize: 10,
            sortBy: "id",
            sortOrder: "desc",
        },
    });

    const productColumns: ColumnDef<Product>[] = [
        {
            accessorKey: "id",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
        },
        {
            accessorKey: "title",
            header: "Product Title",
        },
        {
            accessorKey: "brand",
            header: "Brand",
        },
        {
            accessorKey: "quantity",
            header: "Quantoty",
            cell: ({ row }) => {
                return parseFloat(row.getValue("quantity"));
            },
        },
        {
            accessorKey: "price1",
            header: "Price",
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("price1"));
                return new Intl.NumberFormat("en-NG", {
                    style: "currency",
                    currency: "NGN",
                }).format(amount);
            },
        },
    ];

    return (
        <DataTable<Product, string>
            columns={productColumns}
            fetchedData={data}
            isLoading={isLoading}
            error={error}
            title="Products Management"
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
                    key: "category",
                    label: "Category",
                    options: [
                        { value: "Ankara", label: "Ankara" },
                        { value: "Aso-Oke", label: "Aso-Oke" },
                        { value: "indian-george", label: "indian-george" },
                    ],
                },
            ]}
            enableRowClick
            getRowClickUrl={(product) => `/admin/products/${product.id}`}
        />
    );
};
