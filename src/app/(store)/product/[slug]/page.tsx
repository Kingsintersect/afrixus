import { getProductByid } from '@/actions/productAction';
import AddToCartButton from '@/components/AddToCartButton';
import { notFound } from 'next/navigation';
import UpdateCartButton from '../components/UpdateCartButton';
import { formatCurrency } from '@/lib/formatCurrency';
import ImageGalleryWidget from '@/components/ImageGalleryWidget';

export const dynamic = "force-static";
export const revalidate = 60;


async function ProductPage({
    params
}: {
    params: Promise<{
        slug: number
    }>;
}) {
    const { slug } = await params;
    const product = await getProductByid(slug);

    if (!product) {
        return notFound();
    }

    return (
        <div className='conatainer mx-auto px-4 py-8 min-h-[75vh]'>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
                <div className="md:col-span-3">
                    {product.picture && (
                        <div className="">
                            <ImageGalleryWidget
                                imageUrls={Array.isArray(product.picture) ? product.picture : []}
                                alt="Product gallery"
                            />
                        </div>
                    )}
                </div>
                <div className="md:col-span-2 flex flex-col justify-between">
                    <div className="flex flex-col mt-10">
                        <h1 className="text-3xl font-bold mb-7">{product.title}</h1>
                        <div className="text-xl font-semibold mb-4 space-x-5">
                            <span className="">Unit Price:</span>
                            <span className="text-red-400">{formatCurrency(Number(product.price2), "NGN")}</span>
                        </div>
                        <div className="mt-6 mb-5">
                            <AddToCartButton product={product} disabled={false} text={'Add to Cart'} />
                        </div>
                        <hr className='my-10' />
                        <div className="flex items-center justify-between mb-10">
                            <UpdateCartButton
                                product={product}
                            />

                            {/* <Button className='bg-rose-500 hover:bg-rose-600 text-white text-lg px-6 py-3 space-x-2' asChild>
                                <Link href={`/checkout/${product.id}`}>
                                    <HeartIcon className="w-7 h-7" /> Buy Now
                                </Link>
                            </Button> */}
                        </div>
                        <div className="prose max-w-none mb-6">
                            <h3 className="text-2xl font-semi-bold">Description</h3>
                            {(product.description) && (
                                <div
                                    className="prose text-muted-foreground"
                                    dangerouslySetInnerHTML={{ __html: product.description }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage
