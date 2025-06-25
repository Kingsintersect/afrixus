'use client'

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ShoppingCartIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/schemas/product-schema';
interface ToastData {
    name: string;
}

const UpdateCartButton = ({ product }: { product: Product }) => {
    const router = useRouter();

    const promise = () =>
        new Promise<ToastData>((resolve) =>
            setTimeout(() => resolve({ name: product.title }), 2000)
        );

    const handleUpdateCart = () => {
        toast.promise(promise, {
            loading: 'Adding to cart...',
            success: (data) => {
                router.push('/cart');
                return `Cart updated with product: ${data.name}`;
            },
            error: 'Error adding to cart',
        });
    };

    return (
        <Button
            onClick={handleUpdateCart}
            className="text-lg px-6 py-3 space-x-2"
        >
            <ShoppingCartIcon className="w-7 h-7" />
            <span>Add to Cart</span>
        </Button>
    );
};

export default UpdateCartButton;
