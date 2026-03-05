import { test, expect } from "@playwright/test";

test("AC4.1 - User can add multiple subjects", async ({ page }) => {
    await page.goto("https://demoqa.com/automation-practice-form");

    const subjectInput = page.locator("#subjectsInput");

    // Add subjects
    await subjectInput.fill("Maths");
    await page.keyboard.press("Enter");

    await subjectInput.fill("English");
    await page.keyboard.press("Enter");

    const subjectTags = page.locator(".subjects-auto-complete__multi-value__label");

    // Verify 2 tags are displayed
    await expect(subjectTags).toHaveCount(2);

    // Verify correct values inside tags
    await expect(subjectTags).toHaveText(["Maths", "English"]);
});

test("AC4.2 - User can remove a subject tag", async ({ page }) => {
    await page.goto("https://demoqa.com/automation-practice-form");

    const subjectInput = page.locator("#subjectsInput");

    // Add subjects
    await subjectInput.fill("Maths");
    await page.keyboard.press("Enter");

    await subjectInput.fill("English");
    await page.keyboard.press("Enter");

    // Remove one subject (click remove icon of first tag)
    await page.locator(".subjects-auto-complete__multi-value__remove").first().click();

    // Verify only one tag remains
    await expect(page.locator(".subjects-auto-complete__multi-value")).toHaveCount(1);
});