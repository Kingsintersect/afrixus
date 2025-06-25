import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/formatCurrency";
import { FormatImageUrl } from "@/lib/imageUrl";
import { CheckoutFormData } from "@/schemas/checkout-schemas";
import { CartItem } from "@/store/store";
import { Loader2, Lock } from "lucide-react";
import Image from "next/image";
import { UseFormReturn } from "react-hook-form";

interface cartDataType {
    subtotal: number;
    tax: number;
    items: CartItem[];
};

interface OrderSummaryProps {
    form: UseFormReturn<CheckoutFormData>;
    onSubmit: (data: CheckoutFormData) => void;
    forState: boolean;
    cartData: cartDataType;
    shippingCost: number;
    isLoadingShipping: boolean;
}

export const OrderSummary = ({
    form,
    onSubmit,
    forState,
    cartData,
    shippingCost,
    isLoadingShipping
}: OrderSummaryProps) => {
    if (!cartData) return null;

    const total = cartData.subtotal + cartData.tax + shippingCost;

    return (
        <Card className="lg:sticky lg:top-8 lg:h-fit shadow-sm border-none">
            <CardHeader className="">
                <CardTitle className="text-lg font-semibold text-gray-900">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 mb-4">
                {/* Items */}
                <div className="space-y-4 mb-6">
                    {cartData.items.map((item: CartItem) => (
                        <div key={item.product.id} className="flex justify-between items-center ">
                            <div className="flex items-center gap-3">
                                <div className="relative w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                    <Image
                                        alt="produt image"
                                        src={FormatImageUrl(item.product?.picture?.[0])}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm font-medium text-gray-900">{item.product.title}</h3>
                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                </div>
                            </div>
                            <div className="text-sm font-bold text-gray-900">
                                {formatCurrency(parseInt(item.product.price2) * item.quantity)}
                            </div>
                        </div>
                    ))}
                </div>

                <Separator />

                {/* Totals */}
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>{formatCurrency(cartData.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span>Shipping</span>
                        <span>
                            {isLoadingShipping ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                `${formatCurrency(shippingCost)}`
                            )}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span>Tax</span>
                        <span>{formatCurrency(cartData.tax)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>{formatCurrency(total)}</span>
                    </div>
                </div>

                {/* Complete Order Button */}
                <Button
                    type="button"
                    onClick={form.handleSubmit(onSubmit)}
                    className="w-full h-12 text-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
                    disabled={forState}
                >
                    {forState ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Processing Order...
                        </>
                    ) : (
                        <>
                            <Lock className="w-4 h-4 mr-2" />
                            Complete Order
                        </>
                    )}
                </Button>

                <p className="text-xs text-gray-500 text-center mt-3">
                    Your payment information is secure and encrypted
                </p>
            </CardContent>
        </Card>
    );
};