import { DataTable } from "@/components/ui/data-table"
import { ordersColumns } from "./orders-columns"
import { Order } from "@/schemas/order-schema"

interface OrdersDataTableProps {
    data: Order[]
}

export function OrdersDataTable({ data }: OrdersDataTableProps) {
    return <DataTable columns={ordersColumns} data={data} />
}
