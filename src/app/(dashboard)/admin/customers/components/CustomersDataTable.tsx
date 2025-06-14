import { DataTable } from "@/components/ui/data-table"
import { customersColumns } from "./customers-columns"
import { Customer } from "@/schemas/customer-schema"

interface CustomersDataTableProps {
    data: Customer[]
}

export function CustomersDataTable({ data }: CustomersDataTableProps) {
    return <DataTable columns={customersColumns} data={data} />
}
