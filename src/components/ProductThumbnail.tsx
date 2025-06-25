import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { formatCurrency } from '@/lib/formatCurrency';
import { Product } from '@/schemas/product-schema';
import { FormatImageUrl } from '@/lib/imageUrl';

const ProductThumbnail = ({ product }: { product: Product }) => {
    return (
        <Link
            href={`/product/${product.id}`}
            className="group flex flex-col bg-white rounded-lg border border-gray-200 shadow hover:shadow-md transition-all duration-200 overflow-hidden"
        >
            <div className="relative w-full h-[250px] overflow-hidden bg-gray-100">
                {product.picture && (
                    <Image
                        className="object-contain mx-auto"
                        src={FormatImageUrl(product.picture?.[0])}
                        alt={product.title || "Product Image"}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width:1200px) 50vw, 33vw"
                    />
                )}
            </div>

            <div className="p-4 space-y-5">
                <h2 className="text-lg font-semibold text-sky-800">
                    {product.title || "Product Title"}
                </h2>
                {/* <div
                    className="mt-1 text-gray-600 prose line-clamp-3 text-sm text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                /> */}
                <p className="mt-2 text-lg font-bold text-red-600">
                    {!isNaN(Number(product.price2)) ? formatCurrency(Number(product.price2), "NGN") : formatCurrency(0, "NGN")}
                </p>
            </div>

        </Link>

    )
}

export default ProductThumbnail
