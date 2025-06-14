import { Metadata } from 'next';
import React from 'react'
import { getAllCustomers } from '@/actions/userAction';
import { CustomersDataTable } from './components/CustomersDataTable';



export const metadata: Metadata = {
    title: 'Customers Management',
};

export default async function Page() {
    const customers = await getAllCustomers() ?? [];

    return (
        <div className="min-h-screen bg-gray-50 p-6 space-y-4">
            <div className="flex justify-between items-center bg-white rounded-lg shadow-sm border p-6 mb-6">
                <h1 className="text-2xl font-bold">Customers</h1>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
                {customers.length === 0 ? (
                    <div className="text-center py-10 text-muted-foreground">No customer found.</div>
                ) : (
                    <CustomersDataTable data={customers.map(p => ({ ...p, status: 'active' }))} />
                )}
            </div>
        </div>
    );
}