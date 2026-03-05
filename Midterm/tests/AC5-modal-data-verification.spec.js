import { test, expect } from "@playwright/test";

test("AC5.1 - Submission modal displays correct data", async ({ page }) => {
    await page.goto("https://demoqa.com/automation-practice-form");

    await page.getByPlaceholder("First Name").fill("Natthanicha");
    await page.getByPlaceholder("Last Name").fill("Jamjuree");
    await page.getByPlaceholder("name@example.com").fill("nat@example.com");
    await page.getByLabel("Female").click();
    await page.getByPlaceholder("Mobile Number").fill("0812345678");

    await page.locator("#dateOfBirthInput").click();
    await page.locator(".react-datepicker__year-select").selectOption("2005");
    await page.locator(".react-datepicker__month-select").selectOption("7");
    await page
        .locator(".react-datepicker__day--009:not(.react-datepicker__day--outside-month)")
        .click();

    await page.locator("#subjectsInput").fill("Maths");
    await page.keyboard.press("Enter");

    await page.getByLabel("Sports").click();
    await page.setInputFiles("#uploadPicture", "cat_jpg.jpg");
    await page.getByPlaceholder("Current Address").fill("Bangkok, Thailand");

    await page.locator("#state").click();
    await page.getByText("NCR", { exact: true }).click();
    await page.locator("#city").click();
    await page.getByText("Delhi", { exact: true }).click();

    await page.locator("#submit").click();

    const modal = page.locator(".modal-content");

    await expect(modal.getByRole("row", { name: /Natthanicha Jamjuree/ })).toBeVisible();
    await expect(modal.getByRole("row", { name: /nat@example.com/ })).toBeVisible();
    await expect(modal.getByRole("row", { name: /Female/ })).toBeVisible();
    await expect(modal.getByRole("row", { name: /0812345678/ })).toBeVisible();
    await expect(modal.getByRole("row", { name: /09 August,2005/ })).toBeVisible();
    await expect(modal.getByRole("row", { name: /Maths/ })).toBeVisible();
    await expect(modal.getByRole("row", { name: /Sports/ })).toBeVisible();
    await expect(modal.getByRole("row", { name: /Bangkok, Thailand/ })).toBeVisible();
    await expect(modal.getByRole("row", { name: /NCR Delhi/ })).toBeVisible();
});

test("AC5.2 - Optional fields should be empty when not provided", async ({ page }) => {
    await page.goto("https://demoqa.com/automation-practice-form");

    // Fill only required fields
    await page.getByPlaceholder("First Name").fill("Natthanicha");
    await page.getByPlaceholder("Last Name").fill("Jamjuree");
    await page.getByLabel("Female").click();
    await page.getByPlaceholder("Mobile Number").fill("0812345678");

    await page.locator("#dateOfBirthInput").click();
    await page.locator(".react-datepicker__year-select").selectOption("2005");
    await page.locator(".react-datepicker__month-select").selectOption("7");
    await page
        .locator(".react-datepicker__day--009:not(.react-datepicker__day--outside-month)")
        .click();

    await page.locator("#submit").click();

    const modal = page.locator(".modal-content");

    // Required fields should appear
    await expect(modal.getByRole("row", { name: /Natthanicha Jamjuree/ })).toBeVisible();
    await expect(modal.getByRole("row", { name: /Female/ })).toBeVisible();
    await expect(modal.getByRole("row", { name: /0812345678/ })).toBeVisible();

    // Optional fields should be empty
    await expect(modal.getByRole("row", { name: "Student Email" }))
        .toContainText("");

    await expect(modal.getByRole("row", { name: "Subjects" }))
        .toContainText("");

    await expect(modal.getByRole("row", { name: "Hobbies" }))
        .toContainText("");

    await expect(modal.getByRole("row", { name: "Picture" }))
        .toContainText("");

    await expect(modal.getByRole("row", { name: "Address" }))
        .toContainText("");

    await expect(modal.getByRole("row", { name: "State and City" }))
        .toContainText("");
});

test("AC5.3 - Close button should close modal and return to form", async ({ page }) => {
    await page.goto("https://demoqa.com/automation-practice-form");

    // Fill minimum required fields
    await page.getByPlaceholder("First Name").fill("Natthanicha");
    await page.getByPlaceholder("Last Name").fill("Jamjuree");
    await page.getByLabel("Female").click();
    await page.getByPlaceholder("Mobile Number").fill("0812345678");

    await page.locator("#submit").click();

    const modal = page.locator(".modal-content");

    // Ensure modal appears
    await expect(modal).toBeVisible();

    // Click Close button
    await page.getByRole("button", { name: "Close" }).click();

    // Modal should disappear
    await expect(modal).not.toBeVisible();

    // Form should be visible again
    await expect(page.locator("#userForm")).toBeVisible();
});

test("AC5.3 - Close button should close modal and return to form", async ({ page }) => {
    await page.goto("https://demoqa.com/automation-practice-form");

    // Fill minimum required fields
    await page.getByPlaceholder("First Name").fill("Natthanicha");
    await page.getByPlaceholder("Last Name").fill("Jamjuree");
    await page.getByLabel("Female").click();
    await page.getByPlaceholder("Mobile Number").fill("0812345678");

    await page.locator("#submit").click();

    const modal = page.locator(".modal-content");

    // Ensure modal appears
    await expect(modal).toBeVisible();

    // Click Close button
    await page.getByRole("button", { name: "Close" }).click();

    // Modal should disappear
    await expect(modal).not.toBeVisible();

    // Form should be visible again
    await expect(page.locator("#userForm")).toBeVisible();
});