import { test, expect } from "@playwright/test";

test("AC3.1 - City options change when State = NCR", async ({ page }) => {
    await page.goto("https://demoqa.com/automation-practice-form");

    // Select State = NCR
    await page.locator("#state").click();
    await page.getByText("NCR", { exact: true }).click();

    await page.locator("#city").click();

    // Verify NCR cities are visible
    await expect(page.getByText("Delhi", { exact: true })).toBeVisible();
    await expect(page.getByText("Gurgaon", { exact: true })).toBeVisible();
    await expect(page.getByText("Noida", { exact: true })).toBeVisible();
});


test("AC3.2 - City options change when State = Uttar Pradesh", async ({ page }) => {
    await page.goto("https://demoqa.com/automation-practice-form");

    // Select State = Uttar Pradesh
    await page.locator("#state").click();
    await page.getByText("Uttar Pradesh", { exact: true }).click();

    await page.locator("#city").click();

    // Verify UP cities are visible
    await expect(page.getByText("Agra", { exact: true })).toBeVisible();
    await expect(page.getByText("Lucknow", { exact: true })).toBeVisible();
    await expect(page.getByText("Merrut", { exact: true })).toBeVisible();
});


test("AC3.3 - City options change when State = Rajasthan", async ({ page }) => {
    await page.goto("https://demoqa.com/automation-practice-form");

    // Select State = Rajasthan
    await page.locator("#state").click();
    await page.getByText("Rajasthan", { exact: true }).click();

    await page.locator("#city").click();

    // Verify Rajasthan cities are visible
    await expect(page.getByText("Jaipur", { exact: true })).toBeVisible();
    await expect(page.getByText("Jaiselmer", { exact: true })).toBeVisible();
});