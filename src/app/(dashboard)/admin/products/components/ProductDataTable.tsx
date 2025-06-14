import { DataTable } from "@/components/ui/data-table"
import { productColumns } from "./product-columns"
import type { ProductTableType as ProductColumnsType } from "./product-columns"

interface ProductDataTableProps {
    data: ProductColumnsType[]
}

export function ProductDataTable({ data }: ProductDataTableProps) {
    return <DataTable columns={productColumns} data={data} />
}
