// Product type
type Product = {
  id: number;
  title: string;
  price: number;
  categoryId?: number;
  type?: ProductType;
  variantOptions?: VariantOption[];
  variantCombinations?: VariantCombination[];
  description: string;
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

// Define different product types and their attributes
type ProductType = {
  weightType: "relative" | "absolute";
  expirationType?: "perishable" | "non_perishable" | "limited_shelf_life";
  stockType?: "single" | "batch" | "variant" | "bundle" | "composite";
  priceType?: "fixed" | "variable" | "tier" | "member";
  taxType?: "tax_included" | "tax_excluded" | "no_tax";
  productionType?: "made_to_order" | "ready_stock" | "customizable";
};
