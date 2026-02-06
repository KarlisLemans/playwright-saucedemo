import { test, expect, request, APIRequestContext } from '@playwright/test';

test.describe('@api DummyJSON auth tests', () => {

  let apiContext: APIRequestContext;

  test.beforeAll(async () => {
    apiContext = await request.newContext({
      baseURL: 'https://dummyjson.com',
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Playwright-API-Test'
      }
    });
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test('@api Successful login', async () => {
    const response = await apiContext.post('/auth/login', {
      data: {
        username: 'kminchelle',
        password: '0lelplR',
      },
    });

    // Debug helper (remove later)
    console.log('Status:', response.status());
    console.log('Body:', await response.text());

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('token');
    expect(body).toHaveProperty('id');
  });

  test('@api Login fails with wrong password', async () => {
    const response = await apiContext.post('/auth/login', {
      data: {
        username: 'kminchelle',
        password: 'wrong_password',
      },
    });

    expect(response.status()).toBe(400);
  });

});
