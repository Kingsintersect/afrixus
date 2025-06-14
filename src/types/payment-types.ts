export interface Transaction {
    id: string
    orderId: string
    customerName: string
    customerEmail: string
    amount: number
    currency: string
    status: 'pending' | 'completed' | 'failed' | 'cancelled'
    paymentMethod: string
    gateway: string
    createdAt: Date
    updatedAt: Date
}

export interface Refund {
    id: string
    transactionId: string
    orderId: string
    customerName: string
    amount: number
    currency: string
    reason: string
    status: 'pending' | 'approved' | 'rejected' | 'processed'
    requestedAt: Date
    processedAt?: Date
}

export interface PayoutSettings {
    id: string
    bankName: string
    accountName: string
    accountNumber: string
    routingNumber: string
    currency: string
    minimumPayout: number
    autoPayoutEnabled: boolean
    payoutSchedule: 'daily' | 'weekly' | 'monthly'
}

export interface PaymentStats {
    totalRevenue: number
    totalTransactions: number
    successRate: number
    pendingRefunds: number
    monthlyGrowth: number
}