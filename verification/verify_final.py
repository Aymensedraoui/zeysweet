import asyncio
from playwright.async_api import async_playwright
import os

async def verify():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        # High resolution for "premium" feel
        page = await browser.new_page(viewport={'width': 1920, 'height': 1080})

        try:
            await page.goto('http://localhost:8080')
            await page.wait_for_timeout(2000)  # Wait for animations

            # 1. Hero Screenshot
            await page.screenshot(path='verification/hero_final.png')
            print("Captured hero_final.png")

            # 2. Products Hover & Reveal
            await page.locator('#products').scroll_into_view_if_needed()
            await page.wait_for_timeout(1000)

            # Hover over first product
            product_cards = page.locator('.card-premium')
            if await product_cards.count() > 0:
                await product_cards.nth(0).hover()
                await page.wait_for_timeout(1000)
                await page.screenshot(path='verification/product_hover_final.png')
                print("Captured product_hover_final.png")

            # 3. Mobile View
            mobile_page = await browser.new_page(viewport={'width': 390, 'height': 844}, is_mobile=True)
            await mobile_page.goto('http://localhost:8080')
            await mobile_page.wait_for_timeout(2000)
            await mobile_page.screenshot(path='verification/mobile_final.png')
            print("Captured mobile_final.png")

            # 4. Record a short video of scroll animations
            context = await browser.new_context(record_video_dir="verification/videos/")
            video_page = await context.new_page()
            await video_page.goto('http://localhost:8080')
            await video_page.evaluate("""async () => {
                const distance = 500;
                const delay = 100;
                while (document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight) {
                  window.scrollBy(0, distance);
                  await new Promise(resolve => setTimeout(resolve, delay));
                }
            }""")
            await context.close()
            print("Recorded scroll animation video")

        except Exception as e:
            print(f"Error during verification: {e}")
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(verify())
