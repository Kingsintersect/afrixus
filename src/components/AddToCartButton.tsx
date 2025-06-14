"use client";
import React, { useEffect, useState } from 'react'
import useCartStore from '@/store/store';
import { Product } from '@/schemas/product-schema';

interface AddToCartButtonProps {
    product: Product;
    disabled?: boolean;
    text?: string;
}

function AddToCartButton({ product, disabled }: AddToCartButtonProps) {
    const { addItem, removeItem, getItemCount } = useCartStore();
    const itemCount = getItemCount(String(product.id));

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, [])

    if (!isClient) { return null; }

    return (
        <div className='flex items-center justify-start space-x-2'>
            <span className='text-lg font-semibold inline-block mr-5'>Quantity: </span>
            <button
                onClick={() => removeItem(String(product.id))}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${itemCount === 0
                    ? "bg-gray-100 cursor-not-allowed"
                    : "bg-gray-200 hover:bg-gray-300"
                    }`}
                disabled={itemCount === 0 || disabled}
            >
                <span className={`text-2xl font-bold ${itemCount === 0 ? "text-gray-400" : "text-gray-600"}`}> - </span>
            </button>
            <span className="w-8 text-center font-semibold">{itemCount}</span>
            <button
                onClick={() => addItem(product)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${disabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                    }`}
                disabled={disabled}
            >
                <span className={`text-2xl font-bold text-white`}> + </span>
            </button>
        </div>
    )
}

export default AddToCartButton
