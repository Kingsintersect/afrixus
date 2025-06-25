"use server";

import { BASE_URL, NODE_ENV, VERCEL_ENV } from "@/lib/config";
import { FormatImageUrl } from "@/lib/imageUrl";
import stripe from "@/lib/stripe";
import { CartItem } from "@/store/store";

export type Metadata = {
	orderNumber: string;
	customerName: string;
	customerEmail: string;
	userId: string;
};
export type GroupedCartItem = {
	product: CartItem["product"];
	quantity: number;
};

export async function createCheoutSession(
	items: GroupedCartItem[],
	metadata: Metadata
) {
	try {
		// check if nay ground items dont have a price
		const itemsWithoutPrice = items.filter((item) => !item.product.price2);
		if (itemsWithoutPrice.length > 0) {
			throw Error("Some items do not have a price!");
		}

		const customers = await stripe.customers.list({
			email: metadata.customerEmail,
			limit: 1,
		});

		let customerId: string | undefined;
		if (customers.data.length > 0) {
			customerId = customers.data[0].id;
		}

		const baseUrl =
			NODE_ENV === "production" ? `https://${VERCEL_ENV}` : `${BASE_URL}`;
		const successUrl = `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`;
		const cancelUrl = `${baseUrl}/cart`;

		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			customer: customerId,
			customer_creation: customerId ? undefined : "always",
			customer_email: !customerId ? metadata.customerEmail : undefined,
			metadata,
			mode: "payment",
			allow_promotion_codes: true,
			success_url: successUrl,
			cancel_url: cancelUrl,
			line_items: items.map((item) => ({
				price_data: {
					currency: "ngn",
					unit_amount: Math.round(Number(item.product.price2)! * 100),
					product_data: {
						name: item.product.title || "Unamed Product",
						description: `Product ID: ${item.product.id}`,
						metadata: {
							id: item.product.id,
						},
						images: item.product.picture
							? item.product.picture instanceof Array
								? [FormatImageUrl(item.product.picture[0])]
								: [FormatImageUrl(item.product.picture)]
							: undefined,
					},
				},
				quantity: item.quantity,
			})),
		});

		return session.url;
	} catch (error) {
		console.error("Error creating cheout session:", error);
		throw error;
	}
}
