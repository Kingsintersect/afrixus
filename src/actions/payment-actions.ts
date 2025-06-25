"use server";

import { revalidatePath } from "next/cache";
import { PayoutSettingsInput, RefundInput } from "../schemas/payment-schemas";
import type {
  Transaction,
  Refund,
  PayoutSettings,
  PaymentStats,
} from "../types/payment-types";

// Mock data - replace with actual database calls
const mockTransactions: Transaction[] = [
  {
    id: "txn_001",
    orderId: "ORD-001",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    amount: 299.99,
    currency: "USD",
    status: "completed",
    paymentMethod: "Credit Card",
    gateway: "Stripe",
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-03-01"),
  },
  {
    id: "txn_002",
    orderId: "ORD-002",
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    amount: 149.99,
    currency: "USD",
    status: "pending",
    paymentMethod: "PayPal",
    gateway: "PayPal",
    createdAt: new Date("2024-03-02"),
    updatedAt: new Date("2024-03-02"),
  },
];

const mockRefunds: Refund[] = [
  {
    id: "ref_001",
    transactionId: "txn_001",
    orderId: "ORD-001",
    customerName: "John Doe",
    amount: 50.0,
    currency: "USD",
    reason: "Product damaged during shipping",
    status: "pending",
    requestedAt: new Date("2024-03-03"),
  },
];

export async function getTransactions(): Promise<Transaction[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockTransactions;
}

export async function getRefunds(): Promise<Refund[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockRefunds;
}

export async function getPaymentStats(): Promise<PaymentStats> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return {
    totalRevenue: 45230.5,
    totalTransactions: 1247,
    successRate: 97.5,
    pendingRefunds: 5,
    monthlyGrowth: 12.3,
  };
}

export async function getPayoutSettings(): Promise<PayoutSettings | null> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return {
    id: "payout_001",
    bankName: "Chase Bank",
    accountName: "Business Account",
    accountNumber: "****1234",
    routingNumber: "021000021",
    currency: "USD",
    minimumPayout: 100,
    autoPayoutEnabled: true,
    payoutSchedule: "weekly",
  };
}

export async function updatePayoutSettings(data: PayoutSettingsInput) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Here you would update the database
  console.log("Updating payout settings:", data);

  revalidatePath("/payments/payout-settings");

  return { success: true, message: "Payout settings updated successfully" };
}

export async function processRefund(data: RefundInput) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log("Processing refund:", data);

  revalidatePath("/payments/refunds");

  return { success: true, message: "Refund processed successfully" };
}

export async function updateTransactionStatus(
  transactionId: string,
  status: Transaction["status"]
) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  console.log("Updating transaction status:", { transactionId, status });

  revalidatePath("/payments/transactions");

  return { success: true, message: "Transaction status updated" };
}
