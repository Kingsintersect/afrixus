import { verifyCheeckoutPayment } from "@/actions/checkoutActions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useVerifyCheckoutPayment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: verifyCheeckoutPayment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["verify-checkout-payment"] });
            toast.success("Your payment has been verified");
        },
        onError: (error) => {
            toast.error("Failed to verify payment!");
            console.error(error);
        },
    });
}