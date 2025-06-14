import { Metadata } from 'next';
import React from 'react'
import { OrdersDataTable } from './components/OrdersDataTable';
import { getAllOrders } from '@/actions/ordersAction';



export const metadata: Metadata = {
    title: 'Order Management',
};

const OrderPage = async () => {
    const orders = await getAllOrders() ?? [];

    return (
        <div className="min-h-screen bg-gray-50 p-6 space-y-4">
            <div className="flex justify-between items-center bg-white rounded-lg shadow-sm border p-6 mb-6">
                <h1 className="text-2xl font-bold">Orders</h1>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
                {orders.length === 0 ? (
                    <div className="text-center py-10 text-muted-foreground">No customer found.</div>
                ) : (
                    <OrdersDataTable data={orders.map(p => ({ ...p, status: 'active' }))} />
                )}
            </div>
        </div>
    );
}

export default OrderPage