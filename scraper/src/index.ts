import { chromium } from "playwright";
import { writeFile } from "fs/promises";
import path from 'path';

interface IManga {
  title: string;
  url: string;
}

let mangas: IManga[] = [];

const index = async() => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    locale: 'en-US'
  });
  const page = await context.newPage();

  await page.goto('https://manganato.com/genre-all');
  await page.waitForSelector('.page-last');

  let maxPage = 100;
  const maxPageExtract = await page.locator('.page-last').textContent();

  if(typeof maxPageExtract === 'string') {
    let maxPageMatch = maxPageExtract.match(/\d+/);
    maxPageMatch = maxPageMatch ? maxPageMatch : ['100'];
    maxPage = parseInt(maxPageMatch[0]);
  }

  for(let i = 1; i <= maxPage; i++) {
    const url = `https://mangakakalot.com/manga_list?type=latest&category=all&state=all&page=${i}`;
    await page.goto(url);
    await page.waitForSelector('.list-truyen-item-wrap > h3');
    await page.waitForTimeout(1000);

    const mangaList = await page.locator('.list-truyen-item-wrap > h3').all();

    for(const manga of mangaList) {
      const title = await manga.innerText();
      const link = await manga.locator('a').getAttribute('href');

      const mangaData: IManga = {
        title: title || '',
        url: link || ''
      }

      mangas.push(mangaData);
    }
    console.log(`Page ${i} / ${maxPage} success!`);
  }

  await writeFile(path.join(__dirname, '..', '..', 'app', 'src', 'data', 'manga-data.json'), JSON.stringify(mangas, null, 2), 'utf-8');
  await page.close();
  await browser.close();
};

index();
