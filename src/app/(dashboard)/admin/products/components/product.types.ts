import { Product } from "@/schemas/product-schema";

export interface ProductSidebarProps {
	product: Product;
	setProduct: React.Dispatch<React.SetStateAction<Product>>;
}

export interface ProductTabsProps {
	product: Product;
	setProduct: React.Dispatch<React.SetStateAction<Product>>;
}
