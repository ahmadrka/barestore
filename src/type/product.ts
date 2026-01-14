// Product type
export type Product = {
  productId: number;
  title: string;
  price: number;
  description?: string;
  stock: number | 1;
  sku?: string;
  plu?: string;
  barcode?: string;
  categoryId?: number;
  weightType: "RELATIVE" | "ABSOLUTE";
  status: "AVAILABLE" | "PREORDER" | "UNAVAILABLE" | "ARCHIVED" | "REMOVED";
  images: { imageId: number; url: string; thumbnail: string; order: number }[];
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string;
};

export type CreateProduct = {
  title: string;
  price: number;
  description?: string;
  stock: number | 1;
  sku?: string;
  plu?: string;
  barcode?: string;
  categoryId?: number;
  weightType: "RELATIVE" | "ABSOLUTE";
  // status: "AVAILABLE" | "PREORDER" | "UNAVAILABLE" | "ARCHIVED" | "REMOVED";
};
