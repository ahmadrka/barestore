import axios from "axios";
import { getCookie, removeCookie } from "../helper/cookies";
import { toast } from "sonner";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getCookie("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { handleRefreshToken } = await import("./auth");
        const tokenData = await handleRefreshToken();

        if (tokenData && tokenData.token) {
          const newToken = tokenData.token.accessToken;
          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error("Refresh token failed, redirecting to login...");
      }

      if (typeof window !== "undefined") {
        await removeCookie("accessToken");
        await removeCookie("refreshToken");
        await removeCookie("userData");
        window.location.href = "/auth";
      }
    }

    if (error.response?.status >= 500 || !error.response) {
      toast.error("Backend error, please try again later.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
