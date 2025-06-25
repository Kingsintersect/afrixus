const BASE_IMAGE_URL_DEV = "http://localhost:3000";
const BASE_IMAGE_URL_PROD = "https://api.afrixus.org/storage";

export function FormatImageUrl(imagePath: string | null | undefined): string {
	if (
		!imagePath ||
		typeof imagePath !== "string" ||
		imagePath.trim() === "" ||
		imagePath.includes("localhost") ||
		imagePath.includes("127.0.0.1")
	) {
		return `${BASE_IMAGE_URL_DEV}/products/default_product_image_2.png`;
	}

	if (imagePath.startsWith("http")) {
		return imagePath;
	}

	return `${BASE_IMAGE_URL_PROD}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
}

export interface ProductImage {
	id: number;
	url: string;
	alt: string;
	file?: File;
	primary: boolean;
}
export function convertImageUrlsToPictures(urls: string[]): ProductImage[] {
	return urls.map((url, index) => ({
		id: Date.now() + index,
		url,
		alt: `Image ${index + 1}`,
		primary: index === 0,
	}));
}