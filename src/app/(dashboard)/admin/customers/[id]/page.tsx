import React from 'react'
import CustomerDetails from '../components/CustomerDetails';

const CustomersDetailspage = async ({
    params
}: {
    params: Promise<{
        id: number
    }>;
}) => {
    const { id } = await params;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">customer Details</h1>
                            <p className="text-gray-600 mt-1">Manage your customer information and settings</p>
                        </div>
                        <div className="flex gap-3">
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1">
                    <CustomerDetails customerId={id} />
                </div>
            </div>
        </div>
    )
}

export default CustomersDetailspage