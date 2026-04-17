import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

const TOKEN_STORAGE_KEY = "brl.auth.token";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3333",
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (typeof window === "undefined") return config;

  const token = window.localStorage.getItem(TOKEN_STORAGE_KEY);
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      window.localStorage.removeItem(TOKEN_STORAGE_KEY);
    }

    const message =
      error.response?.data?.message ??
      error.message ??
      "Algo deu errado na requisição.";

    return Promise.reject(new Error(message));
  },
);

export const authTokenKey = TOKEN_STORAGE_KEY;

// TODO: apontar baseURL para API real na fase de backend
