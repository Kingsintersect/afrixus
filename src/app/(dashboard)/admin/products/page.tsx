import { getAllProducts } from "@/actions/productAction"
import { ProductDataTable } from "./components/ProductDataTable"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function ProductListPage() {
    const products = await getAllProducts();

    return (
        <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Products</h1>
                <Link href="/admin/products/create">
                    <Button>Add Product</Button>
                </Link>
            </div>

            {products.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground">No products found.</div>
            ) : (
                <ProductDataTable data={products.map(p => ({
                    ...p,
                    status: 'active',
                    price1: Number(p.price1),
                    price2: Number(p.price2)
                }))} />
            )}
        </div>
    )
}
