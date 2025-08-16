import { API_URL } from "../Config";
import { RequestOptions } from "./apiClient.type";

export class ApiClient {
  private baseUrl: string;

  constructor(url: string) {
    this.baseUrl = url;
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

    const headers = {
      "Content-Type": "application/json",
      ...(options?.headers && { ...options.headers }),
    };

    const response = await fetch(url.toString(), {
      method: "GET",
      headers,
      ...(options?.credentials && { credentials: options.credentials }),
    });

    return this.handleResponse<TResult>(response);
  }

  public async post<TResult = unknown, TData = Record<string, unknown>>(
    endpoint: string,
    body: TData,
    options: RequestOptions
  ): Promise<TResult> {
    const headers = {
      "Content-Type": "application/json",
      ...(options?.headers && { ...options.headers }),
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers,
      ...(options?.credentials && { credentials: options.credentials }),
      body: JSON.stringify(body),
    });

    return this.handleResponse<TResult>(response);
  }
}

export const apiClient = new ApiClient(API_URL);
