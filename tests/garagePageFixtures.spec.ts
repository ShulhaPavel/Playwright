import {expect, Locator, chromium } from "@playwright/test";
import { test } from "../test-data/fixtures/fixturesBase";

test.describe("Garage page with Fixtures", () => {
    test.use({storageState: './test-data/states/userOne.json'})

  test("Add a car in garage Page", async ({ garagePageAsLoggedUser}) => {
    await garagePageAsLoggedUser.addCarByBrandAndModel('Porsche', '911');
    expect('Porsche 911').toBe(await garagePageAsLoggedUser.getLastAddedCarName());
  });

  test("Update new added car", async ({ garagePageAsLoggedUser}) => {
    await garagePageAsLoggedUser.updateCarMileage("5555");
    expect("5555").toBe(await garagePageAsLoggedUser.getUpdatedMileageField());
  });
});
