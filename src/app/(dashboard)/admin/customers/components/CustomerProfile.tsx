"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, MapPin, Calendar } from 'lucide-react';
import Image from 'next/image';
import { StatusType } from './CustomerDetails';
import { notFound } from 'next/navigation';
import { Customer, } from '@/schemas/customer-schema';

const statusColor: Record<StatusType, string> = {
    active: 'bg-green-100 text-green-700 border-green-200',
    inactive: 'bg-gray-100 text-gray-700 border-gray-200',
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
};

interface CustomerProfileProps {
    customer: Customer | undefined;
    statistics?: {
        totalSpent: number;
        totalOrders: number;
        averageOrderValue: number;
    } | undefined;
}
const CustomerProfile = ({ customer, statistics }: CustomerProfileProps) => {

    if (!customer) return notFound();

    return (
        <div className="col-span-1 sm:col-span-2 space-y-6">
            {/* Customer Profile Card */}
            <Card
                className="overflow-hidden border-t-0"
                style={{ borderTopLeftRadius: '0', borderTopRightRadius: '0' }}
            >
                <CardContent className="p-6">
                    <div className="text-center">
                        <div className="relative w-20 h-20 mx-auto mb-4">
                            <Image
                                src={customer.image || '/default-avatar.png'}
                                alt={customer.first_name}
                                className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                                fill
                            />
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900">{customer.first_name}</h2>
                        <p className="text-gray-500 text-sm mb-3">{customer.email}</p>
                        <Badge className={`${statusColor["active" as StatusType]} font-medium`}>
                            {/* {customer.status} */}
                            {`Active`}
                        </Badge>
                    </div>

                    <div className="mt-6 space-y-3">
                        <div className="flex items-center text-sm text-gray-600">
                            <Phone className="w-4 h-4 mr-2" />
                            {customer.telephone1}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                            <Phone className="w-4 h-4 mr-2" />
                            {customer.telephone2}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="w-4 h-4 mr-2" />
                            {customer.address1}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="w-4 h-4 mr-2" />
                            {customer.address2}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="w-4 h-4 mr-2" />
                            Joined {new Date(customer.created_at ?? new Date()).toLocaleDateString()}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
                <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Quick Stats</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Total Spent</span>
                            <span className="font-semibold text-green-600">₦{statistics?.totalSpent.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Total Orders</span>
                            <span className="font-semibold">{statistics?.totalOrders}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Avg Order Value</span>
                            <span className="font-semibold">₦{statistics?.averageOrderValue.toLocaleString()}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default CustomerProfile