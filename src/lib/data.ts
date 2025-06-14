import {
	CustomerField,
	CustomersTableType,
	InvoiceForm,
	// InvoicesTable,
	LatestInvoiceRaw,
	Revenue,
} from "./definitions";
import { unstable_noStore as noStore } from "next/cache";
import { db } from "./db";
import { FieldPacket, RowDataPacket } from "mysql2/promise";
import { formatCurrency } from "./formatCurrency";

export async function fetchRevenue() {
	try {
		console.log("Fetching revenue data...");
		await new Promise((resolve) => setTimeout(resolve, 3000));

		const [rows] = (await db.query<RowDataPacket[]>(
			"SELECT * FROM revenue"
		)) as [Revenue[], FieldPacket[]];
		console.log("Data fetch completed after 3 seconds.");
		return rows;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch revenue data.");
	}
}

export async function fetchLatestInvoices() {
	noStore();
	try {
		const [rows] = (await db.query<RowDataPacket[]>(`
	  SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
	  FROM invoices
	  JOIN customers ON invoices.customer_id = customers.id
	  ORDER BY invoices.date DESC
	  LIMIT 5
	`)) as [LatestInvoiceRaw[], FieldPacket[]];

		return rows.map((invoice) => ({
			...invoice,
			amount: formatCurrency(invoice.amount, "NGN"),
		}));
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch the latest invoices.");
	}
}

export async function fetchCardData() {
	noStore();
	try {
		const [invoiceCount] = await db.query<RowDataPacket[]>(
			"SELECT COUNT(*) as count FROM invoices"
		);
		const [customerCount] = await db.query<RowDataPacket[]>(
			"SELECT COUNT(*) as count FROM customers"
		);
		const [invoiceStatus] = await db.query<RowDataPacket[]>(`
	  SELECT
		SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS paid,
		SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS pending
	  FROM invoices
	`);

		return {
			numberOfInvoices: Number(invoiceCount[0].count ?? "0"),
			numberOfCustomers: Number(customerCount[0].count ?? "0"),
			totalPaidInvoices: formatCurrency(invoiceStatus[0].paid ?? "0", "NGN"),
			totalPendingInvoices: formatCurrency(
				invoiceStatus[0].pending ?? "0",
				"NGN"
			),
		};
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch card data.");
	}
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
	query: string,
	currentPage: number
) {
	noStore();
	const offset = (currentPage - 1) * ITEMS_PER_PAGE;
	try {
		const [rows] = await db.query<RowDataPacket[]>(
			`
      SELECT invoices.id, invoices.amount, invoices.date, invoices.status,
             customers.name, customers.email, customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE customers.name LIKE ? OR customers.email LIKE ?
         OR invoices.amount LIKE ? OR invoices.date LIKE ? OR invoices.status LIKE ?
      ORDER BY invoices.date DESC
      LIMIT ? OFFSET ?
    `,
			[
				`%${query}%`,
				`%${query}%`,
				`%${query}%`,
				`%${query}%`,
				`%${query}%`,
				ITEMS_PER_PAGE,
				offset,
			]
		);

		return rows;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch invoices.");
	}
}

export async function fetchInvoicesPages(query: string) {
	noStore();
	try {
		const [rows] = (await db.query<RowDataPacket[]>(
			`
	  SELECT COUNT(*) as count
	  FROM invoices
	  JOIN customers ON invoices.customer_id = customers.id
	  WHERE customers.name LIKE ? OR customers.email LIKE ?
		 OR invoices.amount LIKE ? OR invoices.date LIKE ? OR invoices.status LIKE ?
	`,
			[`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`]
		)) as [RowDataPacket[], FieldPacket[]];

		return Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE);
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch total number of invoices.");
	}
}

export async function fetchInvoiceById(id: string) {
	noStore();
	try {
		const [rows] = (await db.query<RowDataPacket[]>(
			`
	  SELECT id, customer_id, amount, status
	  FROM invoices
	  WHERE id = ?
	`,
			[id]
		)) as [InvoiceForm[], FieldPacket[]];

		return {
			...rows[0],
			amount: rows[0].amount / 100,
		};
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch invoice.");
	}
}

export async function fetchCustomers() {
	try {
		const [rows] = (await db.query<RowDataPacket[]>(`
	  SELECT id, name
	  FROM customers
	  ORDER BY name ASC
	`)) as [CustomerField[], FieldPacket[]];
		return rows;
	} catch (err) {
		console.error("Database Error:", err);
		throw new Error("Failed to fetch all customers.");
	}
}

export async function fetchFilteredCustomers(query: string) {
	noStore();
	try {
		const [rows] = (await db.query<RowDataPacket[]>(
			`
      SELECT customers.id, customers.name, customers.email, customers.image_url,
             COUNT(invoices.id) AS total_invoices,
             SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
             SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
      FROM customers
      LEFT JOIN invoices ON customers.id = invoices.customer_id
      WHERE customers.name LIKE ? OR customers.email LIKE ?
      GROUP BY customers.id, customers.name, customers.email, customers.image_url
      ORDER BY customers.name ASC
    `,
			[`%${query}%`, `%${query}%`]
		)) as [CustomersTableType[], FieldPacket[]];

		return rows.map((customer) => ({
			...customer,
			total_pending: formatCurrency(customer.total_pending, "NGN"),
			total_paid: formatCurrency(customer.total_paid, "NGN"),
		}));
	} catch (err) {
		console.error("Database Error:", err);
		throw new Error("Failed to fetch customer table.");
	}
}
