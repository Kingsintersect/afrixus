import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getTransactions,
  getRefunds,
  getPaymentStats,
  getPayoutSettings,
  updatePayoutSettings,
  processRefund,
  updateTransactionStatus,
} from "../actions/payment-actions";
import type { Transaction } from "../types/payment-types";

export function useTransactions() {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useRefunds() {
  return useQuery({
    queryKey: ["refunds"],
    queryFn: getRefunds,
    staleTime: 5 * 60 * 1000,
  });
}

export function usePaymentStats() {
  return useQuery({
    queryKey: ["payment-stats"],
    queryFn: getPaymentStats,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function usePayoutSettings() {
  return useQuery({
    queryKey: ["payout-settings"],
    queryFn: getPayoutSettings,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useUpdatePayoutSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePayoutSettings,
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["payout-settings"] });
      toast.success(result.message);
    },
    onError: (error) => {
      toast.error("Failed to update payout settings");
      console.error(error);
    },
  });
}

export function useProcessRefund() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: processRefund,
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["refunds"] });
      toast.success(result.message);
    },
    onError: (error) => {
      toast.error("Failed to process refund");
      console.error(error);
    },
  });
}

export function useUpdateTransactionStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      transactionId,
      status,
    }: {
      transactionId: string;
      status: Transaction["status"];
    }) => updateTransactionStatus(transactionId, status),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success(result.message);
    },
    onError: (error) => {
      toast.error("Failed to update transaction status");
      console.error(error);
    },
  });
}
