import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/lib/formatCurrency';
import { OrderDetails } from '@/schemas/order-schema';
import React from 'react'

interface CustomerOrdersProps {
    orders: OrderDetails[] | undefined
}

const orderStatusColor: Record<string, string> = {
    completed: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-800',
    shipped: 'bg-blue-100 text-blue-700',
    cancelled: 'bg-red-100 text-red-700',
};

const CustomerOrders = ({ orders }: CustomerOrdersProps) => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">OrderDetails History</h2>
                <Badge className="bg-gray-100 text-gray-700">{orders?.length} orders</Badge>
            </div>

            <div className="space-y-4">
                {orders?.map((order) => (
                    <div key={order.id} className="p-4 border rounded-lg bg-white hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <div className="font-medium text-gray-900">OrderDetails #{order.id}</div>
                                <div className="text-sm text-gray-500">
                                    {order.created_at ? new Date(order.created_at).toLocaleDateString() : 'Unknown date'} • {order.total_quantity} items
                                    {/* {new Date(order.created_at).toLocaleDateString()} • {order.items} items */}
                                </div>
                            </div>
                            <Badge className={orderStatusColor[order.status ?? 'pending'] ?? 'bg-gray-100 text-gray-700'}>
                                {order.status ?? 'pending'}
                            </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="text-lg font-semibold text-gray-900">
                                {formatCurrency(parseInt(order.total_price))}
                            </div>
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CustomerOrders