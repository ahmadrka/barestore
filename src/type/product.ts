// Product type
type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  status: "available" | "preorder" | "unavailable";
  stock: number | null;
  weightType: "relative" | "absolute";
  categoryId?: number;
  variantOptions?: VariantOption[];
  variantCombinations?: VariantCombination[];
  images: string[];
  createdAt: string;
  updatedAt?: string;
};

// Product category
type Category = {
  id: number;
  name: string;
  image?: string;
};

// Define available variant options for products
type VariantOption = {
  name: string;
  value: string[];
};

// Product variant combinations
type VariantCombination = {
  id: number;
  options: Record<string, string>;
  price?: number;
  stock?: number;
  sku?: string;
  image?: string;
};
