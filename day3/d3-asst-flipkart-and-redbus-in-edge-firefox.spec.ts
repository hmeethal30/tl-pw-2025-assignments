/* 
Assignment Details: 
Task: 
Your task is to launch two separate browser instances using Playwright: 
1. Load Red Bus in an Edge browser instance and verify the page title and URL. 
2. Load Flipkart in a Firefox browser instance and verify the page title and URL. 
Preconditions: 
1. Use Playwright to launch Edge and Firefox. 
2. Create two separate browser instances. 
3. Use the following URLs: 
o Red Bus: https://www.redbus.in 
o Flipkart: https://www.flipkart.com 
Requirements: 
 Red Bus (Edge): 
o Load the home page and print the page title and current URL. 
 Flipkart (Firefox): 
o Load the home page and print the page title and current URL. 
*/

import { test, expect, chromium, firefox } from '@playwright/test';

test('red bus and flipkart in edge', async ()=> {
    // Define the URLs
    const redBusUrl = 'https://www.redbus.in';
    const flipkartUrl = 'https://www.flipkart.com';

    // Launch Edge browser instance
    const edgeBrowser = await chromium.launch( { headless: false, channel: 'msedge'})
    const edgeContext = await edgeBrowser.newContext();
    const edgePage = await edgeContext.newPage();

    //Load Red Bus page
    await edgePage.goto(redBusUrl);
    // Verify the page title and URL
    const redbusTitle = await edgePage.title();
    const redBusCurrentUrl = edgePage.url();
    console.log(`Red Bus Page Title: ${redbusTitle}`);
    console.log(`Red Bus Current URL: ${redBusCurrentUrl}`);
    
    expect.soft(redbusTitle).toContain('redBus'); 
    expect.soft(redBusCurrentUrl).toContain('redbus.in');

    // Load Flipkart page
    await edgePage.goto(flipkartUrl);
    // Verify the page title and URL
    const flipkartTitle = await edgePage.title();
    const flipkartCurrentUrl = edgePage.url(); 
    console.log(`Flipkart Page Title: ${flipkartTitle}`);
    console.log(`Flipkart Current URL: ${flipkartCurrentUrl}`);
    expect(flipkartTitle).toContain('Online Shopping Site');
    expect (flipkartCurrentUrl).toContain('flipkart');

    // Close the Edge browser instance
    await edgeBrowser.close();

})

test('red bus and flipkart in firefox', async ()=> {
    // Define the URLs
    const redBusUrl = 'https://www.redbus.in';
    const flipkartUrl = 'https://www.flipkart.com';

    // Launch Firefox browser instance
    const firefoxBrowser = await firefox.launch({ headless: false, channel: 'firefox' })
    const firefoxContext = await firefoxBrowser.newContext();
    const firefoxPage = await firefoxContext.newPage();

    //Load Red Bus page
    await firefoxPage.goto(redBusUrl);
    await firefoxPage.waitForLoadState('networkidle'); // Wait for the page to load completely
    // Verify the page title and URL
    const redbusTitle = await firefoxPage.title();
    const redBusCurrentUrl = firefoxPage.url();
    console.log(`Red Bus Page Title: ${redbusTitle}`);
    console.log(`Red Bus Current URL: ${redBusCurrentUrl}`);

    expect.soft(redbusTitle).toContain('redBus'); 
    expect.soft(redBusCurrentUrl).toContain('redbus.in');

    // Load Flipkart page
    await firefoxPage.goto(flipkartUrl);
    await firefoxPage.waitForLoadState('networkidle'); // Wait for the page to load completely

    // Verify the page title and URL
    const flipkartTitle = await firefoxPage.title();
    const flipkartCurrentUrl = firefoxPage.url();
    console.log(`Flipkart Page Title: ${flipkartTitle}`);
    console.log(`Flipkart Current URL: ${flipkartCurrentUrl}`);
    expect(flipkartTitle).toContain('Online Shopping Site');
    expect (flipkartCurrentUrl).toContain('flipkart');

    // Close the Edge browser instance
    await firefoxBrowser.close();
})