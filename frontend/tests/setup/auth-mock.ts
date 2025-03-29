import { test as base } from '@playwright/test';

// Extend base test with mocked auth context
export const test = base.extend({
  context: async ({ context }, use) => {
    // Mock auth endpoints or localStorage as needed
    await context.addInitScript(() => {
      window.localStorage.setItem('auth-mock', 'true');
    });
    await use(context);
  },
});
