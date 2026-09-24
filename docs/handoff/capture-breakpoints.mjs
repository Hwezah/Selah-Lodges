// Full-page screenshots of every route at every breakpoint.
// Usage (from this folder):
//   npm i -D playwright && npx playwright install chromium
//   npx http-server design -p 5173 &   (or any static server)
//   node capture-breakpoints.mjs
import { chromium } from "playwright";
import { mkdirSync } from "fs";

const BASE = process.env.BASE || "http://localhost:5173/Selah%20Lodges.dc.html";
const WIDTHS = [
  ["mobile-360", 360, 780], ["mobile-390", 390, 844], ["mobile-landscape-844", 844, 390],
  ["small-560", 560, 900], ["tablet-768", 768, 1024], ["tablet-landscape-960", 960, 700],
  ["laptop-1280", 1280, 800], ["desktop-1440", 1440, 900]
];
const ROUTES = ["home", "detail", "experiences", "about", "contact", "checkout", "trips", "admin"];

const browser = await chromium.launch();
for (const [label, w, h] of WIDTHS) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
  mkdirSync(`screenshots/${label}`, { recursive: true });
  for (const r of ROUTES) {
    await page.goto(`${BASE}?route=${r}`, { waitUntil: "networkidle" });
    await page.addStyleTag({ content: "[data-reveal]{animation:none!important;opacity:1!important;transform:none!important}" });
    await page.waitForTimeout(800);
    await page.screenshot({ path: `screenshots/${label}/${r}.png`, fullPage: true });
  }
  await page.close();
}
await browser.close();
