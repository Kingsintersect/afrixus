'use client';

import { AlertCircle, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useFetchCustomerOrdersDetails } from '@/hooks/useOrders';
import { OrderHistorySkeleton } from '../componenet/order-history-skeleton';
import { OrderCard } from '../componenet/order-card';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function OrderDetailsPage() {
    const params = useParams();
    const id = params.id as string;

    const { data: orders, isLoading, error, refetch } = useFetchCustomerOrdersDetails(id);

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center py-12">
                        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">
                            Failed to Load Orders
                        </h2>
                        <p className="text-gray-600 mb-4">{error instanceof Error ? error.message : String(error)}</p>
                        <button
                            onClick={() => refetch()}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Link href={`/orders`} className="flex items-center gap5 bg-gray-300 p-1 px-5 rounded-lg mr-3 justify-self-end mb-10 cursor-pointer">
                        <ArrowLeft className="w-6 h-6 text-white" />
                        <span>back to orders</span>
                    </Link>
                    <div className="flex items-center mb-4">
                        <div className="bg-blue-600 p-2 rounded-lg mr-3">
                            <ShoppingBag className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
                            <p className="text-gray-600 mt-1">
                                Track and manage your recent purchases
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                {isLoading ? (
                    <OrderHistorySkeleton />
                ) : !orders ? (
                    <div className="text-center py-12">
                        <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">
                            No Orders Found
                        </h2>
                        <p className="text-gray-600 mb-6">
                            {`You haven't placed any orders yet. Start shopping to see your order history here.`}
                        </p>
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="space-y-6">
                            <OrderCard
                                order={orders}
                                details={true}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
