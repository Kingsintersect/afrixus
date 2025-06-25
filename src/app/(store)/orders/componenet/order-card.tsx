import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { OrderStatusBadge } from './order-status-badge';
import { Package, Truck, MapPin, CreditCard } from 'lucide-react';
import { OrderDetails } from '@/schemas/order-schema';
import { formatDate } from '@/lib/utils';
import { formatCurrency } from '@/lib/formatCurrency';
import { FormatImageUrl } from '@/lib/imageUrl';

interface OrderCardProps {
    order: OrderDetails;
    onViewDetails?: (orderId: string) => void;
    details?: boolean;
}

export function OrderCard({ order, onViewDetails, details = false }: OrderCardProps) {
    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 border-b">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-lg font-semibold text-gray-900">
                            Order #{order.id}
                            {/* Order #{order.order_number} */}
                        </CardTitle>
                        <p className="text-sm text-gray-600 mt-1">
                            {formatDate(order.created_at as string)}
                        </p>
                    </div>
                    <OrderStatusBadge status={order.status} />
                </div>
            </CardHeader>

            <CardContent className="p-6">
                <div className="space-y-4">
                    {/* Order Items */}
                    {details === true && <div>
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                            <Package className="w-4 h-4 mr-2 text-blue-600" />
                            Items ({order.items.length})
                        </h4>
                        <div className="space-y-2">
                            {order.items.slice(0, 2).map((item) => (
                                <div key={item.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                                    {item.picture && (
                                        <div className="relative w-12 h-12 rounded-md overflow-hidden bg-white border">
                                            <Image
                                                src={FormatImageUrl(item.picture?.[0])}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            {item.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Qty: {item.quantity} × {formatCurrency(item.sum)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            {order.items.length > 2 && (
                                <p className="text-sm text-gray-500 text-center py-2">
                                    +{order.items.length - 2} more items
                                </p>
                            )}
                        </div>
                    </div>}

                    {/* Order Details */}
                    {details === true && <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                        <div className="space-y-2">
                            <div className="flex items-center text-sm">
                                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                                <span className="text-gray-600">
                                    {order.city}, {order.state}
                                </span>
                            </div>
                            <div className="flex items-center text-sm">
                                <CreditCard className="w-4 h-4 mr-2 text-gray-400" />
                                <span className="text-gray-600">{order.payment_type}</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            {order.transaction_id && (
                                <div className="flex items-center text-sm">
                                    <Truck className="w-4 h-4 mr-2 text-gray-400" />
                                    <span className="text-gray-600 font-mono text-xs">
                                        {order.transaction_id}
                                    </span>
                                </div>
                            )}
                            <div className="text-right">
                                <p className="text-lg font-bold text-gray-900">
                                    {formatCurrency(parseInt(order.total_price))}
                                </p>
                            </div>
                        </div>
                    </div>}

                    {/* Actions */}
                    <div className="flex justify-between items-center pt-4 border-t">
                        {onViewDetails && <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onViewDetails?.(String(order.id))}
                            className="hover:bg-blue-50 hover:border-blue-200"
                        >
                            View Details
                        </Button>}

                        {order.status === 'DELIVERED' && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            >
                                Reorder
                            </Button>
                        )}

                        {/* {order.transaction_id && order.status === 'SHIPPED' && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                            >
                                Track Package
                            </Button>
                        )} */}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}