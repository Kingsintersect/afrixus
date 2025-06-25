import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Revenue } from "./definitions";
import crypto from "crypto";
import { ProductStatus } from "@/schemas/product-schema";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const formatDateToLocal = (
	dateStr: string,
	locale: string = "en-NG"
) => {
	const date = new Date(dateStr);
	const options: Intl.DateTimeFormatOptions = {
		day: "numeric",
		month: "short",
		year: "numeric",
	};
	const formatter = new Intl.DateTimeFormat(locale, options);
	return formatter.format(date);
};
export function formatDate(dateString: string): string {
	return new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	}).format(new Date(dateString));
}

export const generateYAxis = (revenue: Revenue[]) => {
	// Calculate what labels we need to display on the y-axis
	// based on highest record and in 1000s
	const yAxisLabels = [];
	const highestRecord = Math.max(...revenue.map((month) => month.revenue));
	const topLabel = Math.ceil(highestRecord / 1000) * 1000;

	for (let i = topLabel; i >= 0; i -= 1000) {
		yAxisLabels.push(`$${i / 1000}K`);
	}

	return { yAxisLabels, topLabel };
};

export const generatePagination = (currentPage: number, totalPages: number) => {
	// If the total number of pages is 7 or less,
	// display all pages without any ellipsis.
	if (totalPages <= 7) {
		return Array.from({ length: totalPages }, (_, i) => i + 1);
	}

	// If the current page is among the first 3 pages,
	// show the first 3, an ellipsis, and the last 2 pages.
	if (currentPage <= 3) {
		return [1, 2, 3, "...", totalPages - 1, totalPages];
	}

	// If the current page is among the last 3 pages,
	// show the first 2, an ellipsis, and the last 3 pages.
	if (currentPage >= totalPages - 2) {
		return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
	}

	// If the current page is somewhere in the middle,
	// show the first page, an ellipsis, the current page and its neighbors,
	// another ellipsis, and the last page.
	return [
		1,
		"...",
		currentPage - 1,
		currentPage,
		currentPage + 1,
		"...",
		totalPages,
	];
};
export function getCurrentDateTime() {
	const now = new Date();

	const date = now.toLocaleDateString(); // e.g., "5/24/2025"
	const time = now.toLocaleTimeString(); // e.g., "10:35:14 AM"

	return `${date} ${time}`;
}

export function getFormattedDateTime() {
	const now = new Date();

	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, "0"); // months are 0-based
	const day = String(now.getDate()).padStart(2, "0");

	const hours = String(now.getHours()).padStart(2, "0");
	const minutes = String(now.getMinutes()).padStart(2, "0");
	const seconds = String(now.getSeconds()).padStart(2, "0");

	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function slugify(text: string) {
	return text
		.toString()
		.toLowerCase()
		.trim()
		.replace(/[\s\W-]+/g, "-");
}
export function generateUniqueSlug(name: string) {
	const baseSlug = slugify(name);
	const timestamp = Date.now();
	return `${baseSlug}-${timestamp}`;
}

/**
 * EXAMPLE USAGE OF THE PASSWORD HASH BELOW
 * const { salt, hash } = saltAndHashPassword('my_secure_password');
 * console.log('Salt:', salt);
 * console.log('Hash:', hash);
 */
export function saltAndHashPassword(password: string) {
	const salt = crypto.randomBytes(16).toString("hex"); // generate 16-byte salt
	const hash = crypto
		.pbkdf2Sync(password, salt, 1000, 64, "sha512")
		.toString("hex");

	return {
		salt,
		hash,
	};
}

export function verifyPassword(password: string, salt: string, hash: string) {
	const newHash = crypto
		.pbkdf2Sync(password, salt, 1000, 64, "sha512")
		.toString("hex");
	return hash === newHash;
}
export function formatProductStatus(status?: ProductStatus): string {
	switch (status) {
		case ProductStatus.ACTIVE:
			return "Active";
		case ProductStatus.INACTIVE:
			return "Inactive";
		case ProductStatus.ARCHIVED:
			return "Archived";
		default:
			return "Unknown";
	}
}
export function capitalizeFirstLetter(str: string): string {
	if (!str) return "";
	console.log("str.slice(1).toLowerCase()", str.slice(1).toLowerCase());
	console.log("str.charAt(0).toUpperCase()", str.charAt(1).toUpperCase());
	return str.charAt(1).toUpperCase() + str.slice(1).toLowerCase();
}

// export function toJsonString(input: unknown): string {
// 	return typeof input === "object" && input !== null
// 		? JSON.stringify(input, null, 2)
// 		: String(input);
// }
export function toJsonString(input: unknown): string {
	if (typeof input === "string") return input;

	if (input instanceof Error) {
		return JSON.stringify({
			name: input.name,
			message: input.message,
		});
	}

	try {
		return JSON.stringify(input);
	} catch {
		return String(input);
	}
}
