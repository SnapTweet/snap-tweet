import { expect, test } from '@playwright/test';

test.describe('Main Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill('abc@abc.com');
    await page.getByLabel('Password').fill('123456');
    await page.locator('button[type="submit"]').click();
    await expect(page).toHaveURL('/');
  });

  test('should render main page with navbar and tweet feed', async ({
    page,
  }) => {
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
  });

  test('should handle refresh button states', async ({ page }) => {
    const refreshButton = page.getByRole('button', { name: /refresh/i });
    await expect(refreshButton).toBeVisible();

    await expect(refreshButton).toBeEnabled();
    await expect(page.locator('.animate-spin')).not.toBeVisible();

    Promise.all([
      page.waitForResponse(
        (response) =>
          response.url().includes('/api/tweets') && response.status() === 200
      ),
      refreshButton.click(),
    ]);

    await expect(page.locator('.animate-spin')).toBeVisible();
  });

  test('should handle refresh button error state', async ({ page }) => {
    await page.route('**/api/tweets', (route) => route.abort());

    const refreshButton = page.getByRole('button', { name: /refresh/i });
    await refreshButton.click();

    await expect(refreshButton).toBeEnabled();
    await expect(page.locator('.animate-spin')).not.toBeVisible();
  });

  test('should log out successfully', async ({ page }) => {
    const logoutButton = page.getByRole('button', { name: /logout/i });
    await expect(logoutButton).toBeVisible();

    await logoutButton.click();

    await expect(page.getByRole('button', { name: 'Sign up' })).toBeVisible();

    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page).toHaveURL('/login');

    await page.goto('/');
    await page.getByRole('button', { name: 'Sign up' }).click();
    await expect(page).toHaveURL('/signup');
  });
});
