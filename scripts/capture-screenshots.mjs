import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const baseUrl = process.env.CAPTURE_URL ?? 'http://127.0.0.1:4173/';
const outputDir = path.resolve(process.cwd(), 'screenshots');

await fs.mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1280, height: 720 },
  colorScheme: 'light',
});

async function snap(name) {
  await page.screenshot({
    path: path.join(outputDir, `${name}.png`),
    fullPage: true,
  });
}

try {
  await page.goto(baseUrl, { waitUntil: 'networkidle' });

  await snap('vit-home');

  await page.locator('.tabs button').nth(1).click();
  await page.waitForTimeout(150);
  await snap('mvit');

  await page.locator('.tabs button').nth(2).click();
  await page.waitForTimeout(150);
  await snap('memvit');

  await page.locator('.rail button').nth(3).click();
  await page.waitForTimeout(150);
  await snap('memvit-attend');

  await page.locator('.tabs button').nth(3).click();
  await page.waitForTimeout(150);
  await snap('compare');

  console.log(`Saved screenshots to ${outputDir}`);
} finally {
  await browser.close();
}
