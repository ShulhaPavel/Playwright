import {expect, Locator, chromium } from "@playwright/test";
import { test } from "../test-data/fixtures/fixtureScreenSizes";
test.describe("Fixtures", () => {
  test.beforeEach(async ({  }) => {

  });

  test("Open wikipedia test 1", async ({ pageSmall }) => {
    await pageSmall.goto('https://www.wikipedia.org/');
    await pageSmall.waitForTimeout(2000);
  });
  test("Open wikipedia test 2", async ({ pageMedium }) => {
    await pageMedium.goto('https://www.wikipedia.org/');
    await pageMedium.waitForTimeout(2000);
  });
  test("Open wikipedia test 3", async ({ pageBig }) => {
    await pageBig.goto('https://www.wikipedia.org/');
    await pageBig.waitForTimeout(2000);
  });
});
