import { test, expect } from "@playwright/test";

test("AC6.1 - Mobile must be exactly 10 digits", async ({ page }) => {
    await page.goto("https://demoqa.com/automation-practice-form");

    await page.getByPlaceholder("First Name").fill("Test");
    await page.getByPlaceholder("Last Name").fill("User");
    await page.getByLabel("Female").click();

    // Invalid mobile (less than 10 digits)
    await page.getByPlaceholder("Mobile Number").fill("12345");

    await page.locator("#submit").click();

    // Form should not submit
    await expect(page.locator("#example-modal-sizes-title-lg")).not.toBeVisible();
});

test("AC6.2 - Email must contain @ and valid domain", async ({ page }) => {
    await page.goto("https://demoqa.com/automation-practice-form");

    await page.getByPlaceholder("First Name").fill("Test");
    await page.getByPlaceholder("Last Name").fill("User");
    await page.getByLabel("Female").click();
    await page.getByPlaceholder("Mobile Number").fill("0812345678");

    // Invalid email
    await page.getByPlaceholder("name@example.com").fill("invalid-email");

    await page.locator("#submit").click();

    // Modal should not appear
    await expect(page.locator("#example-modal-sizes-title-lg")).not.toBeVisible();
});

test("AC6.3 - Date of Birth defaults to current system date", async ({ page }) => {
    await page.goto("https://demoqa.com/automation-practice-form");

    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = today.toLocaleString("en-US", { month: "short" });
    const year = today.getFullYear();

    const expectedDate = `${day} ${month} ${year}`;

    // Verify default value
    await expect(page.locator("#dateOfBirthInput")).toHaveValue(expectedDate);
});

test("AC6.2 - Email without domain extension should not submit", async ({ page }) => {
    await page.goto("https://demoqa.com/automation-practice-form");

    await page.getByPlaceholder("First Name").fill("Test");
    await page.getByPlaceholder("Last Name").fill("User");
    await page.getByLabel("Female").click();
    await page.getByPlaceholder("Mobile Number").fill("0812345678");

    await page.getByPlaceholder("name@example.com").fill("test@");

    await page.locator("#submit").click();

    await expect(page.locator("#example-modal-sizes-title-lg")).not.toBeVisible();
});

test("AC6.2 - Email missing @ symbol should not submit", async ({ page }) => {
    await page.goto("https://demoqa.com/automation-practice-form");

    await page.getByPlaceholder("First Name").fill("Test");
    await page.getByPlaceholder("Last Name").fill("User");
    await page.getByLabel("Female").click();
    await page.getByPlaceholder("Mobile Number").fill("0812345678");

    await page.getByPlaceholder("name@example.com").fill("testdomain.com");

    await page.locator("#submit").click();

    await expect(page.locator("#example-modal-sizes-title-lg")).not.toBeVisible();
});

test("AC6.3 - Date of Birth in the future should not submit", async ({ page }) => {
    await page.goto("https://demoqa.com/automation-practice-form");

    await page.getByPlaceholder("First Name").fill("Test");
    await page.getByPlaceholder("Last Name").fill("User");
    await page.getByLabel("Female").click();
    await page.getByPlaceholder("Mobile Number").fill("0812345678");

    const nextYear = new Date().getFullYear() + 1;

    await page.locator("#dateOfBirthInput").click();
    await page.locator(".react-datepicker__year-select").selectOption(String(nextYear));
    await page.locator(".react-datepicker__month-select").selectOption("0");
    await page
        .locator(".react-datepicker__day--001:not(.react-datepicker__day--outside-month)")
        .click();

    await page.locator("#submit").click();

    await expect(page.locator("#example-modal-sizes-title-lg")).not.toBeVisible();
});

test("AC6 - Uploading PDF file should not submit", async ({ page }) => {
    await page.goto("https://demoqa.com/automation-practice-form");

    await page.getByPlaceholder("First Name").fill("Test");
    await page.getByPlaceholder("Last Name").fill("User");
    await page.getByLabel("Female").click();
    await page.getByPlaceholder("Mobile Number").fill("0812345678");

    // Upload invalid file type
    await page.setInputFiles("#uploadPicture", "pdf_file.pdf");

    await page.locator("#submit").click();

    // Submission should fail
    await expect(page.locator("#example-modal-sizes-title-lg")).not.toBeVisible();
});

test("AC6 - Uploading HTML file should not submit", async ({ page }) => {
    await page.goto("https://demoqa.com/automation-practice-form");

    await page.getByPlaceholder("First Name").fill("Test");
    await page.getByPlaceholder("Last Name").fill("User");
    await page.getByLabel("Female").click();
    await page.getByPlaceholder("Mobile Number").fill("0812345678");

    // Upload invalid file type
    await page.setInputFiles("#uploadPicture", "demosite.html");

    await page.locator("#submit").click();

    // Submission should fail
    await expect(page.locator("#example-modal-sizes-title-lg")).not.toBeVisible();
});