import { test, expect } from "@playwright/test";

test("Deposit Success", async ({ page }) => {
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
    
    // Deposit
    await page.getByText("ฝากเงินDeposit").click();
    await expect(page.getByRole("heading", { name: "ฝากเงิน" })).toBeVisible();
    await page.getByRole("button", { name: "฿500.00" }).click();
    await expect(page.locator('input[type="number"]')).toHaveValue("500");
    await page.getByRole("button", { name: "ฝากเงิน ฿500.00" }).click();
    await expect(page.getByText("ฝากเงินสำเร็จ", { exact: true })).toBeVisible();
    await expect((page.getByText("ยอดเงินคงเหลือปัจจุบัน").locator("..")).getByText("฿50,500.00")).toBeVisible();
});

test("Deposit Minimum Value", async ({ page }) => {
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
    
    // Deposit
    await page.getByText("ฝากเงินDeposit").click();
    await expect(page.getByRole("heading", { name: "ฝากเงิน" })).toBeVisible();
    await page.locator('input[type="number"]').fill("1");
    await page.getByRole("button", { name: "ฝากเงิน ฿1.00" }).click();
    await expect(page.getByText("ฝากเงินสำเร็จ", { exact: true })).toBeVisible();
    await expect((page.getByText("ยอดเงินคงเหลือปัจจุบัน").locator("..")).getByText("฿50,001.00")).toBeVisible();
});

test("Deposit Maxmimum Value", async ({ page }) => {
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
    
    // Deposit
    await page.getByText("ฝากเงินDeposit").click();
    await expect(page.getByRole("heading", { name: "ฝากเงิน" })).toBeVisible();
    await page.locator('input[type="number"]').fill("100000");
    await page.getByRole("button", { name: "ฝากเงิน ฿100,000.00" }).click();
    await expect(page.getByText("ฝากเงินสำเร็จ", { exact: true })).toBeVisible();
    await expect((page.getByText("ยอดเงินคงเหลือปัจจุบัน").locator("..")).getByText("฿150,000.00")).toBeVisible();
});

test("Deposit 0", async ({ page }) => {
  // Login
  await page.goto("https://atm-buddy-lite.lovable.app/?fbclid=IwZXh0bgNhZW0CMTAAYnJpZBExY1RVU2UzVlhZNU1ZVFV6SwEeG95HaKRUZ4S4SsfHUDDsw3FFGPEyhRh_Fn_77KciqvuNxyxd4FkEFK02O9c_aem_ycGlUd5UYRQc-LADxvwcLQ");
  await page.getByText("ATM BANKINGระบบ ATM อัตโนมัติ").click();
  await page.getByRole("textbox", { name: "ตัวอย่าง:" }).fill("123456");
  await page.getByRole("textbox", { name: "รหัส PIN 4 หลัก" }).fill("1234");
  await page.getByRole("button", { name: "เข้าสู่ระบบ" }).click();
  await expect(page.getByText("เข้าสู่ระบบสำเร็จ", { exact: true })).toBeVisible();

  // Deposit 0
  await page.getByText("ฝากเงินDeposit").click();
  await page.locator('input[type="number"]').fill("0");
  await expect(page.getByRole("button", { name: "ฝากเงิน ฿0.00" })).toBeDisabled();
});

test("Deposit -1", async ({ page }) => {
  await page.goto("https://atm-buddy-lite.lovable.app/?fbclid=IwZXh0bgNhZW0CMTAAYnJpZBExY1RVU2UzVlhZNU1ZVFV6SwEeG95HaKRUZ4S4SsfHUDDsw3FFGPEyhRh_Fn_77KciqvuNxyxd4FkEFK02O9c_aem_ycGlUd5UYRQc-LADxvwcLQ");
  await page.getByText("ATM BANKINGระบบ ATM อัตโนมัติ").click();
  await page.getByRole("textbox", { name: "ตัวอย่าง:" }).fill("123456");
  await page.getByRole("textbox", { name: "รหัส PIN 4 หลัก" }).fill("1234");
  await page.getByRole("button", { name: "เข้าสู่ระบบ" }).click();

  // Deposit 1
  await page.getByText("ฝากเงินDeposit").click();
  await page.locator('input[type="number"]').fill("-1");
  await expect(page.getByRole("button", { name: "ฝากเงิน -฿1.00" })).toBeDisabled();
});

test("Deposit 100001", async ({ page }) => {
    await page.goto("https://atm-buddy-lite.lovable.app/?fbclid=IwZXh0bgNhZW0CMTAAYnJpZBExY1RVU2UzVlhZNU1ZVFV6SwEeG95HaKRUZ4S4SsfHUDDsw3FFGPEyhRh_Fn_77KciqvuNxyxd4FkEFK02O9c_aem_ycGlUd5UYRQc-LADxvwcLQ");
    await page.getByText("ATM BANKINGระบบ ATM อัตโนมัติ").click();
    await page.getByRole("textbox", { name: "ตัวอย่าง:" }).fill("123456");
    await page.getByRole("textbox", { name: "รหัส PIN 4 หลัก" }).fill("1234");
    await page.getByRole("button", { name: "เข้าสู่ระบบ" }).click();

    // Deposit 100001
    await page.getByText("ฝากเงินDeposit").click();
    await page.locator('input[type="number"]').fill("100001");

    page.once("dialog", async (dialog) => {expect(dialog.message()).toContain("Value must be less than or equal to 100000.");
    await dialog.dismiss();});

    await page.getByRole("button", {name: "ฝากเงิน ฿100,001.00",}).click();
});

test("Deposit Twice", async ({ page }) => {
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
    
    // Deposit 1
    await page.getByText("ฝากเงินDeposit").click();
    await expect(page.getByRole("heading", { name: "ฝากเงิน" })).toBeVisible();
    await page.getByRole("button", { name: "฿500.00" }).click();
    await expect(page.locator('input[type="number"]')).toHaveValue("500");
    await page.getByRole("button", { name: "ฝากเงิน ฿500.00" }).click();
    await expect(page.getByText("ฝากเงินสำเร็จ", { exact: true })).toBeVisible();
    await expect((page.getByText("ยอดเงินคงเหลือปัจจุบัน").locator("..")).getByText("฿50,500.00")).toBeVisible();

    // Deposit 2
    await page.getByRole("button", { name: "฿20,000.00" }).click();
    await expect(page.locator('input[type="number"]')).toHaveValue("20000");
    await page.getByRole("button", { name: "ฝากเงิน ฿20,000.00" }).click();
    await expect(page.getByText("ฝากเงินสำเร็จ", { exact: true })).toBeVisible();
    await expect((page.getByText("ยอดเงินคงเหลือปัจจุบัน").locator("..")).getByText("฿70,500.00")).toBeVisible();
});