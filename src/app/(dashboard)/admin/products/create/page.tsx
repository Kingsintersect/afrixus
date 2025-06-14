'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save } from 'lucide-react';
import { createProduct } from '@/actions/productAction';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import ProductImageUploader from '../components/ProductImageGallery';
import ProductTabs from '../components/ProductTabs';
import ProductStatusPanel from '../components/ProductStatusPanel';
import { ProductFormValues, productSchema, ProductStatus } from '@/schemas/product-schema';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import ProductCategory from '../components/ProductCategory';
import { ProductDescription } from '../components/ProductDescription';
import { objectToFormData } from '@/lib/formUtils';

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
            status: ProductStatus.ACTIVE,
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
            toast.success('Success! ', {
                description: `Product was created successfully!`,
            })
            router.push("/admin/products");
        },
        onError: (error) => {
            console.error(error);
            toast.error('Error! ', {
                description: `There was an error creating product!`,
            })
        },
    });


    const onSubmit = (values: ProductFormValues) => {
        // console.log('values', values); return;
        const { id, picture, status, ...newProductData } = values;
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

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                        <div className="lg:col-span-3 space-y-6">
                            <ProductImageUploader
                                imageUrl={undefined}
                                productId={0}
                                form={form}
                            />
                            <ProductDescription form={form} />
                        </div>
                        <div className="lg:col-span-2 space-y-6">
                            <ProductCategory form={form} />
                            <ProductTabs form={form} />
                            <ProductStatusPanel form={form} />
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default CreateProductPage;
