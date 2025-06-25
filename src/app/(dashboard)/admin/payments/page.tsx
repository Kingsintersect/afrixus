import { Suspense } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowRight, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { PaymentStats } from './components/payment-stats'
import { formatCurrency } from '@/lib/formatCurrency'

function StatsLoading() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-32" />
            ))}
        </div>
    )
}

export default function PaymentsPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">💸 Payments</h1>
                    <p className="text-muted-foreground">
                        Manage your transactions, refunds, and payout settings
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" asChild>
                        <Link href="/admin/payments/transactions">
                            View All Transactions
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Payment Stats */}
            <Suspense fallback={<StatsLoading />}>
                <PaymentStats />
            </Suspense>

            {/* Quick Actions */}
            <div className="grid gap-6 md:grid-cols-1">
                <Card className="relative overflow-hidden border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100/50">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                                <TrendingUp className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <CardTitle className="text-lg">Transactions</CardTitle>
                                <p className="text-sm text-muted-foreground">
                                    View and manage all payment transactions
                                </p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                            <Link href="/admin/payments/transactions">
                                Manage Transactions
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity Summary */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Latest payment activities across your system
                    </p>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 rounded-lg bg-blue-50 border border-blue-200">
                            <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                            <div className="flex-1">
                                <p className="font-medium">Payment Received</p>
                                <p className="text-sm text-muted-foreground">{`${formatCurrency(299.99)} from Order #ORD-001`}</p>
                            </div>
                            <p className="text-sm text-muted-foreground">2 minutes ago</p>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                            <div className="h-2 w-2 rounded-full bg-yellow-600"></div>
                            <div className="flex-1">
                                <p className="font-medium">Refund Requested</p>
                                <p className="text-sm text-muted-foreground">{`${formatCurrency(50.00)} for Order #ORD-001`}</p>
                            </div>
                            <p className="text-sm text-muted-foreground">1 hour ago</p>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-lg bg-green-50 border border-green-200">
                            <div className="h-2 w-2 rounded-full bg-green-600"></div>
                            <div className="flex-1">
                                <p className="font-medium">Payout Processed</p>
                                <p className="text-sm text-muted-foreground">{`${formatCurrency(2450.00)} to your bank account`}</p>
                            </div>
                            <p className="text-sm text-muted-foreground">Yesterday</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}