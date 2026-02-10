import { APIResponse } from '@playwright/test';

type ApiCall = () => Promise<APIResponse>;

interface RetryOptions {
  retries?: number;
  delayMs?: number;
  retryOn?: number[];
}

export async function retryApiCall(
  apiCall: ApiCall,
  options?: RetryOptions
): Promise<APIResponse> {

  const {
    retries = 3,
    delayMs = 1000,
    retryOn = [500, 502, 503, 504],
  } = options || {};

  let lastError: unknown;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await apiCall();

      if (retryOn.includes(response.status())) {
        throw new Error(`Retryable HTTP status: ${response.status()}`);
      }

      return response;
    } catch (error) {
      lastError = error;

      console.warn(
        `API retry attempt ${attempt}/${retries} failed: ${String(error)}`
      );

      if (attempt < retries) {
        await new Promise(res => setTimeout(res, delayMs));
      }
    }
  }

  throw lastError;
}
