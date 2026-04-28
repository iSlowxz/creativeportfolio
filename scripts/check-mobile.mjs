import { chromium, devices } from "playwright";

const iPhone = devices["iPhone 13"] ?? {
  viewport: { width: 390, height: 844 },
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
};

const baseURL = process.env.BASE_URL ?? "http://127.0.0.1:3000";

const log = (...args) => console.log("[check-mobile]", ...args);

const browser = await chromium.launch();
const context = await browser.newContext({
  ...iPhone,
});
const page = await context.newPage();

const consoleMessages = [];
page.on("console", (msg) => consoleMessages.push(`${msg.type()}: ${msg.text()}`));
page.on("pageerror", (err) => consoleMessages.push(`pageerror: ${err.message}`));

log("Navigating", baseURL);
await page.goto(baseURL, { waitUntil: "networkidle" });

// Scroll to Works section and wait for cards
await page.locator("#works").scrollIntoViewIfNeeded();
await page.waitForTimeout(600);

const worksHeading = await page.locator("#works h2").first().textContent().catch(() => null);
const worksCardsCount = await page.locator("#works button[data-cursor='view']").count();

log("Works heading:", worksHeading);
log("Works cards count:", worksCardsCount);

await page.screenshot({ path: "screenshots/mobile-home.png", fullPage: true });

if (consoleMessages.length) {
  log("Console/page errors:");
  for (const line of consoleMessages) log(" -", line);
}

await browser.close();

