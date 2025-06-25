'use client'

import { OrderDetails } from '@/schemas/order-schema';
import { Check, RefreshCw, X } from 'lucide-react';
import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type OrderAction = 'fulfill' | 'refund' | 'cancel';

const simulateApiCall = (action: string) =>
    new Promise<Partial<OrderDetails>>(resolve => {
        setTimeout(() => {
            if (action === 'fulfill') {
                resolve({ status: 'SHIPPED' });
            } else if (action === 'cancel') {
                resolve({ status: 'DECLINED' });
            } else if (action === 'refund') {
                resolve({
                    status: 'REFUNDED',
                    payment: { status: 'REFUNDED' }
                } as Partial<OrderDetails>);
            }
        }, 1500);
    });

const OrderActions = ({ order }: { order: OrderDetails }) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (action: 'fulfill' | 'refund' | 'cancel') => simulateApiCall(action),
        onMutate: async (action: OrderAction) => {
            // Optional: optimistic update
            console.log('action', action)
            await queryClient.cancelQueries({ queryKey: ['order', order.id] });
        },
        onSuccess: (updatedFields) => {
            // Update the cached data
            queryClient.setQueryData<OrderDetails>(['order', order.id], (old) =>
                old ? { ...old, ...updatedFields } : old
            );
        },
        onError: (error) => {
            console.error('Order update failed:', error);
        }
    });

    const isLoading = (action: string) => mutation.isPending && mutation.variables === action;

    return (
        <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Order Actions</h2>
            </div>
            <div className="p-6 space-y-3">
                {order.status === 'PROCESSING' && (
                    <button
                        onClick={() => mutation.mutate('fulfill')}
                        disabled={mutation.isPending}
                        className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {isLoading('fulfill') ? (
                            <RefreshCw className="h-4 w-4 animate-spin" />
                        ) : (
                            <Check className="h-4 w-4" />
                        )}
                        <span>Mark as Fulfilled</span>
                    </button>
                )}

                {/* {(order.status === 'processing' || order.status === 'SHIPPED') &&
                    order.payment.status === 'paid' && (
                        <button
                            onClick={() => mutation.mutate('refund')}
                            disabled={mutation.isPending}
                            className="w-full flex items-center justify-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isLoading('refund') ? (
                                <RefreshCw className="h-4 w-4 animate-spin" />
                            ) : (
                                <CreditCard className="h-4 w-4" />
                            )}
                            <span>Process Refund</span>
                        </button>
                    )} */}

                {order.status === 'PROCESSING' && (
                    <button
                        onClick={() => mutation.mutate('cancel')}
                        disabled={mutation.isPending}
                        className="w-full flex items-center justify-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {isLoading('cancel') ? (
                            <RefreshCw className="h-4 w-4 animate-spin" />
                        ) : (
                            <X className="h-4 w-4" />
                        )}
                        <span>Cancel Order</span>
                    </button>
                )}

                {['DECLINED', 'refunded', 'SHIPPED'].includes(order.status) && (
                    <div className="text-center text-sm text-gray-500 py-4">
                        No actions available for {order.status} orders
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderActions;
