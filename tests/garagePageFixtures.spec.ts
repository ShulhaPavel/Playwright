import {expect, Locator, chromium } from "@playwright/test";
import { test } from "../test-data/fixtures/userGaragePage";


test.describe("Garage page with Fixtures", () => {
  test("User is logged in and sees Garage page", async ({ garagePageAsLoggedUser }) => {
    const { garagePage } = garagePageAsLoggedUser;
    await expect(garagePage.header).toHaveText("Garage");
  });

  test("Add a car in garage Page", async ({ garagePageAsLoggedUser}) => {
    const { addCarModal } = garagePageAsLoggedUser;
    await addCarModal.addCarByBrandAndModel('Porsche', '911');
    expect('Porsche 911').toBe(await addCarModal.getLastAddedCarName());
  });

  test("Update new added car", async ({ garagePageAsLoggedUser}) => {
    const { addCarModal } = garagePageAsLoggedUser;
    await addCarModal.updateCarMileage("5555");
    expect(await addCarModal.getUpdatedMileageField()).toBe("5555");
  });
});
