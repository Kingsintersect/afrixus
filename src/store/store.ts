import { Product } from "@/schemas/product-schema";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
	product: Product;
	quantity: number;
}

interface CartState {
	items: CartItem[];
	addItem: (product: Product) => void;
	removeItem: (productId: string) => void;
	clearCart: () => void;
	getTotalPrice: () => number;
	getItemCount: (productId: string) => number;
	getGroupedItems: () => CartItem[];
}

const useCartStore = create<CartState>()(
	persist(
		(set, get) => ({
			items: [],
			addItem: (product) =>
				set((state) => {
					const existingItem = state.items.find(
						(item) => item.product.id === product.id
					);
					if (existingItem) {
						return {
							items: state.items.map((item) =>
								item.product.id === product.id
									? { ...item, quantity: item.quantity + 1 }
									: item
							),
						};
					} else {
						return { items: [...state.items, { product, quantity: 1 }] };
					}
				}),
			removeItem: (productId) =>
				set((state) => ({
					items: state.items.reduce((acc, item) => {
						if (String(item.product.id) === productId) {
							if (item.quantity > 1) {
								acc.push({ ...item, quantity: item.quantity - 1 });
							}
						} else {
							acc.push(item);
						}
						return acc;
					}, [] as CartItem[]),
				})),
			clearCart: () => set({ items: [] }),
			getTotalPrice: () => {
				return get().items.reduce(
					(total: number, item) =>
						total + (Number(item.product.price1) ?? 0) * item.quantity,
					0
				);
			},
			getItemCount: (productId) => {
				const item = get().items.find(
					(item) => String(item.product.id) === productId
				);
				return item ? item.quantity : 0;
			},
			getGroupedItems: () => get().items,
		}),
		{
			name: "cart-store",
		}
	)
);

export default useCartStore;
