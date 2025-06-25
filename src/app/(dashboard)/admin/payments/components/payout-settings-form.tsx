'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Skeleton } from '@/components/ui/skeleton'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from '@/components/ui/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { CreditCard, Building, Clock, DollarSign } from 'lucide-react'
import { usePayoutSettings, useUpdatePayoutSettings } from '@/hooks/use-payments'
import { payoutSettingsSchema, type PayoutSettingsInput } from '@/schemas/payment-schemas'
import React from 'react'
import { formatCurrency } from '@/lib/formatCurrency'

export function PayoutSettingsForm() {
    const { data: settings, isLoading } = usePayoutSettings()
    const updateSettings = useUpdatePayoutSettings()

    const form = useForm<PayoutSettingsInput>({
        resolver: zodResolver(payoutSettingsSchema),
        defaultValues: settings ? {
            bankName: settings.bankName,
            accountName: settings.accountName,
            accountNumber: '', // Don't prefill for security
            routingNumber: settings.routingNumber,
            currency: settings.currency,
            minimumPayout: settings.minimumPayout,
            autoPayoutEnabled: settings.autoPayoutEnabled,
            payoutSchedule: settings.payoutSchedule,
        } : {
            bankName: '',
            accountName: '',
            accountNumber: '',
            routingNumber: '',
            currency: 'USD',
            minimumPayout: 100,
            autoPayoutEnabled: false,
            payoutSchedule: 'weekly',
        },
    })

    // Update form when settings are loaded
    React.useEffect(() => {
        if (settings) {
            form.reset({
                bankName: settings.bankName,
                accountName: settings.accountName,
                accountNumber: '', // Don't prefill for security
                routingNumber: settings.routingNumber,
                currency: settings.currency,
                minimumPayout: settings.minimumPayout,
                autoPayoutEnabled: settings.autoPayoutEnabled,
                payoutSchedule: settings.payoutSchedule,
            })
        }
    }, [settings, form])

    const onSubmit = async (data: PayoutSettingsInput) => {
        updateSettings.mutate(data)
    }

    if (isLoading) {
        return (
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-40" />
                        <Skeleton className="h-4 w-64" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="space-y-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Current Settings Overview */}
            {settings && (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="p-4">
                        <div className="flex items-center gap-3">
                            <Building className="h-8 w-8 text-blue-600" />
                            <div>
                                <p className="text-sm text-muted-foreground">Bank</p>
                                <p className="font-medium">{settings.bankName}</p>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-4">
                        <div className="flex items-center gap-3">
                            <CreditCard className="h-8 w-8 text-green-600" />
                            <div>
                                <p className="text-sm text-muted-foreground">Account</p>
                                <p className="font-medium">{settings.accountNumber}</p>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-4">
                        <div className="flex items-center gap-3">
                            <DollarSign className="h-8 w-8 text-yellow-600" />
                            <div>
                                <p className="text-sm text-muted-foreground">Minimum</p>
                                <p className="font-medium">{formatCurrency(settings.minimumPayout)}</p>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-4">
                        <div className="flex items-center gap-3">
                            <Clock className="h-8 w-8 text-purple-600" />
                            <div>
                                <p className="text-sm text-muted-foreground">Schedule</p>
                                <p className="font-medium capitalize">{settings.payoutSchedule}</p>
                                {settings.autoPayoutEnabled && (
                                    <Badge variant="secondary" className="mt-1 bg-green-50 text-green-700">
                                        Auto-enabled
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            {/* Settings Form */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">Payout Settings</CardTitle>
                    <p className="text-muted-foreground">
                        Configure your bank account and payout preferences for receiving payments.
                    </p>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {/* Bank Information */}
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-medium">Bank Account Information</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Your banking details for receiving payouts
                                    </p>
                                </div>
                                <Separator />

                                <div className="grid gap-4 md:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="bankName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Bank Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Chase Bank" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="accountName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Account Holder Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Business Account Name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="accountNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Account Number</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="Enter account number"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    We encrypt and securely store your account information
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="routingNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Routing Number</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="021000021" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="currency"
                                    render={({ field }) => (
                                        <FormItem className="md:w-1/2">
                                            <FormLabel>Currency</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select currency" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                                                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                                                    <SelectItem value="GBP">GBP - British Pound</SelectItem>
                                                    <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Payout Preferences */}
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-medium">Payout Preferences</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Configure when and how you receive your payouts
                                    </p>
                                </div>
                                <Separator />

                                <div className="grid gap-4 md:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="minimumPayout"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Minimum Payout Amount</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        min="1"
                                                        step="1"
                                                        placeholder="100"
                                                        {...field}
                                                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Payouts will only be processed when your balance reaches this amount
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="payoutSchedule"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Payout Schedule</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select schedule" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="daily">Daily</SelectItem>
                                                        <SelectItem value="weekly">Weekly</SelectItem>
                                                        <SelectItem value="monthly">Monthly</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormDescription>
                                                    How frequently you want to receive automatic payouts
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="autoPayoutEnabled"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                            <div className="space-y-0.5">
                                                <FormLabel className="text-base">Enable Automatic Payouts</FormLabel>
                                                <FormDescription>
                                                    Automatically transfer funds to your bank account based on your schedule
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex justify-end gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => form.reset()}
                                >
                                    Reset
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={updateSettings.isPending}
                                    className="bg-blue-600 hover:bg-blue-700"
                                >
                                    {updateSettings.isPending ? 'Saving...' : 'Save Settings'}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}