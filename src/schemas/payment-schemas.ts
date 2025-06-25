import { z } from "zod";

export const payoutSettingsSchema = z.object({
  bankName: z.string().min(2, "Bank name must be at least 2 characters"),
  accountName: z.string().min(2, "Account name must be at least 2 characters"),
  accountNumber: z
    .string()
    .min(8, "Account number must be at least 8 characters"),
  routingNumber: z
    .string()
    .min(9, "Routing number must be 9 characters")
    .max(9),
  currency: z.string().min(3, "Currency code required"),
  minimumPayout: z.number().min(1, "Minimum payout must be at least #1"),
  autoPayoutEnabled: z.boolean(),
  payoutSchedule: z.enum(["daily", "weekly", "monthly"]),
});

export const refundSchema = z.object({
  transactionId: z.string().min(1, "Transaction ID is required"),
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  reason: z.string().min(10, "Reason must be at least 10 characters"),
});

export type PayoutSettingsInput = z.infer<typeof payoutSettingsSchema>;
export type RefundInput = z.infer<typeof refundSchema>;
