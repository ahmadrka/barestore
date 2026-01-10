"use server";

import { UserProfile } from "@/type/users";
import { getCookie } from "../helper/cookies";
import { handleRefreshToken } from "./auth";
import axiosInstance from "./axiosInstance";

export async function getUser(id?: number): Promise<UserProfile | undefined> {
  try {
    if (id) {
      const response = await axiosInstance.get(`/users/${id}`);
      return response.data;
    }

    const userData = await getCookie("userData");
    const accessToken = await getCookie("accessToken");

    if (userData && accessToken) {
      return JSON.parse(userData) as UserProfile;
    }

    const tokenData = await handleRefreshToken();

    if (tokenData && tokenData.data) {
      return tokenData.data as UserProfile;
    }
  } catch (error) {
    console.error("Error in getUser:", error);
  }

  if (typeof window !== "undefined") {
    window.location.href = "/auth";
  }
  return undefined;
}
