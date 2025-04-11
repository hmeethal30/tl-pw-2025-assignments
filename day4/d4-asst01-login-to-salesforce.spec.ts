/* 
Assignment Details: 
Your task is to print the title and url of a web page using Playwright. 
 
Precondition: - Launch Chromium in non-headless mode - Create a new browser context. - Open a new page within the browser context. - Load the url https://login.salesforce.com/ - Use your Salesforce credentials that you’ve created 
 
Requirements: - Enter the username. - Enter the password. - Click the Login button. - Wait for 10 seconds  - Print the page title and the current url of the page - Close the browser
*/

import { test } from '@playwright/test';

test('Login to Salesforce and print title and URL', async ({ page }) => {

    //open salesforce login page
    await page.goto('https://login.salesforce.com/');
    await page.locator('#username').fill('haseenajubz@gmail.com'); // enter username
    await page.locator('#password').fill('SaleTest@2025'); // enter password  
    await page.locator('#Login').click(); // click login button

    await page.waitForTimeout(10000); // wait for 10 seconds
    const titleAfterLogin = await page.title(); // get the title of the page
    const urlAfterLogin = await page.url(); // get the url of the page
    console.log(`Page title after login is: ${titleAfterLogin}`); // print the title of the page
    console.log(`Page URL after login is: ${urlAfterLogin}`); // print the url of the page
    
    await page.close();
})