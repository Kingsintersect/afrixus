'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon, Save, Trash2Icon } from 'lucide-react';
import { notFound } from 'next/navigation';
import { deleteProduct, getProductByid, updateProduct } from '@/actions/productAction';
import ProductImageUploader from '../components/ProductImageUploader';
import ProductTabs from '../components/ProductTabs';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { use, useEffect } from 'react';
import { ProductFormValues, productSchema } from '@/schemas/product-schema';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { ProductDescription } from '../components/ProductDescription';
import ProductCategory from '../components/ProductCategory';
import { objectToFormData } from '@/lib/formUtils';

const ProductDetailsPage = (props: { params: Promise<{ id: number }> }) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const params = use(props.params)
    const id = params.id

    const { data: product, isLoading } = useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const prod = await getProductByid(id);
            if (!prod) throw new Error('Product not found');

            return {
                id: prod.id,
                title: prod.title,
                description: prod.description,
                category: prod.category,
                price1: prod.price2,
                price2: prod.price2,
                picture: Array.isArray(prod.picture)
                    ? prod.picture
                    : prod.picture
                        ? [prod.picture]
                        : undefined,
                brand: prod.brand,
                quantity: Number(prod.quantity),
                images: prod.images,
            };
        },
    });


    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: undefined
    });

    useEffect(() => {
        if (product) {
            form.reset({
                id: product.id,
                title: product.title,
                price1: product.price2,
                price2: product.price2,
                description: product.description,
                category: String(product.category),
                brand: product.brand,
                quantity: Number(product.quantity),
                picture: product.picture,
                images: product.images ?? [], // default to empty File[] or handle conversion
            });
        }
    }, [product, form]);

    const mutation = useMutation({
        mutationFn: (values: FormData) => updateProduct(values, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['product', id] });
            toast.success('Success! ', {
                description: `${product?.title} was updted successfully!`,
            })
            router.push("/admin/products");
        },
        onError: (error) => {
            console.error(error);
            toast.error('Error! ', {
                description: `There was an error updating ${product?.title}!`,
            })
        },
    });

    const deleteMutation = useMutation({
        mutationFn: () => deleteProduct(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['productDelete', id] });
            toast.success('Success! ', {
                description: `${product?.title} was deleted successfully!`,
            })
            router.push("/admin/products");
        },
        onError: (error) => {
            console.error(error);
            toast.error('Error! ', {
                description: `There was an error deleting ${product?.title}!`,
            })
        },
    });

    const onSubmit = (values: ProductFormValues) => {
        const { picture, ...newProductData } = values;
        console.log('picture', picture, id);
        const formData = objectToFormData(newProductData);
        mutation.mutate(formData);
    };

    if (isLoading) return <div>Loading...</div>;
    if (!product) return notFound();

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Product Details</h1>
                                <p className="text-gray-600 mt-1">Manage your product information and settings</p>
                            </div>
                            <div className="flex gap-3">
                                <Button type="submit" disabled={mutation.isPending}>
                                    {mutation.isPending ? 'Saving...' : (
                                        <>
                                            <Save className="w-4 h-4 mr-2" /> Update Product
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
                                imagesUrlArray={product.picture}
                                form={form}
                                productId={id}
                            />
                            <ProductDescription form={form} />
                        </div>
                        <div className="lg:col-span-1 space-y-6">
                            <ProductCategory form={form} />
                            <ProductTabs form={form} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 my-10">
                        <Button
                            type="button"
                            variant="destructive"
                            className="w-full py-10 text-3xl font-semibold flex items-center justify-center gap-2"
                            onClick={() => deleteMutation.mutate()}
                            disabled={deleteMutation.isPending}
                        >
                            {deleteMutation.isPending ? (
                                <Loader2Icon className="animate-spin h-6 w-6" style={{ width: "30px", height: "30px" }} />
                            ) : (
                                <Trash2Icon className="h-24 w-24" style={{ width: "30px", height: "30px" }} />
                            )}
                            Delete this Category
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default ProductDetailsPage;
