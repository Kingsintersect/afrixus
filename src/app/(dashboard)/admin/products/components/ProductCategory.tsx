import { getAllCategories } from '@/actions/categoriesAction';
import { ProductFormValues } from '@/schemas/product-schema';
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';


interface Category {
    id: number;
    name: string;
}

interface ProductCategoryProps {
    form: UseFormReturn<ProductFormValues>;
}

const ProductCategory: React.FC<ProductCategoryProps> = ({ form }) => {

    const [categories, setCategories] = useState<Category[]>([]);

    const {
        setValue,
        watch,
        formState: { errors },
    } = form;

    const categoryValue = watch('category');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const all = await getAllCategories();
                if (all) setCategories(all);
            } catch (err) {
                console.error('Failed to load categories:', err);
            }
        };
        fetchCategories();
    }, []);


    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Brand And Category</h3>
                <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    {
                        categories.length === 0 ? (
                            <p>Loading categories...</p>
                        ) : (<Select
                            value={(categoryValue ?? "").toString()}
                            onValueChange={(val) => setValue('category', val)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((cat) => (
                                    <SelectItem
                                        key={cat.id}
                                        value={cat.id.toString()}
                                    >
                                        {cat.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>)}
                    {errors.category && (
                        <p className="text-sm text-red-500">{errors.category.message}</p>
                    )}
                </div>
                <div className="mt-3">
                    <label className="block text-sm font-medium mb-1">Brand</label>
                    <Input
                        type="text"
                        step="0.01"
                        {...form.register("brand")}
                    />
                    {errors.brand && (
                        <p className="text-sm text-red-500 mt-2">{errors.brand.message}</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductCategory