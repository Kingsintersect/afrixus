'use client';

import { useState } from 'react';
import { AlertCircle, ShoppingBag } from 'lucide-react';
import { OrderHistorySkeleton } from './componenet/order-history-skeleton';
import { OrderCard } from './componenet/order-card';
import { Pagination } from './componenet/pagination';
import { useFetchCustomerOrders } from '@/hooks/useOrders';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function OrderHistoryPage() {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const pagination = {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0
    }


    const { data: orders, isLoading, error, refetch } = useFetchCustomerOrders();
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleViewDetails = (orderId: string) => {
        router.push(`/orders/${orderId}`);
    };

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
                    <div className="flex items-center mb-4">
                        <div className="bg-blue-600 p-2 rounded-lg mr-3">
                            <ShoppingBag className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
                            <p className="text-gray-600 mt-1">
                                Track and manage your recent purchases
                            </p>
                        </div>
                    </div>

                    {!isLoading && Array.isArray(orders) && orders.length > 0 && (
                        <div className="bg-white rounded-lg border border-gray-200 p-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-gray-600">
                                        Showing {pagination.page} of {pagination.totalPages} pages
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {pagination.total} total orders
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-900">
                                        Orders {((pagination.page - 1) * pagination.limit) + 1} - {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Content */}
                {isLoading ? (
                    <OrderHistorySkeleton />
                ) : Array.isArray(orders) && orders.length === 0 ? (
                    <div className="text-center py-12">
                        <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">
                            No Orders Found
                        </h2>
                        <p className="text-gray-600 mb-6">
                            {`You haven't placed any orders yet. Start shopping to see your order history here.`}
                        </p>
                        <Button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors" asChild>
                            <Link href={"/"}>
                                Start Shopping
                            </Link>
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="space-y-6">
                            {orders?.map((order) => (
                                <OrderCard
                                    key={order.id}
                                    order={order}
                                    onViewDetails={handleViewDetails}
                                    details={false}
                                />
                            ))}
                        </div>

                        <Pagination
                            currentPage={currentPage}
                            totalPages={pagination.totalPages}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
            </div>
        </div>
    );
}

