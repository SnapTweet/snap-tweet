import { expect, test } from '@playwright/test';

test.describe('Signup Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/signup');
  });

  test('should render signup page with all elements', async ({ page }) => {
    await expect(
      page.getByText('Enter your information to create an account')
    ).toBeVisible();

    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByPlaceholder('name@example.com')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();

    const signUpButton = page.locator('button[type="submit"]');
    await expect(signUpButton).toBeVisible();
    await expect(signUpButton).toBeEnabled();
    await expect(page.getByRole('link', { name: 'Sign in' })).toBeVisible();
  });

  test('should handle form validation', async ({ page }) => {
    const signUpButton = page.locator('button[type="submit"]');

    await signUpButton.click();
    await expect(page.getByLabel('Email')).toHaveAttribute('required', '');
    await expect(page.getByLabel('Password')).toHaveAttribute('required', '');
  });

  test('should show error when passwords do not match', async ({ page }) => {
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.locator('button[type="submit"]').click();

    const alert = await page.getByRole('alert');
    await expect(alert).toBeVisible();
  });
  test('should navigate to login page', async ({ page }) => {
    await page.getByRole('link', { name: 'Sign in' }).click();
    await expect(page).toHaveURL('/login');
  });

  test('should successfully create account with valid credentials', async ({
    page,
  }) => {
    const testEmail = `test${Date.now()}@example.com`;
    await page.locator('input[id="username"]').fill(testEmail);
    await page.getByLabel('Email').fill(testEmail);
    await page.getByLabel('Password').fill('password123');
    await page.locator('button[type="submit"]').click();

    await expect(page).toHaveURL('/');
  });
});
