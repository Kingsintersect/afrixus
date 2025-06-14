import React from 'react'
import ProductGrid from './ProductGrid';
import Form from "next/form";
import { Product } from '@/schemas/product-schema';
import { Category } from '@/schemas/category-schema'; // Assuming you have a category schema

interface ProductsViewProps {
	products: Product[];
	categories?: Category[]
}
const ProductsView = ({ products }: ProductsViewProps) => {
	return (
		<div className="w-full mt-8 flex flex-col gap-4">
			<div className="w-full px-4">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-xl font-bold text-gray-600">Search for products</h2>
				</div>
				{/* Search form */}
				<Form
					action={"/search"}
					className="w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0"
				>
					<input
						type="text"
						name="query"
						placeholder="Enter product title "
						className="bg-white text-gray-800 px-8 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border w-full max-w-4xl"
					/>
				</Form>
			</div>

			{/* Product grid */}
			<main className="flex-1">
				<ProductGrid products={products} />
			</main>
		</div>
	)
}

export default ProductsView
