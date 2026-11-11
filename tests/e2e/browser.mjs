import { chromium } from "@playwright/test";
export function launchBrowser() {
  const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE;
  return chromium.launch({
    timeout: 15000,
    ...(executablePath ? { executablePath } : {}),
  });
}
