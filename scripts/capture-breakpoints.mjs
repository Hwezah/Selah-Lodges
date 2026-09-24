// Full-page screenshots of every route at every breakpoint.
// Usage: start the app (`npm run build && npm start`), then
//   npm run capture            (BASE=http://localhost:3000 by default)
// Writes screenshots/<label>/<route>.png. Set CHROMIUM_PATH to use a
// preinstalled browser instead of `npx playwright install chromium`.
import { chromium } from "playwright";
import { mkdirSync } from "fs";

const BASE = process.env.BASE || "http://localhost:3000";
const WIDTHS = [
  ["mobile-360", 360, 780], ["mobile-390", 390, 844], ["mobile-landscape-844", 844, 390],
  ["small-560", 560, 900], ["tablet-768", 768, 1024], ["tablet-924", 924, 700], ["tablet-landscape-960", 960, 700],
  ["laptop-1280", 1280, 800], ["desktop-1440", 1440, 900],
];
const ROUTES = {
  home: "/",
  detail: "/apartments/apartment-1",
  services: "/services",
  about: "/about",
  contact: "/contact",
  checkout: "/checkout",
  trips: "/trips",
};
const ONLY = process.env.ONLY ? process.env.ONLY.split(",") : null;

const browser = await chromium.launch({
  ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}),
  args: process.env.CHROMIUM_ARGS ? process.env.CHROMIUM_ARGS.split(" ") : [],
});
for (const [label, w, h] of WIDTHS) {
  if (ONLY && !ONLY.includes(label)) continue;
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
  // Mark the visitor as signed out so Clerk renders without a handshake round-trip.
  await ctx.addCookies([{ name: "__client_uat", value: "0", url: BASE }]);
  const page = await ctx.newPage();
  // Give checkout a trip to show.
  await page.addInitScript(() => {
    const d = (n) => { const x = new Date(); x.setDate(x.getDate() + n); return x.toISOString().slice(0, 10); };
    sessionStorage.setItem("selah.trip", JSON.stringify({ apartmentId: "apartment-1", checkIn: d(9), checkOut: d(12), guests: 2, cart: [] }));
  });
  mkdirSync(`screenshots/${label}`, { recursive: true });
  for (const [name, path] of Object.entries(ROUTES)) {
    await page.goto(BASE + path, { waitUntil: "networkidle" });
    await page.addStyleTag({ content: "[data-reveal]{animation:none!important;opacity:1!important;transform:none!important}" });
    await page.waitForTimeout(500);
    await page.screenshot({ path: `screenshots/${label}/${name}.png`, fullPage: true });
  }
  await ctx.close();
}
await browser.close();
