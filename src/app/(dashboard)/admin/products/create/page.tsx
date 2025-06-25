'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save } from 'lucide-react';
import { createProduct } from '@/actions/productAction';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import ProductImageUploader from '../components/ProductImageUploader';
import ProductTabs from '../components/ProductTabs';
import { ProductFormValues, productSchema } from '@/schemas/product-schema';
import { useRouter } from 'next/navigation';
import ProductCategory from '../components/ProductCategory';
import { ProductDescription } from '../components/ProductDescription';
import { objectToFormData } from '@/lib/formUtils';
import { toastApiError, toastSuccess } from '@/lib/toastApiError';

const CreateProductPage = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            id: 0,
            title: "",
            price1: "",
            price2: "",
            description: "",
            category: undefined,
            picture: undefined,
            quantity: 0,
            brand: null,
            images: undefined,
        },
    });

    const mutation = useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['createproduct'] });
            toastSuccess(`Product was created successfully!`);
            router.push("/admin/products");
        },
        onError: (error) => {
            console.error(error);
            toastApiError(error, "Failed to update product");
        },
    });


    const onSubmit = (values: ProductFormValues) => {
        const { id, picture, ...newProductData } = values;
        console.log('picture', picture, id, status)
        const formData = objectToFormData(newProductData);
        mutation.mutate(formData);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Create Product</h1>
                                <p className="text-gray-600 mt-1">Add new products to your collections</p>
                            </div>
                            <div className="flex gap-3">
                                <Button type="submit" disabled={mutation.isPending}>
                                    {mutation.isPending ? 'Saving...' : (
                                        <>
                                            <Save className="w-4 h-4 mr-2" /> Save Product
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                        <div className="">
                            {mutation.isError && (
                                <p className="text-sm text-red-500 mt-2">
                                    {mutation.error instanceof Error ? mutation.error.message : 'Something went wrong'}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <ProductImageUploader
                                imagesUrlArray={undefined}
                                productId={0}
                                form={form}
                            />
                            <ProductDescription form={form} />
                        </div>
                        <div className="lg:col-span-1 space-y-6">
                            <ProductCategory form={form} />
                            <ProductTabs form={form} />
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default CreateProductPage;
