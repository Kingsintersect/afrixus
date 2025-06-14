import { OrderDetails } from '@/schemas/order-schema'
import { Mail, MapPin, Phone, User } from 'lucide-react'
import React from 'react'

const CustomerInfo = ({ order }: { order: OrderDetails }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-gray-400" />
                    <h2 className="text-lg font-semibold text-gray-900">Customer Information</h2>
                </div>
            </div>
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-medium text-gray-900 mb-2">Contact Details</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                            <p className="font-medium text-gray-900">{order.customer}</p>
                            <div className="flex items-center space-x-2">
                                <Mail className="h-4 w-4" />
                                <span>{order.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Phone className="h-4 w-4" />
                                <span>{order.telephone1}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-900 mb-2">Billing Address</h3>
                        <div className="text-sm text-gray-600">
                            <div className="flex items-start space-x-2">
                                <MapPin className="h-4 w-4 mt-0.5" />
                                <div>
                                    <p>{order.address}</p>
                                    <p>
                                        {/* {order.customer.address.city}, */}
                                        {order.state}
                                        {/* {order.customer.address.zip} */}
                                    </p>
                                    <p>{order.country}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerInfo
