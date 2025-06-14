'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, Trash2Icon } from 'lucide-react';
import { notFound } from 'next/navigation';
import { deleteProduct, getProductByid, updateProduct } from '@/actions/productAction';
import ProductImageUploader from '../components/ProductImageGallery';
import ProductTabs from '../components/ProductTabs';
import ProductStatusPanel from '../components/ProductStatusPanel';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { use, useEffect } from 'react';
import { ProductFormValues, productSchema, ProductStatus } from '@/schemas/product-schema';
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
                price1: prod.price1,
                price2: prod.price2,
                picture: prod.picture?.[0] || undefined,
                brand: prod.brand,
                quantity: prod.quantity,
                status: ProductStatus.ACTIVE,
                images: prod.images,
            };
        },
    });

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            id: product?.id || 0,
            title: product?.title || "",
            price1: product?.price1 ? product.price1 : undefined,
            price2: product?.price2 ? product.price2 : undefined,
            description: product?.description || "",
            category: product?.category || undefined,
            brand: product?.brand || undefined,
            quantity: product?.quantity || undefined,
            picture: product?.picture || undefined,
            status: ProductStatus.ACTIVE,
            images: product?.images,
        },
    });

    useEffect(() => {
        if (product) {
            form.reset({
                id: product.id,
                title: product.title,
                price1: product.price1,
                price2: product.price2,
                description: product.description,
                category: product.category,
                brand: product?.brand,
                quantity: product?.quantity,
                picture: product?.picture,
                status: ProductStatus.ACTIVE,
                images: product?.images,
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
        const { picture, status, ...newProductData } = values;
        console.log('picture', picture, id, status)
        const formData = objectToFormData(newProductData);
        mutation.mutate(formData);
    };

    const onDelete = () => {
        deleteMutation.mutate();
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

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                        <div className="lg:col-span-3 space-y-6">
                            <ProductImageUploader
                                form={form}
                                // file={form.watch('image_url')}
                                imageUrl={product.picture || undefined}
                                productId={id}
                            />
                            <hr />
                            <ProductDescription form={form} />
                        </div>
                        <div className="lg:col-span-2 space-y-6">
                            <ProductCategory form={form} />
                            <ProductTabs form={form} />
                            <ProductStatusPanel form={form} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 my-10">
                        <Button
                            type='button'
                            variant={"destructive"}
                            className='w-full py-10 text-3xl font-semibold'
                            onClick={onDelete}
                        >
                            <Trash2Icon className="h-24 w-24" style={{ width: "30px", height: "30px" }} />
                            Delete this Product
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default ProductDetailsPage;
