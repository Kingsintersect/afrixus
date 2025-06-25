'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { DollarSign, CreditCard, TrendingUp } from 'lucide-react'
import { usePaymentStats } from '@/hooks/use-payments'
import { formatCurrency } from '@/lib/formatCurrency'

export function PaymentStats() {
    const { data: stats, isLoading, error } = usePaymentStats()

    if (isLoading) {
        return (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(4)].map((_, i) => (
                    <Card key={i}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-8 w-24 mb-2" />
                            <Skeleton className="h-4 w-32" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        )
    }

    if (error || !stats) {
        return (
            <div className="text-center py-8">
                <p className="text-muted-foreground">Failed to load payment statistics</p>
            </div>
        )
    }

    const statCards = [
        {
            title: "Total Revenue",
            value: `${formatCurrency(stats.totalRevenue)}`,
            description: `+${stats.monthlyGrowth}% from last month`,
            icon: DollarSign,
            trend: "up"
        },
        {
            title: "Transactions",
            value: stats.totalTransactions.toLocaleString(),
            description: "Total completed transactions",
            icon: CreditCard,
            trend: "neutral"
        },
        {
            title: "Success Rate",
            value: `${stats.successRate}%`,
            description: "Payment success rate",
            icon: TrendingUp,
            trend: "up"
        },
    ]

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {statCards.map((stat) => (
                <Card key={stat.title} className="relative overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            {stat.title}
                        </CardTitle>
                        <stat.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {stat.description}
                        </p>
                        {stat.trend === "up" && (
                            <Badge variant="secondary" className="mt-2 bg-green-50 text-green-700 border-green-200">
                                Trending Up
                            </Badge>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}