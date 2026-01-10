import axiosInstance from "./axiosInstance";
import { UserStore } from "@/type/userStores";

export async function getStores(
  storeId?: number
): Promise<UserStore[] | UserStore | null> {
  try {
    const url = storeId ? `/stores/${storeId}` : "/stores";
    const response = await axiosInstance.get(url);
    return response.data.data || response.data;
  } catch (error) {
    console.error("Error fetching stores:", error);
    return null;
  }
}

export async function getStoreInfo(storeId: number) {
  try {
    const response = await axiosInstance.get(`/stores/${storeId}/info`);
    return response.data.data || response.data;
  } catch (error) {
    console.error("Error fetching store info:", error);
    return null;
  }
}
