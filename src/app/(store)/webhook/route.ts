import { Metadata } from "@/actions/createCheckoutSession";
import { STRIPE_WEBHOOK_SECRET } from "@/lib/config";
import { db } from "@/lib/db";
import stripe from "@/lib/stripe";
import { ResultSetHeader } from "mysql2";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
	const body = await req.text();
	const headerList = await headers();
	const sig = headerList.get("stripe-signature");

	if (!sig) {
		return NextResponse.json({ error: "No Signature!" }, { status: 400 });
	}

	const webHookSecret = STRIPE_WEBHOOK_SECRET;

	let event: Stripe.Event;
	try {
		event = Stripe.webhooks.constructEvent(body, sig, webHookSecret);
	} catch (err) {
		console.error("Webhook signature verification failed", err);
		return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
	}

	if (event.type === "checkout.session.completed") {
		const session = event.data.object as Stripe.Checkout.Session;

		try {
			await createOrderInMySQL(session);
		} catch (err) {
			console.error("❌ Error creating MySQL order:", err);
			return NextResponse.json(
				{ error: "Order creation failed" },
				{ status: 500 }
			);
		}
	}

	return NextResponse.json({ received: true });
}

async function createOrderInMySQL(session: Stripe.Checkout.Session) {
	const {
		id: sessionId,
		amount_total,
		currency,
		metadata,
		payment_intent,
		customer,
		total_details,
	} = session;

	const { orderNumber, customerName, customerEmail, userId } =
		metadata as Metadata;
	console.log(
		"CHECKOUT-SUCCESS-METADATA",
		currency,
		payment_intent,
		customer,
		total_details,
		customerName,
		customerEmail
	);
	// Fetch line items
	const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, {
		expand: ["data.price.product"],
	});

	// Create order in MySQL
	const [orderResult] = await db.query<ResultSetHeader>(
		`INSERT INTO orders (order_number, customer_id, total, status) VALUES (?, ?, ?, ?)`,
		[orderNumber, userId, amount_total! / 100, "paid"]
	);
	const orderId = orderResult.insertId;

	// Create order items
	const itemData = lineItems.data.map((item) => {
		const productId = Number(
			(item.price?.product as Stripe.Product)?.metadata?.id || 0
		);
		const quantity = item.quantity || 1;
		const price = item.amount_total ? item.amount_total / 100 : 0;

		return [orderNumber, orderId, productId, quantity, price];
	});

	await db.query(
		`INSERT INTO order_items (order_number, order_id, product_id, quantity, price) VALUES ?`,
		[itemData]
	);
}

// import { Metadata } from "@/actions/createCheckoutSession";
// import { STRIPE_WEBHOOK_SECRET } from "@/lib/config";
// import stripe from "@/lib/stripe";
// // import { backendClient } from "@/sanity/lib/backendClient";
// import { headers } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";
// import Stripe from "stripe";

// export async function POST(req: NextRequest) {
// 	const body = await req.text();
// 	const headerList = await headers();
// 	const sig = headerList.get("stripe-signature");

// 	if (!sig) {
// 		return NextResponse.json({ error: "No Signature!" }, { status: 400 });
// 	}

// 	const webHookSecret = STRIPE_WEBHOOK_SECRET;

// 	if (!webHookSecret) {
// 		console.error("Stripe webhook secret is not set.");
// 		return NextResponse.json(
// 			{ error: "Stripe webook secret is not set" },
// 			{ status: 400 }
// 		);
// 	}

// 	let event: Stripe.Event;
// 	try {
// 		event = Stripe.webhooks.constructEvent(body, sig, webHookSecret);
// 	} catch (err) {
// 		console.error("Webhook signature verification failure", err);
// 		return NextResponse.json(
// 			{ error: `Webhook Error: ${err}` },
// 			{ status: 400 }
// 		);
// 	}

// 	if (event.type === "checkout.session.completed") {
// 		const session = event.data.object as Stripe.Checkout.Session;

// 		try {
// 			const order = await createOrderInSanity(session);
// 			console.log("Order created in sanity: ", order);
// 		} catch (err) {
// 			console.error("Error creating order in Sanity: ", err);
// 			return NextResponse.json(
// 				{ error: "Error creating order" },
// 				{ status: 500 }
// 			);
// 		}
// 	}

// 	return NextResponse.json({ recieved: true });
// }

// async function createOrderInSanity(session: Stripe.Checkout.Session) {
// 	const {
// 		id,
// 		amount_total,
// 		currency,
// 		metadata,
// 		payment_intent,
// 		customer,
// 		total_details,
// 	} = session;

// 	const { orderNumber, customerName, customerEmail, userId } =
// 		metadata as Metadata;

// 	const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
// 		id,
// 		{
// 			expand: ["data.price.product"],
// 		}
// 	);

// 	const sanityProducts = lineItemsWithProduct.data.map((item) => ({
// 		_key: crypto.randomUUID(),
// 		product: {
// 			_type: "reference",
// 			_ref: (item.price?.product as Stripe.Product)?.metadata?.id,
// 		},
// 		quantity: item.quantity || 0,
// 	}));

// 	const order = await backendClient.create({
// 		_type: "order",
// 		orderNumber,
// 		stripeCheckoutSessionId: id,
// 		stripePaymentIntentId: payment_intent,
// 		customerName,
// 		stripeCustomerId: customer,
// 		userId: userId,
// 		email: customerEmail,
// 		currency,
// 		amountDiscount: total_details?.amount_discount
// 			? total_details.amount_discount / 100
// 			: 0,
// 		products: sanityProducts,
// 		totalPrice: amount_total ? amount_total / 100 : 0,
// 		status: "paid",
// 		orderDate: new Date().toISOString(),
// 	});

// 	return order;
// }
