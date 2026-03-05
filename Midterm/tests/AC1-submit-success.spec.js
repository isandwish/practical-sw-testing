import { test, expect } from "@playwright/test";

test("AC1 - User can successfully submit form with valid data", async ({ page }) => {
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

  await expect(
    page.locator("#example-modal-sizes-title-lg")
  ).toHaveText("Thanks for submitting the form");
});