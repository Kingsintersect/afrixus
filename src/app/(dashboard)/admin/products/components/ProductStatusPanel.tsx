'use client';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProductFormValues, ProductStatus } from '@/schemas/product-schema';

interface ProductStatusPanelProps {
    form: UseFormReturn<ProductFormValues>;
}

const ProductStatusPanel: React.FC<ProductStatusPanelProps> = ({ form }) => {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Status</h3>
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value?.toString()}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value={ProductStatus.ACTIVE.toString()}>Active</SelectItem>
                                        <SelectItem value={ProductStatus.INACTIVE.toString()}>Inactive</SelectItem>
                                        <SelectItem value={ProductStatus.ARCHIVED.toString()}>Archived</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductStatusPanel;

