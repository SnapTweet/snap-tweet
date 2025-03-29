import { expect, test } from '@playwright/test';

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('should render login page with all elements', async ({ page }) => {
    await expect(
      page.getByText('Enter your email and password to login to your account')
    ).toBeVisible();

    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByPlaceholder('name@example.com')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();

    const signInButton = page.locator('button[type="submit"]');
    await expect(signInButton).toBeVisible();
    await expect(signInButton).toBeEnabled();
    await expect(page.getByRole('link', { name: 'Sign up' })).toBeVisible();
  });

  test('should handle form validation', async ({ page }) => {
    const signInButton = page.getByRole('button', { name: 'Sign In' });

    await signInButton.click();
    await expect(page.getByLabel('Email')).toHaveAttribute('required', '');
    await expect(page.getByLabel('Password')).toHaveAttribute('required', '');
  });

  test('should handle invalid credentials', async ({ page }) => {
    await page.getByLabel('Email').fill('wrong@example.com');
    await page.getByLabel('Password').fill('wrongpassword');
    await page.locator('button[type="submit"]').click();

    await expect(page.getByRole('button', { name: 'Sign In' })).toBeEnabled();
  });

  test('should navigate to signup page', async ({ page }) => {
    await page.getByRole('link', { name: 'Sign up' }).click();
    await expect(page).toHaveURL('/signup');
  });

  // assume the account abc@abc.com is already created
  test('should successfully login with valid credentials', async ({ page }) => {
    await page.getByLabel('Email').fill('abc@abc.com');
    await page.getByLabel('Password').fill('123456');
    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page).toHaveURL('/');
  });
});
