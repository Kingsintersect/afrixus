"use client";

import { useSyncCart } from "@/hooks/useSyncCart";

export default function CartSyncClient() {
    useSyncCart();
    return null;
}
