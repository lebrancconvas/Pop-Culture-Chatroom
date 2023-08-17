import { test, expect } from '@playwright/test';

test('Show Starter Bot Message show Hello', async({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(1000);

  await expect(page.getByText('Hello!')).toBeVisible();
});
