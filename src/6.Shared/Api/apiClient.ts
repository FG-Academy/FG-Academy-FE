import { useSession } from "next-auth/react";
import { API_URL } from "../config";
import { RequestOptions } from "./apiClient.type";
import { auth } from "@/auth";

export class ApiClient {
  private baseUrl: string;

  constructor(url: string) {
    this.baseUrl = url;
  }

  private async getAuthToken(): Promise<string | null> {
    // 서버 환경에서는 auth() 함수를 통해 session 정보를 가져옴
    if (typeof window === "undefined") {
      try {
        const session = await auth();
        return session?.user?.accessToken || null;
      } catch (error) {
        console.error("Failed to get server session:", error);
        return null;
      }
    }

    // 클라이언트 환경에서는 useSession 사용
    return useSession().data?.user?.accessToken || null;
  }

  async handleResponse<TResult>(response: Response): Promise<TResult> {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    try {
      return await response.json();
    } catch (error) {
      throw new Error("Error parsing JSON response");
    }
  }

  public async get<TResult = unknown>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<TResult> {
    const url = new URL(`/api/v1${endpoint}`, this.baseUrl);

    const { params } = options || {};

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value.toString());
      });
    }

    const token = await this.getAuthToken();
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options?.headers && { ...options.headers }),
    } as HeadersInit;

    const response = await fetch(url.toString(), {
      method: "GET",
      headers,
      credentials: "include",
    });

    return this.handleResponse<TResult>(response);
  }

  public async post<TResult = unknown, TData = Record<string, unknown>>(
    endpoint: string,
    body?: TData,
    options?: RequestOptions
  ): Promise<TResult> {
    const token = await this.getAuthToken();
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options?.headers && { ...options.headers }),
    } as HeadersInit;

    const response = await fetch(`${this.baseUrl}/api/v1${endpoint}`, {
      method: "POST",
      headers,
      credentials: "include",
      body: JSON.stringify(body),
    });

    return this.handleResponse<TResult>(response);
  }

  public async put<TResult = unknown, TData = Record<string, unknown>>(
    endpoint: string,
    body: TData,
    options?: RequestOptions
  ): Promise<TResult> {
    const token = await this.getAuthToken();
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options?.headers && { ...options.headers }),
    } as HeadersInit;

    const response = await fetch(`${this.baseUrl}/api/v1${endpoint}`, {
      method: "PUT",
      headers,
      credentials: "include",
      body: JSON.stringify(body),
    });

    return this.handleResponse<TResult>(response);
  }

  public async delete<TResult = unknown>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<TResult> {
    const token = await this.getAuthToken();
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options?.headers && { ...options.headers }),
    } as HeadersInit;

    const response = await fetch(`${this.baseUrl}/api/v1${endpoint}`, {
      method: "DELETE",
      headers,
      credentials: "include",
    });

    return this.handleResponse<TResult>(response);
  }
}

export const apiClient = new ApiClient(API_URL);
