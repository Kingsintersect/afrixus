'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Plus } from 'lucide-react'
import { useProcessRefund, useRefunds } from '@/hooks/use-payments'
import { RefundInput, refundSchema } from '@/schemas/payment-schemas'
import { Refund } from '@/types/payment-types'
import { formatCurrency } from '@/lib/formatCurrency'

export function RefundTable() {
    const { data: refunds, isLoading } = useRefunds()
    const processRefund = useProcessRefund()
    const [dialogOpen, setDialogOpen] = useState(false)

    const form = useForm<RefundInput>({
        resolver: zodResolver(refundSchema),
        defaultValues: {
            transactionId: '',
            amount: 0,
            reason: '',
        },
    })

    const getStatusColor = (status: Refund['status']) => {
        switch (status) {
            case 'approved':
                return 'bg-blue-50 text-blue-700 border-blue-200'
            case 'processed':
                return 'bg-green-50 text-green-700 border-green-200'
            case 'pending':
                return 'bg-yellow-50 text-yellow-700 border-yellow-200'
            case 'rejected':
                return 'bg-red-50 text-red-700 border-red-200'
            default:
                return 'bg-gray-50 text-gray-700 border-gray-200'
        }
    }

    const onSubmit = async (data: RefundInput) => {
        processRefund.mutate(data, {
            onSuccess: () => {
                setDialogOpen(false)
                form.reset()
            }
        })
    }

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                            <Skeleton key={i} className="h-12 w-full" />
                        ))}
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="text-xl font-semibold">Refund Requests</CardTitle>
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                Process Refund
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Process New Refund</DialogTitle>
                                <DialogDescription>
                                    Enter the details for the refund request.
                                </DialogDescription>
                            </DialogHeader>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="transactionId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Transaction ID</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="txn_123456789" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="amount"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Refund Amount</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        step="0.01"
                                                        placeholder="0.00"
                                                        {...field}
                                                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="reason"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Reason for Refund</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Describe the reason for this refund..."
                                                        className="min-h-[80px]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setDialogOpen(false)}
                                        >
                                            Cancel
                                        </Button>
                                        <Button type="submit" disabled={processRefund.isPending}>
                                            {processRefund.isPending ? 'Processing...' : 'Process Refund'}
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </DialogContent>
                    </Dialog>
                </div>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Reason</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Requested</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {refunds?.map((refund) => (
                                <TableRow key={refund.id}>
                                    <TableCell className="font-medium">
                                        {refund.orderId}
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium">{refund.customerName}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium">
                                            {formatCurrency(refund.amount)}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {refund.currency}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="max-w-xs truncate" title={refund.reason}>
                                            {refund.reason}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={getStatusColor(refund.status)}>
                                            {refund.status.charAt(0).toUpperCase() + refund.status.slice(1)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-sm text-muted-foreground">
                                        {refund.requestedAt.toLocaleDateString()}
                                    </TableCell>
                                </TableRow>
                            ))}
                            {refunds?.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                        No refund requests found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}
