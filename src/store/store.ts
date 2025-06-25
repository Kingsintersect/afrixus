import { Product } from '@/schemas/product-schema';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
	quantity: number;
	product: Product;
};

export type paymentMethodType = 'PAYSTACK' | 'PAYCOMET' | 'STRIPE';

type CartState = {
	paymentMethod: paymentMethodType;
	setPaymentMethod: (method: CartState['paymentMethod']) => void;

	processingMap: Record<string, boolean>; // per-product lock

	cartItems: CartItem[];
	setCart: (items: CartItem[]) => void;
	addToCart: (product: Product) => void;
	removeFromCart: (productId: string) => void;
	setProductProcessing: (productId: string, status: boolean) => void;

	getItemCount: (productId: string) => number;
	getGroupedItems: () => CartItem[];
	getTotalPrice: () => number;

	clearCart: () => void;
};

export const useCartStore = create<CartState>()(
	persist(
		(set, get) => ({
			paymentMethod: 'PAYSTACK',
			setPaymentMethod: (method) => set({ paymentMethod: method }),

			cartItems: [],
			processingMap: {},

			setCart: (items) => set({ cartItems: items }),

			addToCart: (product) => {
				const id = Number(product.id);
				const existing = get().cartItems.find(i => Number(i.product.id) === id);

				if (existing) {
					set({
						cartItems: get().cartItems.map(i =>
							Number(i.product.id) === id
								? { ...i, quantity: Number(i.quantity) + 1 }
								: i
						),
					});
				} else {
					set({
						cartItems: [...get().cartItems, { product: { ...product, id }, quantity: 1 }],
					});
				}
			},

			removeFromCart: (productId) => {
				const id = Number(productId);
				const existing = get().cartItems.find(i => Number(i.product.id) === id);
				if (!existing) return;

				if (existing.quantity <= 1) {
					set({
						cartItems: get().cartItems.filter(i => Number(i.product.id) !== id),
					});
				} else {
					set({
						cartItems: get().cartItems.map(i =>
							Number(i.product.id) === id
								? { ...i, quantity: Number(i.quantity) - 1 }
								: i
						),
					});
				}
			},

			setProductProcessing: (productId, status) => {
				set((state) => ({
					processingMap: { ...state.processingMap, [productId]: status },
				}));
			},

			getItemCount: (productId) => {
				const id = Number(productId);
				const item = get().cartItems.find(i => Number(i.product.id) === id);
				return item ? Number(item.quantity) : 0;
			},

			getGroupedItems: () => get().cartItems,

			getTotalPrice: () =>
				get().cartItems.reduce(
					(total, item) =>
						Number(total) + Number(item.quantity) * Number(item.product.price2),
					0
				),

			clearCart: () => set({ cartItems: [] }),
		}),
		{
			name: 'cart-store', // 🔐 localStorage key
			partialize: (state) => ({
				cartItems: state.cartItems,
				paymentMethod: state.paymentMethod,
			}),
		}
	)
);
