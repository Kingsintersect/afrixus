import { ProductDataTable } from "./components/ProductDataTable"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react";
import Link from "next/link"
import { Suspense } from "react";

export default async function ProductListPage() {

    return (
        <div className="p-6 space-y-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href="/admin">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Dashboard
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Products</h1>
                        <p className="text-muted-foreground">
                            Monitor and manage products
                        </p>
                    </div>
                </div>
                <Link href="/admin/products/create">
                    <Button>Add Product</Button>
                </Link>
            </div>

            <Suspense fallback={<div>Loading transactions...</div>}>
                <ProductDataTable />
            </Suspense>
        </div>
    )
}
