import { type Page, expect } from '@playwright/test';

export default class TalkabotChat {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async send(text: string) {
    await this.page.locator('input').fill(text);
    await this.page.keyboard.press('Enter');
  }

  async getBotLastMessage() {
    return await this.page.locator('.bot-bubble p').allInnerTexts();
  }

  async getUserLastMessage() {
    return await this.page.locator('.user-bubble p').allInnerTexts();
  }

  async expectLastMessage(message: string | RegExp, isBot: boolean) {
    const logs = isBot ? await this.getBotLastMessage() : await this.getUserLastMessage();
    if(typeof message === 'string') {
      expect(logs[logs.length - 1]).toContain(message);
    } else {
      expect(logs[logs.length - 1]).toMatch(message);
    }
  }

  async close() {
    await this.page.close();
  }
}
