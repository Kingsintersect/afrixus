import { getOrderDetailsByOrderNumber } from '@/actions/ordersAction';
import { auth } from '@/auth';
import { PagePropsWithId } from '@/lib/definitions';
import { formatCurrency } from '@/lib/formatCurrency';
import { imageUrl } from '@/lib/imageUrl';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react';

async function OrderDetailsPage({
    searchParams,
}: PagePropsWithId) {
    const { orderNumber } = searchParams ? await searchParams : {}
    const session = await auth();
    const userId = session?.user?.id

    if (!userId) {
        return redirect("/");
    }
    const order = await getOrderDetailsByOrderNumber(orderNumber as string);
    if (!order) {
        console.log('Order not found');
        return redirect("/");
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="bg-white p-4 sm:p-8 rounded-xl shadow-lg w-full max-w-4xl">
                <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-8">
                    Details For
                    <span className="text-green-600 text-lg ml-10">{" "}{orderNumber}</span>
                </h1>

                <div className="space-y-6 sm:space-y-8">
                    <div
                        className="block bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
                    >
                        <div className="p-4 sm:p-6 border-b border-gray-200">
                            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-4">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1 font-bold">
                                        Order Number
                                    </p>
                                    <p className="font-mono text-sm text-green-600 break-all">
                                        {order.txn_ref}
                                    </p>
                                </div>
                                <div className="sm:text-right">
                                    <p className="text-sm text-gray-600 mb-1">Order Date</p>
                                    <p className="font-medium">
                                        {order.created_at
                                            ? new Date(order.created_at).toLocaleDateString()
                                            : "N/A"
                                        }
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center px-3">
                                <div className="flex items-center">
                                    <span className="text-sm mr-2">Status:</span>
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm ${order.status === "paid"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-gray-100 text-gray-800"
                                            }`}
                                    >
                                        {order.status}
                                    </span>
                                </div>
                                <div className="sm:text-right">
                                    <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                                    <p className="font-bold text-lg">
                                        {formatCurrency(Number(order.total_price) ?? 0, "NGN")}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="px-4 py-3 sm:px-6 sm:py-4">
                            <p className="text-sm font-semibold text-gray-600 mb-3 sm:mb-4">
                                Order Items
                            </p>

                            <div className="space-y-3 sm:space-y-4">
                                {order.items?.map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3
                                        py-2 bprderb
                                        last:border-b-0"
                                    >
                                        <div className="flex items-center gap-3
                                            sm:gap-4">
                                            {item.picture && (
                                                <div className="relative h-14 w-14 sm:h-16 flex-shrink-0 rounded-md overflow-hidden">
                                                    <Image
                                                        src={imageUrl(item.picture)}
                                                        alt={item.name ?? "Product image"}
                                                        className="object-cover"
                                                        fill
                                                    />
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-medium text-sm sm:text-base">
                                                    {item.name}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    Quantity: {item.quantity ?? "N/A"}
                                                </p>
                                            </div>
                                        </div>

                                        <p className="font-medium text-right of">
                                            {item.item_price && item.quantity
                                                ? formatCurrency(
                                                    Number(item.item_price + item.quantity),
                                                    "NGN"
                                                ) : "N/A"
                                            }
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetailsPage
