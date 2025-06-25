"use client";

import { CheckoutFormData, checkoutSchema, PlaceOrderDataType } from "@/schemas/checkout-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Loader2, Mail, Package, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormSection } from "./components/FormSection ";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AddressFields } from "./components/AddressFields";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { OrderSummary } from "./components/OrderSummary";
import { formatCurrency } from "@/lib/formatCurrency";
import { fetchShippingRates, submitOrderToPaycomet, submitOrderToPaystack } from "@/actions/checkoutActions";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/store/store";
import { useVerifyCheckoutPayment } from "@/hooks/useCheckout";
import { useClearCart } from "@/hooks/useSyncCart";

export default function CheckoutPage() {
    const [isHydrated, setIsHydrated] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const groupedItems = useCartStore((state) => state.getGroupedItems());
    const paymentMethod = useCartStore.getState().paymentMethod;
    const [transRef, setTransRef] = useState<string | null>()
    const [verified, setVerified] = useState(false);
    const router = useRouter();
    const { mutate: verifyPayment } = useVerifyCheckoutPayment();
    const { mutate: clearCart } = useClearCart();

    const form = useForm<CheckoutFormData>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            telephone: '',
            address: '',
            city: '',
            state: '',
            country: 'NGN',
            shippingMethod: 'standard',
            // shippingZip: '',
        },
        mode: 'onSubmit',
    });

    const shippingMethod = useWatch({
        control: form.control,
        name: 'shippingMethod',
    });

    const { data: shippingCost = 0, isLoading: isLoadingShipping } = useQuery({
        queryKey: ['shipping', shippingMethod],
        queryFn: () => fetchShippingRates(shippingMethod),
        enabled: !!shippingMethod,
    });


    const orderMutation = useMutation({
        mutationFn: (data: PlaceOrderDataType) => {
            if (paymentMethod === "PAYSTACK") return submitOrderToPaystack(data)
            return submitOrderToPaycomet(data);
        },
        onSuccess: (data) => {
            router.push(data.authorization_url)
            console.log('Order submitted successfully:', data);
        },
        onError: (error) => {
            console.error('Order submission failed:', error);
        },
    });

    const onSubmit = (data: CheckoutFormData) => {
        const placeOrder = { ...data, totalAmount: (useCartStore.getState().getTotalPrice()) }
        orderMutation.mutate(placeOrder);
    };


    useEffect(() => {
        setIsHydrated(true);
    }, []);

    useEffect(() => {
        if (!isHydrated) return;

        const params = new URLSearchParams(window.location.search);
        const querySuccess = params.get("success");
        const trxref = params.get("trxref");
        if (querySuccess === "true") {
            setTransRef(trxref);
            setOrderSuccess(true);

            // const newUrl = new URL(window.location.href);
            // newUrl.searchParams.delete("success");
            // newUrl.searchParams.delete("trxref");
            // window.history.replaceState({}, "", newUrl.toString());
        }
    }, [isHydrated]);

    useEffect(() => {
        if (!orderSuccess || !transRef || verified) return;

        verifyPayment(transRef, {
            onSuccess: () => {
                clearCart();
                setVerified(true);
            },
            onError: () => {
                setVerified(true);
            },
        });
    }, [orderSuccess, transRef, verified, verifyPayment, clearCart]);



    if (orderSuccess) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardContent className="pt-6">
                        <div className="text-center space-y-4">
                            <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
                            <h1 className="text-2xl font-bold">Order Confirmed!</h1>
                            <p className="text-gray-600">
                                {`Thank you for your purchase. You'll receive a confirmation email shortly.`}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-5 w-full">
                                <h1 className="md:col-span-2 text-lg font-bold">Order Number</h1>
                                <p className="md:col-span-3 text-green-600 text-left">{orderMutation.data?.reference}</p>
                            </div>
                            <Button
                                onClick={() => {
                                    setOrderSuccess(false);
                                    router.push("/")
                                }
                                }
                                className="w-full"
                            >
                                Place Another Order
                            </Button>
                            <Button
                                onClick={() => {
                                    setOrderSuccess(false);
                                    router.push("/orders")
                                }
                                }
                                className="w-full bg-green-600 text-white hover:bg-green-700 transition duration-200"
                            >
                                View Your Orders
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }


    if (!isHydrated) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
                    <p className="mt-2 text-gray-600">Complete your order securely</p>
                </div>

                {orderMutation.error && (
                    <Alert variant="destructive" className="mb-6 max-w-4xl mx-auto">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Request Error.</AlertTitle>
                        <AlertDescription>
                            {orderMutation.error.message}
                        </AlertDescription>
                    </Alert>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Forms */}
                    <div className="space-y-6">
                        <Form {...form}>
                            <div className="space-y-6">
                                {/* Contact Information */}
                                <FormSection title="Contact Information" icon={User}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email Address *</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                                            <Input placeholder="john@example.com" className="pl-10" {...field} />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="telephone"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Phone Number</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                                            <Input placeholder="+1 (555) 123-4567" className="pl-10" {...field} />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="firstName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>First Name *</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="John" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="lastName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Last Name *</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Doe" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </FormSection>

                                {/* Shipping Address */}
                                <FormSection title="Shipping Address" icon={Package}>
                                    <AddressFields prefix="shipping" />

                                    {/* Shipping Methods */}
                                    <div className="mt-6">
                                        <FormField
                                            control={form.control}
                                            name="shippingMethod"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Shipping Method</FormLabel>
                                                    <FormControl>
                                                        <RadioGroup
                                                            onValueChange={field.onChange}
                                                            value={field.value}
                                                            className="space-y-2"
                                                        >
                                                            <div className="flex items-center space-x-2 p-3 border rounded-lg">
                                                                <RadioGroupItem value="standard" id="standard" />
                                                                <div className="flex-1">
                                                                    <label htmlFor="standard" className="text-sm font-medium cursor-pointer">
                                                                        {`Standard Shipping - ${formatCurrency(999)}`}
                                                                    </label>
                                                                    <p className="text-xs text-gray-500">5-7 business days</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center space-x-2 p-3 border rounded-lg">
                                                                <RadioGroupItem value="express" id="express" />
                                                                <div className="flex-1">
                                                                    <label htmlFor="express" className="text-sm font-medium cursor-pointer">
                                                                        {` Express Shipping - ${formatCurrency(1999)}`}
                                                                    </label>
                                                                    <p className="text-xs text-gray-500">2-3 business days</p>
                                                                </div>
                                                            </div>
                                                        </RadioGroup>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </FormSection>
                            </div>
                        </Form>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div>
                        <OrderSummary
                            form={form}
                            onSubmit={onSubmit}
                            forState={orderMutation.isPending}
                            cartData={
                                {
                                    items: groupedItems,
                                    subtotal: useCartStore.getState().getTotalPrice(),
                                    tax: 0,
                                }
                            }
                            shippingCost={shippingCost}
                            isLoadingShipping={isLoadingShipping}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
