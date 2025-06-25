"use client";
import React from 'react'
import { AnimatePresence, motion } from "framer-motion";
import ProductThumbnail from './ProductThumbnail';
import { Product } from '@/schemas/product-schema';

const ProductGrid = ({ products }: { products: Product[] }) => {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4'>
            {products?.map((product) => {
                return (
                    <AnimatePresence key={product.id}>
                        <motion.div
                            layout
                            initial={{ opacity: 0.2 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className=''
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            <ProductThumbnail key={product.id} product={product} />
                        </motion.div>
                    </AnimatePresence>
                )
            })}
        </div>
    )
}

export default ProductGrid
