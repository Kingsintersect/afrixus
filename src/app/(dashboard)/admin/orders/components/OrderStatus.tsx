import { OrderDetails } from '@/schemas/order-schema';
import React from 'react'

const OrderStatus = ({ order }: { order: OrderDetails }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Order {order.transaction_id}</h1>
                    <p className="text-gray-600 mt-1">Placed on {formatDate(order.created_at)}</p>
                </div>
                <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status ?? 'processing')}`}>
                        {(order.status ?? 'processing').charAt(0).toUpperCase() + (order.status ?? 'processing').slice(1)}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default OrderStatus

const getStatusColor = (status: string) => {
    switch (status) {
        case 'PROCESSING': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'SHIPPED': return 'bg-teal-100 text-teal-800 border-teal-200';
        case 'DELIVERED': return 'bg-green-100 text-green-800 border-green-200';
        case 'DECLINED': return 'bg-red-100 text-red-800 border-red-200';
        case 'REFUNDED': return 'bg-purple-100 text-purple-800 border-purple-200';
        default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};

const formatDate = (dateString: Date | string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};