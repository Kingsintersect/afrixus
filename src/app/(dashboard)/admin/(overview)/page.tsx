import CardWrapper from '@/components/ui/dashboard/cards';
import { lusitana } from '@/components/ui/fonts';
import { Suspense } from 'react';
import { CardsSkeleton, LatestInvoicesSkeleton, RevenueChartSkeleton } from '@/components/ui/skeletons';
import { Metadata } from 'next';
import { RevenueChart } from '@/components/ui/dashboard/RevenueChart';
import { LatestInvoices } from '@/components/ui/dashboard/LatestInvoices';
import { SITE_NAME } from '@/lib/config';
import { fetchDashboardStatistics } from '@/actions/adminActions';

export const metadata: Metadata = {
    title: `${SITE_NAME} | Admin Dashboard}`,
    description: "Dashboard | A market for high quality fabrics",
};

export default async function Page() {
    const statistics = await fetchDashboardStatistics();

    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Dashboard
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Suspense fallback={<CardsSkeleton />}>
                    <CardWrapper statistics={statistics} />
                </Suspense>
            </div>
            <div className="mt-[10vh] grid grid-cols-1 gap-6 md:grid-cols-2">
                <Suspense fallback={<RevenueChartSkeleton />}>
                    <RevenueChart />
                </Suspense>
                <Suspense fallback={<LatestInvoicesSkeleton />}>
                    <LatestInvoices />
                </Suspense>
            </div>
        </main>
    );
}