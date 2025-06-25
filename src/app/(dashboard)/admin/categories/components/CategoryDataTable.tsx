"use client";

import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { useDataTable } from '@/hooks/useDataTable'
import { Category } from "@/schemas/category-schema";
import { getAllCategoriesForAdmin } from "@/actions/categoriesAction";

export const CategoryDataTable = () => {
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
    } = useDataTable<Category>({
        fetchFn: getAllCategoriesForAdmin,
        queryKey: ["allCategories"],
        initialState: {
            pageIndex: 0,
            pageSize: 10,
            sortBy: "id",
            sortOrder: "desc",
        },
    });

    const categoryColumns: ColumnDef<Record<string, unknown>, Category>[] = [
        {
            accessorKey: "id",
            header: "ID",
        },
        {
            accessorKey: "name",
            header: "Category Name",
        },
    ]

    return (
        <DataTable<Record<string, unknown>, Category>
            columns={categoryColumns}
            fetchedData={data}
            isLoading={isLoading}
            error={error}
            title="Category Management"
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
                searchableFields: ["name"],
                placeholder: "Search products by name",
                search,
                setSearch,
            }}
            getRowClickUrl={(category) => `/admin/categories/${category.id}`}
            enableRowClick={true}
        />
    )
}
