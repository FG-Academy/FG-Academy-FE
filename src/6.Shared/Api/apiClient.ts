import { getSession } from "next-auth/react";
import { SERVER_API_URL } from "../config";
import type { RequestOptions } from "./apiClient.type";
import { auth } from "@auth";

export class ApiClient {
  private serverUrl: string;

  constructor(serverUrl: string) {
    this.serverUrl = serverUrl;
  }

  private getBaseUrl(): string {
    // 서버 사이드에서는 SERVER_API_URL 사용
    // 클라이언트에서는 현재 브라우저 도메인 사용 (window.location.origin)
    if (typeof window === "undefined") {
      return this.serverUrl;
    }
    return window.location.origin;
  }

  private async getAuthToken(): Promise<string | null> {
    if (typeof window === "undefined") {
      const session = await auth();
      try {
        return session?.user?.accessToken || null;
      } catch (error) {
        console.error("Failed to get server session:", error);
        return null;
      }
    }

    const session = await getSession();

    return session?.user?.accessToken || null;
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
    const url = new URL(`/api/v1${endpoint}`, this.getBaseUrl());

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
    const url = new URL(`/api/v1${endpoint}`, this.getBaseUrl());

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
    const url = new URL(`/api/v1${endpoint}`, this.getBaseUrl());

    const token = await this.getAuthToken();
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options?.headers && { ...options.headers }),
    } as HeadersInit;

    const response = await fetch(url.toString(), {
      method: "PUT",
      headers,
      credentials: "include",
      body: JSON.stringify(body),
    });

    return this.handleResponse<TResult>(response);
  }

  public async patch<TResult = unknown, TData = Record<string, unknown>>(
    endpoint: string,
    body: TData,
    options?: RequestOptions
  ): Promise<TResult> {
    const url = new URL(`/api/v1${endpoint}`, this.getBaseUrl());

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
      method: "PATCH",
      headers,
      credentials: "include",
      body: JSON.stringify(body),
    });

    return this.handleResponse<TResult>(response);
  }

  public async delete<TResult = unknown, TData = Record<string, unknown>>(
    endpoint: string,
    body?: TData,
    options?: RequestOptions
  ): Promise<TResult> {
    const url = new URL(`/api/v1${endpoint}`, this.getBaseUrl());

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
      method: "DELETE",
      headers,
      credentials: "include",
      ...(body && { body: JSON.stringify(body) }),
    });

    return this.handleResponse<TResult>(response);
  }
}

export const apiClient = new ApiClient(SERVER_API_URL);
