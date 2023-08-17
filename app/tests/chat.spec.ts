import { test, expect } from '@playwright/test';
import TalkabotChat from './helpers/chat';

test('Show Starter Bot Message show Hello', async({ page }) => {
  const chat = new TalkabotChat(page);
  await chat.open();

  await expect(page.locator('.bot-bubble p')).toHaveText('Hello!');
  await expect(page.locator('.user-bubble')).not.toBeVisible();
});

test('Send Message and Show User Message', async({ page }) => {
  const chat = new TalkabotChat(page);
  await chat.open();

  await chat.send('Test!');

  await expect(page.locator('.user-bubble p')).toHaveText('Test!');
});
