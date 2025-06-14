import { getAllCategories } from '@/actions/categoriesAction';
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { CategoryDataTable } from './components/CategoryDataTable';

const CategoriesPage = async () => {
    const categories = await getAllCategories() ?? [];

    return (
        <div className="min-h-screen bg-gray-50 p-6 space-y-4">
            <div className="flex justify-between items-center bg-white rounded-lg shadow-sm border p-6 mb-6">
                <h1 className="text-2xl font-bold">Categories</h1>
                <Link href="/admin/categories/create">
                    <Button>Add Category</Button>
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
                {categories.length === 0 ? (
                    <div className="text-center py-10 text-muted-foreground">No category found.</div>
                ) : (
                    <CategoryDataTable data={categories.map(p => ({ ...p, status: 'active' }))} />
                )}
            </div>
        </div>
    )
}

export default CategoriesPage