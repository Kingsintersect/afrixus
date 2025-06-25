import {
    BanknoteIcon,
    ClockIcon,
    Users,
    InboxIcon,
} from 'lucide-react';
import { lusitana } from '@/components/ui/fonts';
import { StatCard } from './StatCard';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { DashboardStats } from '@/types/dashboard-types';

const iconMap = {
    collected: BanknoteIcon,
    customers: Users,
    pending: ClockIcon,
    invoices: InboxIcon,
};

interface CardWrapperProps {
    statistics: DashboardStats | null;
}

export default async function CardWrapper({ statistics }: CardWrapperProps) {
    // const { totalRevenue, totalProducts, totalPendingOrder, totalCustomers, totalTransaction } = statistics;

    return (
        <>
            {/* NOTE: comment in this code when you get to this point in the course */}

            <StatCard
                title="Total Revenue"
                value={statistics?.totalRevenue ?? 0}
                isCurrency={true}
                badgeText="+12.5%"
                badgeIcon={<TrendingUp className="mr-1" />}
                footerPrimary={
                    <>
                        Trending up this month <TrendingUp className="size-4" />
                    </>
                }
                footerSecondary="Visitors for the last 6 months"
            />
            <StatCard
                title="Product Inventory"
                value={statistics?.totalProducts ?? 0}
                badgeText="15%"
                badgeIcon={<TrendingDown className="mr-1" />}
                footerPrimary={
                    <>
                        Product needing attention <TrendingDown className="size-4" />
                    </>
                }
                footerSecondary="add more product to inventory"
            />
            <StatCard
                title="Pending Order"
                value={statistics?.totalPendingOrders ?? 0}
                badgeText="5%"
                badgeIcon={<TrendingUp className="mr-1" />}
                footerPrimary={
                    <>
                        Order confirmation <TrendingUp className="size-4" />
                    </>
                }
                footerSecondary="Waiting order for the month"
            />
            <StatCard
                title="Total Customers"
                value={statistics?.totalCustomers ?? 0}
                badgeText="20%"
                badgeIcon={<TrendingDown className="mr-1" />}
                footerPrimary={
                    <>
                        Down 20% this period <TrendingDown className="size-4" />
                    </>
                }
                footerSecondary="Acquisition needs attention"
            />
        </>
    );
}

export function Card({
    title,
    value,
    type,
}: {
    title: string;
    value: number | string;
    type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {
    const Icon = iconMap[type];

    return (
        <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
            <div className="flex p-4">
                {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
                <h3 className="ml-2 text-sm font-medium">{title}</h3>
            </div>
            <p
                className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
            >
                {value}
            </p>
        </div>
    );
}
