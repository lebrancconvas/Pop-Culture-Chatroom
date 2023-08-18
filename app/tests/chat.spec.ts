import { test, expect } from '@playwright/test';
import TalkabotChat from './helpers/chat';

test('Show Starter Bot Message show Hello', async ({ page }) => {
  const chat = new TalkabotChat(page);
  await chat.open();

  await chat.expectGreeting();
  await expect(page.locator('.user-bubble')).not.toBeVisible();
  await chat.close();
});

test('Send Message and Show User Message', async ({ page }) => {
  const chat = new TalkabotChat(page);
  await chat.open();

  await chat.expectGreeting();

  await chat.send('Test!');
  await chat.waitForResponse();

  await chat.expectLastMessage('Test!', false);
  await chat.close();
});

// test('Send Message and Bot reply automatically', async ({ page }) => {
//   const chat = new TalkabotChat(page);
//   await chat.open();

//   await chat.expectGreeting();

//   await chat.send('Wow Wow Wow!');
//   await chat.waitForResponse();

//   await chat.expectLastMessage(/I\'m still in development/i, true);
//   await chat.close();
// });
