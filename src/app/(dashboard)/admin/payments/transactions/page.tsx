import { Suspense } from 'react'
import { TransactionTable } from '../components/transaction-table'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Download } from 'lucide-react'
import Link from 'next/link'

export default function TransactionsPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href="/admin/payments">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Payments
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>
                        <p className="text-muted-foreground">
                            Monitor and manage all payment transactions
                        </p>
                    </div>
                </div>
                <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                </Button>
            </div>

            {/* Transaction Table */}
            <Suspense fallback={<div>Loading transactions...</div>}>
                <TransactionTable />
            </Suspense>
        </div>
    )
}