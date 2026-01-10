"use server";

import axios from "axios";
import { getCookie, removeCookie, setCookie } from "../helper/cookies";
import axiosInstance from "./axiosInstance";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function handleRefreshToken() {
  try {
    const refreshToken = await getCookie("refreshToken");
    const response = await axios.post(`${API_URL}/auth/refresh`, {
      token: refreshToken,
    });

    if (response.data.token || response.data.data) {
      await setCookie("accessToken", response.data.token.accessToken, 15, {
        httpOnly: false,
        secure: true,
      });
      await setCookie(
        "refreshToken",
        response.data.token.refreshToken,
        14 * 24 * 60,
        {
          httpOnly: true,
          secure: true,
        }
      );
      await setCookie("userData", JSON.stringify(response.data.data), 15, {
        httpOnly: false,
        secure: true,
      });
    }

    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      return error.response.data;
    }
    console.error("Failed to refresh token:", error);
    throw error;
  }
}

export async function handleLogin(email: string, password: string) {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });

    if (response.data.token || response.data.data) {
      await setCookie("accessToken", response.data.token.accessToken, 15, {
        httpOnly: false,
        secure: true,
      });
      await setCookie(
        "refreshToken",
        response.data.token.refreshToken,
        14 * 24 * 60,
        {
          httpOnly: true,
          secure: true,
        }
      );
      await setCookie("userData", JSON.stringify(response.data.data), 15, {
        httpOnly: false,
        secure: true,
      });
    }

    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      return error.response.data;
    }
    console.error("Failed to login:", error);
    throw error;
  }
}

export async function handleSignup(name: string, email: string) {
  try {
    const response = await axiosInstance.post(`${API_URL}/auth/signup`, {
      name,
      email,
    });

    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      return error.response.data;
    }
    console.error("Failed to signup:", error);
    throw error;
  }
}

export async function handleSignupVerify(token: string) {
  try {
    const response = await axiosInstance.post(`${API_URL}/auth/signup/verify`, {
      token,
    });

    await setCookie("verifyToken", token, 60, {
      httpOnly: false,
      secure: true,
    });

    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      return error.response.data;
    }
    console.error("Failed to verify:", error);
    throw error;
  }
}

export async function handleSignupPassword(password: string) {
  try {
    const token = await getCookie("verifyToken");
    if (!token) {
      return {
        success: false,
        errorCode: "INVALID_TOKEN",
      };
    }
    const response = await axiosInstance.post(
      `${API_URL}/auth/signup/password`,
      {
        token,
        password,
      }
    );

    await removeCookie("verifyToken");
    await setCookie("accessToken", response.data.token.accessToken, 15, {
      httpOnly: false,
      secure: true,
    });
    await setCookie(
      "refreshToken",
      response.data.token.refreshToken,
      14 * 24 * 60,
      {
        httpOnly: true,
        secure: true,
      }
    );
    await setCookie("userData", JSON.stringify(response.data.data), 15, {
      httpOnly: false,
      secure: true,
    });

    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      return error.response.data;
    }
    console.error("Failed to set password:", error);
    throw error;
  }
}

export async function handleLogout() {
  try {
    const refreshToken = await getCookie("refreshToken");
    const response = await axios.post(`${API_URL}/auth/logout`, {
      refreshToken,
    });

    await removeCookie("accessToken");
    await removeCookie("refreshToken");
    await removeCookie("userData");

    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      return error.response.data;
    }
    console.error("Failed to logout:", error);
    throw error;
  }
}
