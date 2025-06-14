import { getAllCategories } from "@/actions/categoriesAction";
import { getAllProducts } from "@/actions/productAction";
import { HomePageSlider } from "@/components/HomePageSlider";
import ProductsView from "@/components/ProductsView";
export const dynamic = "force-static";
export const revalidate = 60;

export default async function Home() {
	const products = await getAllProducts();
	const categories = await getAllCategories();

	return (
		<div className="min-h-screen bg-gray-100">
			<HomePageSlider />
			{(products.length === 0)
				? <div className="text-center">No products available. Please try again later.</div>
				: < ProductsView products={products} categories={categories} />
			}
		</div>
	);
}
