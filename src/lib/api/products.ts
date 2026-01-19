import { Product, CreateProduct } from "@/type/product";
import axiosInstance from "./axiosInstance";

export async function getProducts(storeId: string): Promise<Product[]>;

export async function getProducts(
  storeId: string,
  productId: string
): Promise<Product>;

export async function getProducts(
  storeId: string,
  productId?: string
): Promise<Product[] | Product> {
  const url = productId
    ? `/stores/${storeId}/products/${productId}`
    : `/stores/${storeId}/products`;
  const response = await axiosInstance.get(url);
  return response.data;
}

export async function searchProduct(search: string, storeId: number) {
  const url = `/stores/${storeId}/products?search=${search}`;
  const response = await axiosInstance.get(url);
  return response.data;
}

export async function createProduct(
  storeId: string,
  productData: CreateProduct
) {
  const url = `/stores/${storeId}/products`;
  const response = await axiosInstance.post(url, productData);
  return response.data;
}

export async function editProduct(
  storeId: string,
  productId: string,
  productData: CreateProduct
) {
  const url = `/stores/${storeId}/products/${productId}`;
  const response = await axiosInstance.patch(url, productData);
  return response.data;
}

export async function deleteProduct(storeId: string, productId: string) {
  const url = `/stores/${storeId}/products/${productId}`;
  const response = await axiosInstance.delete(url);
  return response.data;
}
