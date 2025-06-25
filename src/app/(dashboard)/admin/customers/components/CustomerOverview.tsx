"use client";

import { Customer } from "@/schemas/customer-schema";

interface CustomerOverviewProps {
    customer: Customer | undefined;
}

const CustomerOverview = ({ customer }: CustomerOverviewProps) => {
    if (!customer) {
        return <div>No customer data available</div>;
    }

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-5">Customer Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div className="flex flex-col-reverse md:block space-y-4 md:space-y-4">
                    <div>
                        <h3 className="font-medium text-gray-900 text-lg">Account Information</h3>
                        <div className="space-y-3 mt-2">
                            <Detail label="Customer ID" value={customer.id} />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="font-medium text-gray-900 text-lg">Activity Summary</h3>
                    <div className="space-y-3 mt-2">
                        <Detail label="Recent Orders" value="4 in last 30 days" />
                        <Detail label="Support Tickets" value="2 resolved this month" />
                        <Detail label="Newsletter" value="Subscribed" />
                        <Detail label="Marketing Emails" value="Enabled" />
                    </div>
                </div>
            </div>

        </div>
    );
}

export default CustomerOverview

function Detail({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div>
            <div className="text-sm text-green-800">{label}</div>
            <div className="text-base font-medium text-gray-900 border-b">{value}</div>
        </div>
    );
}