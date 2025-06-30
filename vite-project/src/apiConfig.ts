// src/apiConfig.ts
import {
  Configuration,
  AccountsApi,
  BottlesApi,
  ExampleApi,
  AdminApi,
  DefaultApi,
} from "../client-sdk";

// API Configuration
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";

export const apiConfig = new Configuration({
  basePath: API_BASE_URL,
  // Uncomment and configure as needed:
  // apiKey: import.meta.env.VITE_API_KEY,
  // accessToken: () => localStorage.getItem('accessToken') || '',
  // headers: {
  //   'Content-Type': 'application/json',
  // },
  // credentials: 'include', // for cookies
});

// API Client Instances
export const accountsApi = new AccountsApi(apiConfig);
export const bottlesApi = new BottlesApi(apiConfig);
export const exampleApi = new ExampleApi(apiConfig);
export const adminApi = new AdminApi(apiConfig);
export const defaultApi = new DefaultApi(apiConfig);

// API Error Handler
export const handleApiError = (error: any): string => {
  if (error?.response) {
    // Server responded with error status
    const status = error.response.status;
    const message = error.response.statusText || "Unknown error";
    return `API Error ${status}: ${message}`;
  } else if (error?.message) {
    // Network error or other error
    return `Network Error: ${error.message}`;
  } else {
    return "An unexpected error occurred";
  }
};

// Helper function to check if API is available
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    await exampleApi.examplesPingGet();
    return true;
  } catch {
    return false;
  }
};

// Type exports for convenience
export type {
  ModelAccount,
  ModelBottle,
  ModelAdmin,
  ModelAddAccount,
  ModelUpdateAccount,
  ControllerMessage,
  HttputilHTTPError,
} from "../client-sdk";
