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

test("Transfer Success", async ({ page }) => {
    // Login
    await login(page);
    
    // Transfer
    await page.getByText("โอนเงินTransfer").click();
    await page.getByPlaceholder("กรอกหมายเลขบัญชี 6 หลัก").fill("789012");
    await expect(page.getByText("โอนเงินTransfer Money")).toBeVisible();
    await page.getByRole("button", { name: "฿1,000.00" }).click();
    await expect(page.locator('input[type="number"]')).toHaveValue("1000");
    await page.getByRole("button", { name: "โอนเงิน ฿1,000.00" }).click();
    await expect(page.getByText("โอนเงินสำเร็จ", { exact: true })).toBeVisible();
    await expect((page.getByText("ยอดเงินคงเหลือปัจจุบัน").locator("..")).getByText("฿49,000.00")).toBeVisible();
});

test("Transfer Minimum (1 Baht)", async ({ page }) => {
    await login(page);

    await page.getByText("โอนเงินTransfer").click();
    await page.getByPlaceholder("กรอกหมายเลขบัญชี 6 หลัก").fill("789012");

    await page.locator('input[type="number"]').fill("1");
    await page.getByRole("button", { name: "โอนเงิน ฿1.00" }).click();
    
    await expect(page.getByText("โอนเงินสำเร็จ", { exact: true })).toBeVisible();
    await expect((page.getByText("ยอดเงินคงเหลือปัจจุบัน").locator("..")).getByText("฿49,999.00")).toBeVisible();
});

test("Transfer Maximum (200000)", async ({ page }) => {
    await login(page);

    // Deposit first
    await page.getByText("ฝากเงินDeposit").click();
    await expect(page.getByRole("heading", { name: "ฝากเงิน" })).toBeVisible();
    await page.locator('input[type="number"]').fill("100000");
    await page.getByRole("button", { name: "ฝากเงิน ฿100,000.00" }).click();
    await expect(page.getByText("ฝากเงินสำเร็จ", { exact: true })).toBeVisible();
    await expect((page.getByText("ยอดเงินคงเหลือปัจจุบัน").locator("..")).getByText("฿150,000.00")).toBeVisible();
    await page.locator('input[type="number"]').fill("100000");
    await page.getByRole("button", { name: "ฝากเงิน ฿100,000.00" }).click();
    await expect(page.getByText("ฝากเงินสำเร็จ", { exact: true })).toBeVisible();
    await expect((page.getByText("ยอดเงินคงเหลือปัจจุบัน").locator("..")).getByText("฿250,000.00")).toBeVisible();
    await page.getByRole("button", { name: "กลับ" }).click();

    // Now transfer
    await page.getByText("โอนเงินTransfer").click();
    await page.getByPlaceholder("กรอกหมายเลขบัญชี 6 หลัก").fill("789012");
    await page.locator('input[type="number"]').fill("200000");

    await page.getByRole("button", {
        name: "โอนเงิน ฿200,000.00",
    }).click();

    await expect(page.getByText("โอนเงินสำเร็จ", { exact: true })).toBeVisible();
    await expect((page.getByText("ยอดเงินคงเหลือปัจจุบัน").locator("..")).getByText("฿50,000.00")).toBeVisible();
});

test("Transfer Below Minimum (0.5)", async ({ page }) => {
    await login(page);

    await page.getByText("โอนเงินTransfer").click();
    await page.getByPlaceholder("กรอกหมายเลขบัญชี 6 หลัก").fill("789012");

    await page.locator('input[type="number"]').fill("0.5");

    page.once("dialog", async (dialog) => {
        expect(dialog.message()).toContain("must be greater than or equal to 1");
        await dialog.dismiss();
    });

    await page.getByRole("button", { name: "โอนเงิน ฿0.50" }).click();
});

test("Transfer Negative Amount (-1)", async ({ page }) => {
    await login(page);

    await page.getByText("โอนเงินTransfer").click();
    await page.getByPlaceholder("กรอกหมายเลขบัญชี 6 หลัก").fill("789012");
    await page.locator('input[type="number"]').fill("-1");

    const transferButton = page.getByRole("button", { name: "โอนเงิน -฿1.00" });
    await expect(transferButton).toBeDisabled();
});

test("Transfer To Invalid Account", async ({ page }) => {
    await login(page);

    await page.getByText("โอนเงินTransfer").click();
    await page.getByPlaceholder("กรอกหมายเลขบัญชี 6 หลัก").fill("151515");
    await page.locator('input[type="number"]').fill("100");

    await page.getByRole("button", { name: "โอนเงิน ฿100.00" }).click();

    await expect(
        page.getByText("ไม่พบบัญชีปลายทาง", { exact: true })
    ).toBeVisible();
});

test("Transfer More Than Balance", async ({ page }) => {
    await login(page);

    await page.getByText("โอนเงินTransfer").click();
    await page.getByPlaceholder("กรอกหมายเลขบัญชี 6 หลัก").fill("789012");
    await page.locator('input[type="number"]').fill("60000");

    const transferButton = page.getByRole("button", {
        name: "โอนเงิน ฿60,000.00",
    });

    await expect(transferButton).toBeDisabled();
});

test("Transfer Above Maximum (200001)", async ({ page }) => {
    await login(page);

    // Deposit first
    await page.getByText("ฝากเงินDeposit").click();
    await expect(page.getByRole("heading", { name: "ฝากเงิน" })).toBeVisible();
    await page.locator('input[type="number"]').fill("100000");
    await page.getByRole("button", { name: "ฝากเงิน ฿100,000.00" }).click();
    await expect(page.getByText("ฝากเงินสำเร็จ", { exact: true })).toBeVisible();
    await expect((page.getByText("ยอดเงินคงเหลือปัจจุบัน").locator("..")).getByText("฿150,000.00")).toBeVisible();
    await page.locator('input[type="number"]').fill("100000");
    await page.getByRole("button", { name: "ฝากเงิน ฿100,000.00" }).click();
    await expect(page.getByText("ฝากเงินสำเร็จ", { exact: true })).toBeVisible();
    await expect((page.getByText("ยอดเงินคงเหลือปัจจุบัน").locator("..")).getByText("฿250,000.00")).toBeVisible();
    await page.getByRole("button", { name: "กลับ" }).click();

    await page.getByText("โอนเงินTransfer").click();
    await page.getByPlaceholder("กรอกหมายเลขบัญชี 6 หลัก").fill("789012");
    await page.locator('input[type="number"]').fill("200001");

    page.once("dialog", async (dialog) => {
        expect(dialog.message()).toContain(
        "less than or equal to 200000"
        );
        await dialog.dismiss();
    });

    await page.getByRole("button", { name: "โอนเงิน ฿200,001.00" }).click();
});