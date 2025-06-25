'use client';

import React, { use } from 'react'
import { notFound } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getCustomerOrdersDetails } from '@/actions/ordersAction';
import OrderStatus from '../components/OrderStatus';
import CustomerInfo from '../components/CustomerInfo';
import OrderItems from '../components/OrderItems';
import OrderSummary from '../components/OrderSummary';
import OrderActions from '../components/OrderActions';

const OrderDetailspage = (props: { params: Promise<{ id: string }> }) => {
    const params = use(props.params)
    const id = params.id

    const { data: orderDetails, isLoading } = useQuery({
        queryKey: ['orderManagement', id],
        queryFn: async () => {
            const orders = await getCustomerOrdersDetails(id);
            if (!orders) throw new Error("Order Details not found");
            return orders;
        },
    });

    if (isLoading) return <div>Loading...</div>;
    if (!orderDetails) return notFound();

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <OrderStatus order={orderDetails} />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Customer Information */}
                        <CustomerInfo order={orderDetails} />

                        {/* Order Items */}
                        <OrderItems order={orderDetails} />

                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Order Summary */}
                        <OrderSummary order={orderDetails} />

                        {/* Order Actions */}
                        <OrderActions order={orderDetails} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetailspage
