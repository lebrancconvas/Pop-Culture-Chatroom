import { test, expect } from '@playwright/test';

test('Show Starter Bot Message show Hello', async({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(1000);

  await expect(page.locator('.bot-bubble p')).toHaveText('Hello!');
  await expect(page.locator('.user-bubble')).not.toBeVisible();
});
