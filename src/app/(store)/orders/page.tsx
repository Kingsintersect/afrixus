import { getMyOrders } from "@/actions/ordersAction";
import { formatCurrency } from "@/lib/formatCurrency";
import { auth } from "@/actions/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

async function OrdersPage() {
    const session = await auth();
    const userId = session?.user?.id

    if (!userId) {
        return redirect("/");
    }

    const orders = await getMyOrders(userId);


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 mb-10">
            <div className="bg-white p-4 sm:p-8 rounded-xl shadow-lg w-full max-w-4xl">
                <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-8">
                    My Order History
                </h1>

                {orders?.length === 0 ? (
                    <div className="text-center text-gray-600">
                        <p>You have not placed any orders yet.</p>
                    </div>
                ) : (
                    <div className="space-y-6 sm:space-y-8">
                        {orders && orders.map((order) => (
                            <Link
                                href={`/orders/details?orderNumber=${order.order_number}`}
                                key={order.order_number} className="block bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
                            >
                                <div className="p-4 sm:p-6 border-b border-gray-200">
                                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-4">
                                        <div>
                                            <p className="text-sm text-gray-600 mb-1 font-bold">
                                                Order Number
                                            </p>
                                            <p className="font-mono text-sm text-green-600 break-all">
                                                {order.order_number}
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
                                        <div className="font-bold">
                                            Total Products:
                                            {/* {order.products?.reduce((sum, product) => sum + product.quantity!, 0)} */}
                                        </div>
                                        <div className="sm:text-right">
                                            <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                                            <p className="font-bold text-lg">
                                                {formatCurrency(order.total ?? 0, "NGN")}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default OrdersPage
