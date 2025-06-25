import { Metadata } from 'next';
import React from 'react'
import { CustomersDataTable } from './components/CustomersDataTable';
import { SITE_NAME } from '@/lib/config';


export const metadata: Metadata = {
    title: SITE_NAME,
    description: "A market for high quality fabrics",
};

export default async function Page() {

    return (
        <div className="min-h-screen bg-gray-50 p-6 space-y-4">
            <div className="flex justify-between items-center bg-white rounded-lg shadow-sm border p-6 mb-6">
                <h1 className="text-2xl font-bold">Customers</h1>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
                <CustomersDataTable />
            </div>
        </div>
    );
}