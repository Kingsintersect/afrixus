import Stripe from "stripe";
import { STRIPE_API_KEY } from "./config";

if (!STRIPE_API_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not set")
}

const stripe = new Stripe(STRIPE_API_KEY!, {
    apiVersion: "2024-11-20.acacia", //use the latest API version
});

export default stripe;
