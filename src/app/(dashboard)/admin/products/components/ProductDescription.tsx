import { Textarea } from '@/components/ui/textarea';
import { ProductFormValues } from '@/schemas/product-schema';
import React from 'react'
import { UseFormReturn } from 'react-hook-form';


interface ProductDescriptionProps {
    form: UseFormReturn<ProductFormValues>;
}

export const ProductDescription: React.FC<ProductDescriptionProps> = ({ form }) => {

    const {
        register,
        formState: { errors },
    } = form;

    return (
        <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <Textarea
                {...register('description')}
                rows={8}
                placeholder="Enter product description"
            />
            {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
        </div>
    )
}
