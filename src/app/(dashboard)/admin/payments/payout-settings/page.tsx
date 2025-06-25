import { Suspense } from 'react'
import { PayoutSettingsForm } from '../components/payout-settings-form'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function PayoutSettingsPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" asChild>
                    <Link href="/admin/payments">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Payments
                    </Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Payout Settings</h1>
                    <p className="text-muted-foreground">
                        Configure your bank account and automatic payout preferences
                    </p>
                </div>
            </div>

            {/* Payout Settings Form */}
            <Suspense fallback={<div>Loading settings...</div>}>
                <PayoutSettingsForm />
            </Suspense>
        </div>
    )
}