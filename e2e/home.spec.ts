import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('./');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Next/);
});

test('docs link', async ({ page }) => {
  await page.goto('./');

  // Start waiting for popup before clicking. Note no await.
  const popupPromise = page.waitForEvent('popup');

  // Click the get started link.
  await page.getByRole('link', { name: 'Docs' }).click();

  const popup = await popupPromise;
  // Wait for the popup to load.
  await popup.waitForLoadState();
  // Expects the URL to contain docs.
  await expect(popup).toHaveURL(/.*docs/);
});
