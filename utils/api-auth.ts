import { APIRequestContext, expect } from '@playwright/test';

export async function authenticateUser(
  request: APIRequestContext,
  username: string,
  password: string
): Promise<string> {
  const response = await request.post(
    'https://www.saucedemo.com/api/login',
    {
      data: { username, password },
    }
  );

  expect(response.ok()).toBeTruthy();

  const body = await response.json();

  return body.token;
}
