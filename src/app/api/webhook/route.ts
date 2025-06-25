// /app/api/webhook/route.ts or /pages/api/webhook.ts
import { STRIPE_WEBHOOK_SECRET } from "@/lib/config";
import { db } from "@/lib/db";
import stripe from "@/lib/stripe";
import { ResultSetHeader } from "mysql2";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Metadata } from "@/actions/createCheckoutSession";

export async function POST(req: NextRequest) {
	const body = await req.text();
	const headerList = await headers();
	const sig = headerList.get("stripe-signature");

	if (!sig) {
		return NextResponse.json(
			{ error: "Missing Stripe signature" },
			{ status: 400 }
		);
	}

	let event: Stripe.Event;
	try {
		event = Stripe.webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_SECRET);
	} catch (err) {
		console.error("Stripe webhook signature verification failed", err);
		return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
	}

	if (event.type === "checkout.session.completed") {
		const session = event.data.object as Stripe.Checkout.Session;
		try {
			await handleSuccessfulCheckout(session);
		} catch (err) {
			console.error("❌ Error saving order:", err);
			return NextResponse.json(
				{ error: "Order save failed" },
				{ status: 500 }
			);
		}
	}

	return NextResponse.json({ received: true });
}

async function handleSuccessfulCheckout(session: Stripe.Checkout.Session) {
	const {
		amount_total,
		metadata,
		payment_intent,
		id: sessionId,
		// currency,
		// customer,
	} = session;
	const { orderNumber, userId } = metadata as Metadata;

	// Get line items
	const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, {
		expand: ["data.price.product"],
	});

	// Insert into orders
	const [orderResult] = await db.query<ResultSetHeader>(
		`INSERT INTO orders (order_number, customer_id, total, status) VALUES (?, ?, ?, ?)`,
		[orderNumber, userId, amount_total! / 100, "paid"]
	);
	const orderId = orderResult.insertId;

	// Insert into order_items
	const orderItems = lineItems.data.map((item) => {
		const productId = Number(
			(item.price?.product as Stripe.Product)?.metadata?.id || 0
		);
		const quantity = item.quantity || 1;
		const price = item.amount_total ? item.amount_total / 100 : 0;
		return [orderNumber, orderId, productId, quantity, price];
	});
	await db.query(
		`INSERT INTO order_items (order_number, order_id, product_id, quantity, price) VALUES ?`,
		[orderItems]
	);

	// Insert into payments
	await db.query(
		`INSERT INTO payments (order_id, amount, provider, status, reference, paid_at) VALUES (?, ?, ?, ?, ?, ?)`,
		[
			orderId,
			amount_total! / 100,
			"stripe",
			"paid",
			payment_intent,
			new Date(),
		]
	);
}
