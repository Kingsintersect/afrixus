import { getAllCategories } from "@/actions/categoriesAction";
import { getProductByCategory } from "@/actions/productAction";
import ProductsView from "@/components/ProductsView";

async function CategoryPage({
	params
}: {
	params: Promise<{
		slug: string
	}>;
}) {
	const { slug } = await params;
	const products = await getProductByCategory(slug);
	const categories = await getAllCategories();

	return (
		<div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-6xl">
				<h1 className="text-3xl font-bold mb-6 text-center">
					{slug
						.split("_")
						.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
						.join(" ")}{" "}
					Collection
				</h1>
				{(products.length === 0)
					? <div className="text-center text-lg">No products available. Please try again later.</div>
					: <ProductsView products={products} categories={categories} />
				}

			</div>
		</div>
	)
}

export default CategoryPage
