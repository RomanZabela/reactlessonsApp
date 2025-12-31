import test, { expect } from "playwright/test";

test.describe('Home Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173/');
    });

    test('should discplay the home page correctly', async ({ page }) => {
        const card = page.locator('.p-card');
        await expect(card).toBeVisible();

        const title = card.locator('.p-card-title');
        await expect(title).toBeVisible();
    });

    test('should display initial count as 0', async ({ page }) => {
        const countInfo = page.locator('.count-info');
        await expect(countInfo).toBeVisible();
        await expect(countInfo).toContainText('0');
    });

    test('should display increment button with correct icon', async ({ page }) => {
        const button = page.getByTestId('increment-button');
        await expect(button).toBeVisible();

        const icon = button.locator('.pi-plus');
        await expect(icon).toBeVisible();
    });

    test('should increment count when button is clicked', async ({ page }) => {
        const button = page.getByTestId('increment-button');
        const countInfo = page.getByTestId('count-info');

        await expect(countInfo).toContainText('0');
        await button.click();
        await expect(countInfo).toContainText('1');
        await button.click();
        await expect(countInfo).toContainText('2');
    });

    test('should show success toast on increment', async ({ page }) => {
        const button = page.getByTestId('increment-button');

        await button.click();

        const toast = page.getByTestId('toast');
        await expect(toast).toBeVisible({ timeout: 2000 });
    });

    test('should icrement count multiple times and show correct toast message', async ({ page }) => {
        const button = page.getByTestId('increment-button');
        const countInfo = page.getByTestId('count-info');

        for (let i = 1; i <= 5; i++) {
            await button.click();
            await expect(countInfo).toContainText(i.toString());
        }

        const toasts = page.getByTestId('toast');
        await expect(toasts).toHaveCount(5);
    });

    test('should remove toast when close button is clicked', async ({ page }) => {
        const button = page.getByTestId('increment-button');
        await button.click();

        const toast = page.getByTestId('toast');
        const closeButton = toast.locator('.toast-close');
        await closeButton.click();

        await expect(toast).toHaveCount(0);
    });
});