import { getAllCategories } from '@/actions/categoriesAction';
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { CategoryDataTable } from './components/CategoryDataTable';
import { ArrowLeft } from 'lucide-react';

const CategoriesPage = async () => {
    const categories = await getAllCategories() ?? [];

    return (
        <div className="min-h-screen bg-gray-50 p-6 space-y-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href="/admin">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Dashboard
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Categories</h1>
                        <p className="text-muted-foreground">
                            Manage Categories and brandings
                        </p>
                    </div>
                </div>
                <Link href="/admin/categories/create">
                    <Button>Add Category</Button>
                </Link>
            </div>


            <div className="bg-white rounded-lg shadow-sm border p-6">
                {categories.length === 0 ? (
                    <div className="text-center py-10 text-muted-foreground">No category found.</div>
                ) : (
                    <CategoryDataTable />
                )}
            </div>
        </div>
    )
}

export default CategoriesPage