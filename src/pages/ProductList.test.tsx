import test, { expect } from "playwright/test";

const mockProducts = {
    products: [
        {
            id: 1,
            title: 'Product 1',
            description: 'Description 1',
            price: 99.99,
            thumbnail: 'https://example.com/image1.jpg',
            category: 'Category 1'
        },
        {
            id: 2,
            title: 'Product 2',
            description: 'Description 2',
            price: 149.99,
            thumbnail: 'https://example.com/image2.jpg',
            category: 'Category 2'
        }
    ],
    total: 50,
    skip: 0,
    limit: 10
};

test.describe('Product List Page', () => {
    test.beforeEach( async ({ page }) => {
        await page.route('**/products?**', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(mockProducts)
            });
        })
    });

    test('should display product list correctly', async ({ page }) => {
        await page.goto('http://localhost:5173/products');

        await expect(page.locator('h1')).toBeVisible();
        await expect(page.locator('.dataTable')).toBeVisible();

        const rows = page.locator('.p-datatable-tbody > tr');
        await expect(rows).toHaveCount(mockProducts.products.length);

        for (let i = 0; i < mockProducts.products.length; i++) {
            const product = mockProducts.products[i];
            const row = rows.nth(i);
            await expect(row).toContainText(product.title);
            await expect(row).toContainText(product.category);
            await expect(row).toContainText(`$${product.price}`);
        }
    });

    test('should expand row to show description', async ({ page }) => {
        await page.goto('http://localhost:5173/products');

        const viewButton = page.locator('button[aria-label="View Details"]').first();
        await viewButton.click();
        await expect(page.locator('.p-datatable-row-expansion')).toBeVisible();
        await expect(page.locator('.p-datatable-row-expansion')).toContainText('Description 1');
        await expect(viewButton.locator('.pi-eye-slash')).toBeVisible();
    });

    test('should collapse row when view button is clicked again', async ({ page }) => {
        await page.goto('http://localhost:5173/products');

        const viewButton = page.locator('button[aria-label="View Details"]').first();
        await viewButton.click();
        await expect(page.locator('.p-datatable-row-expansion')).toBeVisible();

        await viewButton.click();
        await expect(page.locator('.p-datatable-row-expansion')).toHaveCount(0);
        await expect(viewButton.locator('.pi-eye')).toBeVisible();
    });

    test('should paginate to detailed page when row is clicked', async ({ page }) => {
        await page.goto('http://localhost:5173/products');

        const firstRow = page.locator('.p-datatable-tbody > tr').first();
        await firstRow.click();

        await expect(page).toHaveURL(/\/products\/1$/);
    });

    test('should handle pagination', async ({ page }) => {
        let requestCount = 0;
        
        await page.route('https://dummyjson.com/products*', async (route) => {
            const url = new URL(route.request().url());
            const skip = url.searchParams.get('skip') || '0';
            const limit = url.searchParams.get('limit') || '10';
            
            requestCount++;
            console.log(`Request ${requestCount}: skip=${skip}, limit=${limit}`);
            
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    products: requestCount === 1 ? mockProducts.products : [
                        {
                            id: 3,
                            title: 'Product 3',
                            description: 'Description 3',
                            price: 199.99,
                            thumbnail: 'https://example.com/image3.jpg',
                            category: 'Category 3'
                        }
                    ],
                    total: 50,
                    skip: Number(skip),
                    limit: Number(limit)
                })
            });
        });

        await page.goto('http://localhost:5173/products');
        
        // Wait for initial load
        await expect(page.getByText('Product 1')).toBeVisible();
        
        // Click next page button
        const nextButton = page.locator('.p-paginator-next').first();
        await nextButton.click();
        
        // Wait for new data to load
        await page.waitForTimeout(500);
        await expect(page.getByText('Product 3')).toBeVisible();
    });

    test('should change rows per page', async ({ page }) => {
        let lastLimit = '10';
        
        await page.route('https://dummyjson.com/products*', async (route) => {
            const url = new URL(route.request().url());
            lastLimit = url.searchParams.get('limit') || '10';
            
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    ...mockProducts,
                    limit: Number(lastLimit)
                })
            });
        });

        await page.goto('http://localhost:5173/products');
        
        // Wait for initial load
        await expect(page.getByText('Product 1')).toBeVisible();
        
        // Open dropdown
        const rowsDropdown = page.locator('.p-dropdown').first();
        await rowsDropdown.click();
        
        // Select 25 rows option
        await page.locator('.p-dropdown-item').filter({ hasText: '25' }).click();
        
        // Wait a bit for the request
        await page.waitForTimeout(500);
        
        // Verify the request was made with correct limit
        expect(lastLimit).toBe('25');
    });

    test('should disable next button on last page', async ({ page }) => {
        await page.route('https://dummyjson.com/products*', async (route) => {
            const url = new URL(route.request().url());
            const skip = Number(url.searchParams.get('skip')) || 0;
            
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    products: mockProducts.products,
                    total: 12, // Only 2 pages with limit 10
                    skip: skip,
                    limit: 10
                })
            });
        });

        await page.goto('http://localhost:5173/products');
        await expect(page.getByText('Product 1')).toBeVisible();
        
        // Go to last page
        const nextButton = page.locator('.p-paginator-next').first();
        await nextButton.click();
        await page.waitForTimeout(500);
        
        // Next button should be disabled
        await expect(nextButton).toBeDisabled();
    });

    test('should disable previous button on first page', async ({ page }) => {
        await page.goto('http://localhost:5173/products');
        await expect(page.getByText('Product 1')).toBeVisible();
        
        const prevButton = page.locator('.p-paginator-prev').first();
        await expect(prevButton).toBeDisabled();
    });
});