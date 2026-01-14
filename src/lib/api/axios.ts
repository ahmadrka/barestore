import axios from "axios";
import { toast } from "sonner";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      toast.error(
        "Gagal terhubung ke server. Periksa koneksi internet atau server mungkin sedang maintenance.",
        {
          id: "server-offline",
        }
      );
    }

    if (error.response?.status === 503) {
      toast.error("Server sedang penuh/maintenance. Coba lagi nanti.");
    }

    return Promise.reject(error);
  }
);
