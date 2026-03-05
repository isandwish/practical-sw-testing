import { test, expect } from "@playwright/test";

test("AC2.1 - Cannot submit when all mandatory fields are blank", async ({ page }) => {
    await page.goto("https://demoqa.com/automation-practice-form");

    await page.locator("#submit").click();

    await expect(
        page.locator("#example-modal-sizes-title-lg")
    ).not.toBeVisible();
});


test("AC2.2 - Cannot submit when First Name is blank", async ({ page }) => {
    await page.goto("https://demoqa.com/automation-practice-form");

    await page.getByPlaceholder("Last Name").fill("Jamjuree");
    await page.getByLabel("Female").click();
    await page.getByPlaceholder("Mobile Number").fill("0812345678");

    await page.locator("#submit").click();

    await expect(
        page.locator("#example-modal-sizes-title-lg")
    ).not.toBeVisible();
});


test("AC2.3 - Cannot submit when Last Name is blank", async ({ page }) => {
    await page.goto("https://demoqa.com/automation-practice-form");

    await page.getByPlaceholder("First Name").fill("Natthanicha");
    await page.getByLabel("Female").click();
    await page.getByPlaceholder("Mobile Number").fill("0812345678");

    await page.locator("#submit").click();

    await expect(
        page.locator("#example-modal-sizes-title-lg")
    ).not.toBeVisible();
});


test("AC2.4 - Cannot submit when Gender is not selected", async ({ page }) => {
    await page.goto("https://demoqa.com/automation-practice-form");

    await page.getByPlaceholder("First Name").fill("Natthanicha");
    await page.getByPlaceholder("Last Name").fill("Jamjuree");
    await page.getByPlaceholder("Mobile Number").fill("0812345678");

    await page.locator("#submit").click();

    await expect(
        page.locator("#example-modal-sizes-title-lg")
    ).not.toBeVisible();
});


test("AC2.5 - Cannot submit when Mobile is blank", async ({ page }) => {
    await page.goto("https://demoqa.com/automation-practice-form");

    await page.getByPlaceholder("First Name").fill("Natthanicha");
    await page.getByPlaceholder("Last Name").fill("Jamjuree");
    await page.getByLabel("Female").click();

    await page.locator("#submit").click();

    await expect(
        page.locator("#example-modal-sizes-title-lg")
    ).not.toBeVisible();
});