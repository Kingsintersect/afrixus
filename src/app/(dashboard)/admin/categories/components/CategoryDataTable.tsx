import { DataTable } from "@/components/ui/data-table"
import { categoryColumns } from "./category-columns"
import { Category } from "@/schemas/category-schema"

interface CategoryDataTableProps {
    data: Category[]
}

export function CategoryDataTable({ data }: CategoryDataTableProps) {
    return <DataTable columns={categoryColumns} data={data} />
}
