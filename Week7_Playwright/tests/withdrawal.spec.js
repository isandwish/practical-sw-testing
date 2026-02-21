import { test, expect } from "@playwright/test";

async function login(page) {
    // Login
    await page.goto(
        "https://atm-buddy-lite.lovable.app/?fbclid=IwZXh0bgNhZW0CMTAAYnJpZBExY1RVU2UzVlhZNU1ZVFV6SwEeG95HaKRUZ4S4SsfHUDDsw3FFGPEyhRh_Fn_77KciqvuNxyxd4FkEFK02O9c_aem_ycGlUd5UYRQc-LADxvwcLQ",
    );
    await page.goto("https://atm-buddy-lite.lovable.app/");
    await page.getByText("ATM BANKINGระบบ ATM อัตโนมัติ").click();
    await page.getByRole("textbox", { name: "ตัวอย่าง:" }).fill("123456");
    await page.getByRole("textbox", { name: "รหัส PIN 4 หลัก" }).fill("1234");
    await page.getByRole("button", { name: "เข้าสู่ระบบ" }).click();
    await expect(page.getByText("เข้าสู่ระบบสำเร็จ", { exact: true })).toBeVisible();
}

test("Withdrawal Success", async ({ page }) => {
    // Login
    await login(page);
    
    // Withdrawal
    await page.getByText("ถอนเงินWithdrawal").click();
    await expect(page.getByRole("heading", { name: "ถอนเงิน" })).toBeVisible();
    await page.getByRole("button", { name: "฿500.00" }).click();
    await expect(page.locator('input[type="number"]')).toHaveValue("500");
    await page.getByRole("button", { name: "ถอนเงิน ฿500.00" }).click();
    await expect(page.getByText("ถอนเงินสำเร็จ", { exact: true })).toBeVisible();
    await expect((page.getByText("ยอดเงินคงเหลือปัจจุบัน").locator("..")).getByText("฿49,500.00")).toBeVisible();
});

test("Withdrawal Below Minimum (50)", async ({ page }) => {
    // Login
    await login(page);

    // Withdrawal
    await page.getByText("ถอนเงินWithdrawal").click();
    await page.locator('input[type="number"]').fill("50");

    page.once("dialog", async (dialog) => {
        expect(dialog.message()).toContain(
            "Value must be greater than or equal to 100."
        );
        await dialog.dismiss();
    });

    await page.getByRole("button", {name: "ถอนเงิน ฿50.00",}).click();
});

test("Withdrawal Not Multiple of 100 (550)", async ({ page }) => {
    // Login
    await login(page);

    // Withdrawal
    await page.getByText("ถอนเงินWithdrawal").click();
    await page.locator('input[type="number"]').fill("550");

    page.once("dialog", async (dialog) => {
        expect(dialog.message()).toContain(
            "Please enter a valid value. The two nearest valid values are 500 and 600."
        );
        await dialog.dismiss();
    });

    await page.getByRole("button", {name: "ถอนเงิน ฿550.00",}).click();
});

test("Withdrawal Above Maximum (50001)", async ({ page }) => {
    // Login
    await login(page);
    
    // Deposit
    await page.getByText("ฝากเงินDeposit").click();
    await expect(page.getByRole("heading", { name: "ฝากเงิน" })).toBeVisible();
    await page.locator('input[type="number"]').fill("100000");
    await page.getByRole("button", { name: "ฝากเงิน ฿100,000.00" }).click();
    await expect(page.getByText("ฝากเงินสำเร็จ", { exact: true })).toBeVisible();
    await expect((page.getByText("ยอดเงินคงเหลือปัจจุบัน").locator("..")).getByText("฿150,000.00")).toBeVisible();
    await page.getByRole("button", { name: "กลับ" }).click()

    // Withdrawal
    await page.getByText("ถอนเงินWithdrawal").click();
    await page.locator('input[type="number"]').fill("50001");

    page.once("dialog", async (dialog) => {
        expect(dialog.message()).toContain(
            "Value must be less than or equal to 50000."
        );
        await dialog.dismiss();
    });

    await page.getByRole("button", {name: "ถอนเงิน ฿50,001.00",}).click();
});

test("Withdrawal Maximum (50000)", async ({ page }) => {
    // Login
    await login(page);

    // Withdrawal
    await page.getByText("ถอนเงินWithdrawal").click();
    await page.locator('input[type="number"]').fill("50000");

    await page.getByRole("button", {
        name: "ถอนเงิน ฿50,000.00",
    }).click();

    await expect(page.getByText("ถอนเงินสำเร็จ", { exact: true })).toBeVisible();
});

test("Withdrawal Twice - Sufficient Balance", async ({ page }) => {
    await login(page);

    // Withdrawal
    await page.getByText("ถอนเงินWithdrawal").click();

    // First withdrawal (500)
    await page.getByRole("button", { name: "฿500.00" }).click();
    await page.getByRole("button", { name: "ถอนเงิน ฿500.00" }).click();

    // Verify updated balance after first withdrawal
    await expect(page.getByText("ถอนเงินสำเร็จ", { exact: true })).toBeVisible();
    await expect(page.getByText("฿49,500.00")).toBeVisible();

    // Second withdrawal (500)
    await page.getByRole("button", { name: "฿500.00" }).click();
    await page.getByRole("button", { name: "ถอนเงิน ฿500.00" }).click();

    // Verify updated balance after second withdrawal
    await expect(page.getByText("ถอนเงินสำเร็จ", { exact: true })).toBeVisible();
    await expect(page.getByText("฿49,000.00")).toBeVisible();
});

test("Withdrawal Twice - Insufficient Balance", async ({ page }) => {
    await login(page);

    // Withdrawal
    await page.getByText("ถอนเงินWithdrawal").click();

    // First withdrawal (50000)
    await page.locator('input[type="number"]').fill("50000");
    await page.getByRole("button", {name: "ถอนเงิน ฿50,000.00",}).click();
    await expect(page.getByText("ถอนเงินสำเร็จ", { exact: true })).toBeVisible();

    // Verify balance is now 0
    await expect(page.getByText("฿0.00")).toBeVisible();

    // Try to withdraw again
    await page.getByText("ถอนเงินWithdrawal").click();
    await expect(page.getByRole("button", { name: "฿500.00" })).toBeDisabled();

    await page.locator('input[type="number"]').fill("1000");

    // Verify withdraw button is disabled due to insufficient balance
    await expect(page.getByRole("button", {name: "ถอนเงิน ฿1,000.00",})).toBeDisabled();
});