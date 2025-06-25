'use client';

import React, { useState } from 'react';
import { Package } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { ProductFormValues } from '@/schemas/product-schema';

interface ProductTabsProps {
    form: UseFormReturn<ProductFormValues>;
}


const ProductTabs: React.FC<ProductTabsProps> = ({ form }) => {
    const [activeTab, setActiveTab] = useState('general');

    const {
        register,
        formState: { errors },
    } = form;


    const tabs = [
        { id: 'general', label: 'General', icon: Package },
    ];

    return (
        <div className="bg-white rounded-lg shadow-sm border">
            {/* Tabs Header */}
            <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            type="button"
                            className={`flex items-center gap-2 py-4 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Tabs Content */}
            <div className="p-6">
                {/* General Tab */}
                {activeTab === 'general' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-1">Product Name</label>
                                <Input {...register('title')} placeholder="Enter product title" />
                                {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Price (#)</label>
                            <Input
                                type="number"
                                step="0.01"
                                {...form.register("price1")}
                            />
                            {errors.price2 && (
                                <p className="text-sm text-red-500 mt-2">{errors.price2.message}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Price (#)</label>
                            <Input
                                type="number"
                                step="0.01"
                                {...form.register("price2")}
                            />
                            {errors.price2 && (
                                <p className="text-sm text-red-500 mt-2">{errors.price2.message}</p>
                            )}
                        </div>
                        <hr />
                        <div>
                            <label className="block text-sm font-medium mb-1">Quantity</label>
                            <Input
                                type="number"
                                step="0.01"
                                {...form.register("quantity", { valueAsNumber: true })}
                            />
                            {errors.quantity && (
                                <p className="text-sm text-red-500 mt-2">{errors.quantity.message}</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductTabs;

