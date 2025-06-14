export function formatCurrency(amount: number, currencyCode: string = "NGN") {
	try {
		let locale = "en-US";
		const currency = currencyCode.toUpperCase();

		switch (currency) {
			case "NGN":
				locale = "en-NG";
				break;
			case "USD":
				locale = "en-US";
				break;
		}

		return new Intl.NumberFormat(locale, {
			style: "currency",
			currency,
		}).format(amount);
	} catch (error) {
		console.error("Invalid currency code:", currencyCode, error);
		return `${currencyCode.toUpperCase()} ${amount.toFixed(2)}`;
	}
}
