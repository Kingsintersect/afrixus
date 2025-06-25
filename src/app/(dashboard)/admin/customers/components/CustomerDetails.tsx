"use client";

import { Card, CardContent } from '@/components/ui/card';
import CustomerProfile from './CustomerProfile';
import { useState } from 'react';
import CustomerOrders from './CustomerOrders';
import CustomerOverview from './CustomerOverview';
import Navigation from './Navigation';
import { useQuery } from '@tanstack/react-query';
import { getCustomerDetails } from '@/actions/userAction';

export type StatusType = 'active' | 'inactive' | 'pending';

const CustomerDetails = ({ customerId }: { customerId: number }) => {
    const [activeSection, setActiveSection] = useState('overview');

    const { data: customerDetails, isLoading } = useQuery({
        queryKey: ['category', customerId],
        queryFn: async () => {
            const customer = await getCustomerDetails(customerId);
            if (!customer) throw new Error("Customer not found");
            return customer;
        },
    });

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="grid mb-2">
                    {/* Navigation Menu */}
                    <Navigation
                        activeSection={activeSection}
                        setActiveSection={setActiveSection}
                    />
                </div>
                <div className="sm:grid sm:grid-cols-5 gap-6 flex flex-col-reverse">
                    {/* Sidebar */}
                    <CustomerProfile
                        customer={customerDetails?.profile}
                        statistics={customerDetails?.stats ? {
                            ...customerDetails.stats,
                            totalSpent: customerDetails.stats.totalSpentMoney
                        } : undefined}
                    />

                    {/* Main Content */}
                    <div className="col-span-1 sm:col-span-3 flex-1">
                        <Card
                            className="min-h-96  border-t-0"
                            style={{ borderTopLeftRadius: '0', borderTopRightRadius: '0' }}
                        >
                            <CardContent className="p-6">
                                {activeSection === 'overview' && (
                                    <CustomerOverview customer={customerDetails?.profile} />
                                )}

                                {activeSection === 'orders' && (
                                    <CustomerOrders
                                        orders={customerDetails?.orders}
                                    />
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerDetails

