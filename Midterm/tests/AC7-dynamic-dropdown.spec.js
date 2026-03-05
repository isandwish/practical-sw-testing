import { test, expect } from "@playwright/test";

test("AC7.1 - City cannot be interacted with before selecting State", async ({ page }) => {
  await page.goto("https://demoqa.com/automation-practice-form");

  // Verify no State selected
  await expect(page.locator("#state")).toContainText("Select State"); // Default Value

  // Verify City is disabled
  const cityInput = page.locator("#react-select-4-input");
  await expect(cityInput).toBeDisabled();
});

test("AC7.2 - City shows only cities from selected State", async ({ page }) => {
    await page.goto("https://demoqa.com/automation-practice-form");

    // Select State = NCR
    await page.locator("#state").click();
    await page.getByText("NCR", { exact: true }).click();

    // Open City dropdown
    await page.locator("#city").click();

    // Should show NCR cities
    await expect(page.getByText("Delhi", { exact: true })).toBeVisible();
    await expect(page.getByText("Gurgaon", { exact: true })).toBeVisible();
    await expect(page.getByText("Noida", { exact: true })).toBeVisible();

    // Should NOT show other state cities
    await expect(page.getByText("Agra")).not.toBeVisible();
    await expect(page.getByText("Jaipur")).not.toBeVisible();
});