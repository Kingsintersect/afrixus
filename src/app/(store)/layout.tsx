import type { Metadata } from "next";
import Header from "@/components/Header";
import { getAllCategories } from "@/actions/categoriesAction";
import { Suspense } from 'react';
import Footer from "@/components/Footer";
import { SITE_NAME } from "@/lib/config";

export const metadata: Metadata = {
    title: `${SITE_NAME}`,
    description: "A market for high quality fabrics",
};

export default async function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const categories = await getAllCategories() ?? [];

    return (
        <main className="relative flex flex-col min-h-screen">
            <Suspense fallback={<div>Loading header contents...</div>}>
                <Header categories={categories} />
            </Suspense>
            {children}
            <Footer />
        </main>
    );
}
