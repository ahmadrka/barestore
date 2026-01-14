import axiosInstance from "./axiosInstance";

export const getCategories = async (storeId: number, categoryId?: number) => {
  if (categoryId) {
    const response = await axiosInstance.get(
      `stores/${storeId}/categories/${categoryId}`
    );
    return response.data;
  }
  const response = await axiosInstance.get(`stores/${storeId}/categories`);
  return response.data;
};
