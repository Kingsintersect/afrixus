import { Metadata } from 'next';
import React from 'react'
import { OrdersDataTable } from './components/OrdersDataTable';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { SITE_NAME } from '@/lib/config';


export const metadata: Metadata = {
    title: `${SITE_NAME}`,
    description: "A market for high quality fabrics",
};

const OrderPage = async () => {
    return (
        <div className="min-h-screen bg-gray-50 p-6 space-y-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href="/admin">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Dashboard
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
                        <p className="text-muted-foreground">
                            {`Fullfill or cancel customer's orders`}
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
                <OrdersDataTable />
            </div>
        </div>
    );
}

export default OrderPage