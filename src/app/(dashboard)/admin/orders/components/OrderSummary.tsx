import { formatCurrency } from '@/lib/formatCurrency'
import { OrderDetails } from '@/schemas/order-schema'
import React from 'react'

const OrderSummary = ({ order }: { order: OrderDetails }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
            </div>
            <div className="p-6">
                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="text-gray-900">{formatCurrency(Number(order.amount))}</span>
                    </div>
                    {/* <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Shipping</span>
                        <span className="text-gray-900">${order.totals.shipping}</span>
                    </div> */}
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tax</span>
                        <span className="text-gray-900">{order.tax ?? 0.00}</span>
                    </div>
                    <div className="border-t pt-3">
                        <div className="flex justify-between font-semibold">
                            <span className="text-gray-900">Total</span>
                            <span className="text-gray-900">{formatCurrency(Number(order.total_price))}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderSummary
