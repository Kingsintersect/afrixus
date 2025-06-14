const BASE_IMAGE_URL = "http://localhost:3000";

export function imageUrl(imagePath: string | null | undefined): string {
	if (typeof imagePath !== "string" || imagePath.trim() === "") {
		return `${BASE_IMAGE_URL}/default.png`; // fallback
	}

	return `${BASE_IMAGE_URL}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
}
