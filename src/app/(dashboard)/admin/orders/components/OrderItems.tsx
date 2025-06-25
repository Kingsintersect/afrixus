import { formatCurrency } from '@/lib/formatCurrency';
import { FormatImageUrl } from '@/lib/imageUrl';
import { OrderDetails } from '@/schemas/order-schema';
import { Package } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const OrderItems = ({ order }: { order: OrderDetails }) => {
    console.log('order ad', order)
    return (
        <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                    <Package className="h-5 w-5 text-gray-400" />
                    <h2 className="text-lg font-semibold text-gray-900">Order Items</h2>
                </div>
            </div>
            <div className="p-6">
                <div className="space-y-4">
                    {order.items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                            <div className="relative w-16 h-16">
                                <Image
                                    src={FormatImageUrl(item.picture?.[0])}
                                    fill
                                    alt={item.name}
                                    className="w-16 h-16 rounded-lg object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-medium text-gray-900">{item.name}</h4>
                                <p className="text-sm text-green-600 font-bold">Quantity: {item.quantity}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-medium text-green-900">{formatCurrency(item.sum)}</p>
                                <p className="text-sm text-red-600">{item.item_price} each</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default OrderItems
