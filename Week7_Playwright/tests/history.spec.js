import { test, expect } from "@playwright/test";

async function login(page) {
  await page.goto("https://atm-buddy-lite.lovable.app/");
  await page.getByText("ATM BANKINGระบบ ATM อัตโนมัติ").click();
  await page.getByRole("textbox", { name: "ตัวอย่าง:" }).fill("123456");
  await page.getByRole("textbox", { name: "รหัส PIN 4 หลัก" }).fill("1234");
  await page.getByRole("button", { name: "เข้าสู่ระบบ" }).click();
  await expect(
    page.getByText("เข้าสู่ระบบสำเร็จ", { exact: true })
  ).toBeVisible();
}

async function goToHistory(page) {
  await page.getByText("ประวัติHistory").click();
  await expect(
    page.getByRole("heading", { name: "ประวัติการทำธุรกรรม" })
  ).toBeVisible();
}

test("Open History Page", async ({ page }) => {
    await login(page);
    await goToHistory(page);
  });

test("Latest Deposit Appears in History", async ({ page }) => {
    await login(page);

    // Deposit
    await page.getByText("ฝากเงินDeposit").click();
    await page.locator('input[type="number"]').fill("50000");
    await page.getByRole("button", { name: "ฝากเงิน ฿50,000.00" }).click();
    await page.getByRole("button", { name: "กลับ" }).click();

    // Check History
    await goToHistory(page);

    const firstTransaction = page
      .locator("div.flex.items-center.justify-between.p-4")
      .first();

    await expect(firstTransaction.getByText("ฝากเงินสด")).toBeVisible();
    await expect(firstTransaction.getByText("+฿50,000.00")).toBeVisible();
  });

test("Withdraw Appears in History", async ({ page }) => {
    await login(page);

    // Withdraw
    await page.getByText("ถอนเงินWithdraw").click();
    await page.locator('input[type="number"]').fill("1000");
    await page.getByRole("button", { name: /ถอนเงิน/ }).click();
    await page.getByRole("button", { name: "กลับ" }).click();

    await goToHistory(page);

    const firstTransaction = page
      .locator("div.flex.items-center.justify-between.p-4")
      .first();

    await expect(firstTransaction.getByText("ถอนเงินสด")).toBeVisible();
    await expect(firstTransaction.getByText("-฿1,000.00")).toBeVisible();
  });

test("Transfer Appears in History", async ({ page }) => {
    await login(page);

    // Transfer
    await page.getByText("โอนเงินTransfer").click();
    await page
      .getByPlaceholder("กรอกหมายเลขบัญชี 6 หลัก")
      .fill("789012");
    await page.locator('input[type="number"]').fill("2000");
    await page.getByRole("button", { name: /โอนเงิน/ }).click();
    await page.getByRole("button", { name: "กลับ" }).click();

    await goToHistory(page);

    const firstTransaction = page
      .locator("div.flex.items-center.justify-between.p-4")
      .first();

    await expect(
      firstTransaction.getByText("โอนเงินไปยัง 789012")
    ).toBeVisible();

    await expect(firstTransaction.getByText("-฿2,000.00")).toBeVisible();
  });

test("Transaction Count Is Displayed", async ({ page }) => {
    await login(page);
    await goToHistory(page);

    await expect(
      page.getByText(/แสดงรายการ \d+ รายการ/)
    ).toBeVisible();
});

test("Multiple transactions should be displayed correctly in history", async ({ page }) => {
  await login(page);

  // Deposit 10,000
  await page.getByText("ฝากเงินDeposit").click();
  await page.locator('input[type="number"]').fill("10000");
  await page.getByRole("button", { name: "ฝากเงิน ฿10,000.00" }).click();
  await page.getByRole("button", { name: "กลับ" }).click();

  // Withdraw 2,000
  await page.getByText("ถอนเงินWithdraw").click();
  await page.locator('input[type="number"]').fill("2000");
  await page.getByRole("button", { name: /ถอนเงิน/ }).click();
  await page.getByRole("button", { name: "กลับ" }).click();

  // Transfer 3,000
  await page.getByText("โอนเงินTransfer").click();
  await page.getByPlaceholder("กรอกหมายเลขบัญชี 6 หลัก").fill("789012");
  await page.locator('input[type="number"]').fill("3000");
  await page.getByRole("button", { name: /โอนเงิน/ }).click();
  await page.getByRole("button", { name: "กลับ" }).click();

  // Go To History
  await goToHistory(page);

  const transactions = page.locator(
    "div.flex.items-center.justify-between.p-4"
  );

  // Ensure at least 3 transactions exist
  const count = await transactions.count();
  expect(count).toBeGreaterThanOrEqual(3);

  // =Check Latest = Transfer
  const latestTx = transactions.first();

  await expect(
    latestTx.getByText("โอนเงินไปยัง 789012")
  ).toBeVisible();

  await expect(
    latestTx.getByText("-฿3,000.00")
  ).toBeVisible();

  // Check Withdraw exists
  const withdrawTx = transactions
    .filter({ hasText: "ถอนเงินสด" })
    .first();

  await expect(
    withdrawTx.getByText("-฿2,000.00")
  ).toBeVisible();

  // Check Deposit exists
  const depositTx = transactions
    .filter({ hasText: "ฝากเงินสด" })
    .first();

  await expect(
    depositTx.getByText("+฿10,000.00")
  ).toBeVisible();

  // Check transaction count text is displayed
  await expect(
    page.getByText(/แสดงรายการ \d+ รายการ/)
  ).toBeVisible();
});