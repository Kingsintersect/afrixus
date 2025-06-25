export const NODE_ENV = process.env.NODE_ENV;
export const VERCEL_ENV = process.env.VERCEL_URL;
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "";
export const API_URL = process.env.NEXT_PUBLIC_BASE_API ?? "";

export const DB_HOST = process.env.DB_HOST ?? "";
export const DB_USER = process.env.DB_USER ?? "";
export const DB_PASSWORD = process.env.DB_PASSWORD ?? "";
export const DB_NAME = process.env.DB_NAME ?? "";

export const STRIPE_API_KEY = process.env.STRIPE_SECRET_KEY ?? "";
export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET ?? "";
export const STRIPE_RESTRIKTED_KEY = "acct_1QV9I3AYvdwJAQVf";
export const SITE_NAME = "Afrixus";

// export const encodedKey = new TextEncoder().encode(secretKey)
