import { test, expect, request, APIRequestContext } from '@playwright/test';
import { retryApiCall } from '../../utils/apiRetry';

test.describe('@api DummyJSON auth tests with retry', () => {

  let apiContext: APIRequestContext;

  test.beforeAll(async () => {
    apiContext = await request.newContext({
      baseURL: 'https://dummyjson.com',
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test('@api Successful login with retry', async () => {
    const response = await retryApiCall(
      () =>
        apiContext.post('/auth/login', {
          data: {
            username: 'kminchelle',
            password: '0lelplR',
          },
        }),
      {
        retries: 3,
        delayMs: 1500,
        retryOn: [500, 502, 503],
      }
    );

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.token).toBeTruthy();
  });

});
