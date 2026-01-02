import { getSession } from "next-auth/react";
import { SERVER_API_URL } from "../config";
import type { ApiVersion, RequestOptions } from "./apiClient.type";
import { auth } from "@auth";

export class ApiClient {
  private serverUrl: string;
  private defaultApiVersion: ApiVersion = "v1";

  constructor(serverUrl: string) {
    this.serverUrl = serverUrl;
  }

  private getBaseUrl(apiVersion: ApiVersion = this.defaultApiVersion): string {
    const origin =
      typeof window === "undefined" ? this.serverUrl : window.location.origin;
    return `${origin}/api/${apiVersion}/`;
  }

  private buildUrl(endpoint: string, apiVersion?: ApiVersion): URL {
    const normalizedEndpoint = endpoint.startsWith("/")
      ? endpoint.slice(1)
      : endpoint;
    return new URL(normalizedEndpoint, this.getBaseUrl(apiVersion));
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

    // Handle empty responses (204 No Content or empty body)
    const contentLength = response.headers.get("content-length");
    const contentType = response.headers.get("content-type");

    if (
      response.status === 204 ||
      contentLength === "0" ||
      !contentType?.includes("application/json")
    ) {
      return undefined as TResult;
    }

    try {
      const text = await response.text();
      if (!text || text.trim() === "") {
        return undefined as TResult;
      }
      return JSON.parse(text) as TResult;
    } catch (error) {
      throw new Error("Error parsing JSON response", {
        cause: error,
      } as ErrorOptions);
    }
  }

  public async get<TResult = unknown>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<TResult> {
    const { params, apiVersion } = options || {};
    const url = this.buildUrl(endpoint, apiVersion);

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
    const { params, apiVersion } = options || {};
    const url = this.buildUrl(endpoint, apiVersion);

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
    const { apiVersion } = options || {};
    const url = this.buildUrl(endpoint, apiVersion);

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
    const { params, apiVersion } = options || {};
    const url = this.buildUrl(endpoint, apiVersion);

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
    const { params, apiVersion } = options || {};
    const url = this.buildUrl(endpoint, apiVersion);

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

  /**
   * POST request with FormData (for file uploads)
   * Note: Content-Type is not set to let the browser set it with boundary
   */
  public async postFormData<TResult = unknown>(
    endpoint: string,
    formData: FormData,
    options?: RequestOptions
  ): Promise<TResult> {
    const { params, apiVersion } = options || {};
    const url = this.buildUrl(endpoint, apiVersion);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value.toString());
      });
    }

    const token = await this.getAuthToken();
    const headers = {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options?.headers && { ...options.headers }),
    } as HeadersInit;

    const response = await fetch(url.toString(), {
      method: "POST",
      headers,
      credentials: "include",
      body: formData,
    });

    return this.handleResponse<TResult>(response);
  }

  /**
   * PATCH request with FormData (for file uploads)
   * Note: Content-Type is not set to let the browser set it with boundary
   */
  public async patchFormData<TResult = unknown>(
    endpoint: string,
    formData: FormData,
    options?: RequestOptions
  ): Promise<TResult> {
    const { params, apiVersion } = options || {};
    const url = this.buildUrl(endpoint, apiVersion);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value.toString());
      });
    }

    const token = await this.getAuthToken();
    const headers = {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options?.headers && { ...options.headers }),
    } as HeadersInit;

    const response = await fetch(url.toString(), {
      method: "PATCH",
      headers,
      credentials: "include",
      body: formData,
    });

    return this.handleResponse<TResult>(response);
  }
}

export const apiClient = new ApiClient(SERVER_API_URL);
