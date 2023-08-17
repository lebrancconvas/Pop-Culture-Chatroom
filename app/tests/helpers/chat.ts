import type { Page, expect } from '@playwright/test';

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
}
