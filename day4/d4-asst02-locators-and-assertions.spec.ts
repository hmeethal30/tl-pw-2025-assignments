/* 
Assignment: 1 Create Lead 
1. Login to https://login.salesforce.com 
2. Click on toggle menu button from the left corner 
3. Click view All and click Sales from App Launcher 
4. Click on Leads tab  
5. Click on New button 
6. Select Salutation dropdown 
7. Enter the Last Name 
8. Enter the Company Name  
9. Click Save and Verify Leads name created
*/

import { expect, test } from '@playwright/test';

test('assignment01:create lead in salesforce', async ({ page }) => {
    // Test data
    const Salutation = 'Ms.'
    const lastName = 'Happiness'
    const companyName = 'Pueple Inc'
    const leadToastMessageExpected = `Lead "${Salutation} ${lastName}" was created.`; 


    //open salesforce login page
    await page.goto('https://login.salesforce.com/');
    await page.locator('#username').fill('haseenajubz@gmail.com'); // enter username
    await page.locator('#password').fill('SaleTest@2025'); // enter password  
    await page.locator('#Login').click(); // click login button

    await page.waitForTimeout(10000); // wait for 10 seconds

    
    await page.locator('.slds-icon-waffle').click(); // click on toggle menu button from the left corner
    await page.waitForTimeout(2000); // wait for 2 seconds
    await page.locator('text=View All').click(); // click view All from App Launcher
    await page.waitForTimeout(2000); // wait for 2 seconds
    await page.getByPlaceholder('Search apps or items...').fill('Sales'); 
    
    const _locatorSalesLink = page.getByRole('link', { name: 'Sales', exact: true });
    await _locatorSalesLink.waitFor({ state: 'visible' }); // wait for Sales link to be visible
    await _locatorSalesLink.click();
 
   
    await page.getByRole('link', { name: 'Leads'}).click();

    await page.getByRole('button', { name: 'New' }).click(); // click on New button'})

    await page.getByRole('combobox', { name: 'Salutation'}).click(); // select Salutation dropdown
    await page.locator(`text=${Salutation}`).click(); // select Salutation dropdown value

    await page.getByRole('textbox', { name: 'Last Name' }).fill(lastName); // enter the Last Name
    await page.getByRole('textbox', { name: 'Company' }).fill('Test Company'); // enter the Company Name

    await page.getByRole('button', { name: 'Save', exact: true }).click(); // click Save button

    // Check if the toast message is displayed on the page
    await expect(page.locator('.toastMessage')).toBeVisible(); 

    // Check if the lead name is displayed on the page
    await expect(page.getByRole('link', {name:`${lastName}`})).toBeVisible(); 

    // get the toast message
    const leadToastMessageActual = await page.locator('.toastMessage').innerText(); 

    // print the toast message to the console
    console.log(`Lead creation confirmation message displayed is: ${leadToastMessageActual}`); 

    // verify if the toast message displayed is as expected
    expect(leadToastMessageActual).toEqual(leadToastMessageExpected); 

    await page.close();
})

test ('assignment02: edit a lead in leaftaps', async ( {page} ) => {
    // Assignment: 2 Edit a Lead 

    // Input Test data
    const loginURL = 'http://leaftaps.com/opentaps/control/main';
    const username = 'Demosalesmanager';
    const password = 'crmsfa';
    const firstNameForLeadSearch = 'test';
    const updatedCompanyName = 'Edited Purple Inc';
    const updatedAnnualRevenue = '300';
    const updatedDepartment = 'Up Dep';
    const updatedLeadDescription = 'Up Description';



    // 1. Navigate to the url http://leaftaps.com/opentaps/control/main 
    await page.goto(`${loginURL}`); // open leaftaps login page

    // 2. Enter the username as ‘Demosalesmanager’ 
    await page.getByRole('textbox', { name: 'Username'}).fill(username)

    // 3. Enter the password as ‘crmsfa’ 
    await page.getByLabel('Password').fill(password)

    // 4. Click the Login button
    await page.getByRole('button', { name: 'Login'}).click()


    // 5. Click CRM/SFA 
    await page.getByRole('link', { name: 'CRM/SFA' }).click()

    // 6. Click Leads 
    await page.getByRole('link', { name: 'Leads' }).click()

    // 7. Click Find Leads
    await page.getByRole('link', { name: 'Find Leads' }).click()

    // 8. Enter the first name
    await page.getByRole('textbox', { name: 'First name:' })

    // 9. Click Find Leads button 
    await page.getByRole('button', { name: 'Find Leads' }).click()
    
    // 10. Click the first resulting Lead ID
    const firstLeadLocator = page.locator(`//span[text()='Lead List']/following::table[1]/following::a[1]`)
    await firstLeadLocator.waitFor({ state: 'visible' });
    await firstLeadLocator.click();

    // 11. Click Edit 
    await page.getByRole('link', { name: 'Edit', exact: true }).click();

    // 12. Edit Company name
    await page.locator('#updateLeadForm_companyName').clear();
    await page.locator('#updateLeadForm_companyName').fill(updatedCompanyName);

    // 13. Edit Annual Revenue 
    await page.locator('#updateLeadForm_annualRevenue').clear();
    await page.locator('#updateLeadForm_annualRevenue').fill(updatedAnnualRevenue);

    // 14. Edit Department
    await page.locator('#updateLeadForm_departmentName').clear();
    await page.locator('#updateLeadForm_departmentName').fill(updatedDepartment);

    // 15. Enter Description
    await page.locator('#updateLeadForm_description').clear();
    await page.locator('#updateLeadForm_description').fill(updatedLeadDescription);

    // 16. Click Update 
    await page.getByRole('button', { name: 'Update'}).click();

    // 17. Verify the edited fields using appropriate assertions 
    const updatedAnnualRevenueActual = await page.locator('#viewLead_annualRevenue_sp').textContent();
    console.log(`The annual revenue after update is ${updatedAnnualRevenueActual}`)
    expect (updatedAnnualRevenueActual).toContain(updatedAnnualRevenue)

    const updatedLeadDepartmentActual = await page.locator('#viewLead_departmentName_sp').textContent();
    console.log(`The Department after update is ${updatedLeadDepartmentActual}`)
    expect (updatedLeadDepartmentActual).toEqual(updatedDepartment)

    const updatedLeadDescriptionActual = await page.locator('#viewLead_description_sp').textContent();
    console.log(`The lead description after update is ${updatedLeadDescriptionActual}`)
    expect (updatedLeadDescriptionActual).toContain(updatedLeadDescription)

})

test('assignment03:create a new service account in salesforce', async( {page} ) => {

    // Test data
    const loginURL = 'https://login.salesforce.com/'; // login URL
    const username = 'haseenajubz@gmail.com'; // username
    const password = 'SaleTest@2025'; // password
    const testAccountName = 'Purple Service Account'; // account name

    // Assertions: Expected values
    const titleAfterLoginExpected = 'Home | Salesforce'; // expected title after login
    const urlAfterLoginExpected = 'https://testleaf82-dev-ed.develop.lightning.force.com/lightning/setup/SetupOneHome/home'; // expected url after login
    const accountToastMessageExpected = `Account "${testAccountName}" was created.`; // expected toast message after account creation

    // 1. Navigate to the url https://login.salesforce.com/ 
    await page.goto(`${loginURL}`); // open salesforce login page

    
    await  page.getByLabel('username').fill(username);   // 2. Enter username using getByLabel
    await page.getByLabel('password').fill(password); // 3. Enter password using getByLabel

    // 4. Click Login 
    await page.getByRole('button', {name: 'Log In'}).click();
    await page.waitForTimeout(10000); // wait for 10 seconds
    
    // 5. Verify the title and url of the page using appropriate assertions
    const titleAfterLogin = await page.title(); // get the title of the page
    const urlAfterLogin = page.url(); // get the url of the page

    // print the title and url of the page
    console.log(`Page title after login is: ${titleAfterLogin}`); // print the title of the page
    console.log(`Page URL after login is: ${urlAfterLogin}`); // print the url of the page

    //Verify the title and url of the page
    expect(titleAfterLogin).toEqual(titleAfterLoginExpected); // verify the title of the page'); 
    expect(urlAfterLogin).toEqual(urlAfterLoginExpected); // verify the url of the page


    // 6. Click App Launcher using the class locator
    await page.locator('.slds-icon-waffle').click(); 

    // 7. Click View All using getByText 
    await page.getByText('View All').click();

    // 8. Enter ‘Service’ in the App Launcher Search box using getByPlaceHolder 
    await page.getByPlaceholder('Search apps or items...').fill('Service');
    await page.getByPlaceholder('Search apps or items...').press('Enter'); // press Enter key to search for Service

    // 9. Click Service using index based XPath
    await page.locator(`(//mark[contains(text(), "Service")])[1]`).click(); // click Service using index based XPath

    // 10. Click Accounts using attribute based CSS selector
    await page.locator(`a[title='Accounts']`).click();

    // 11. Click New using getByRole 
    await page.getByRole('button', { name: 'New'}).click();

    // 12. Enter Account name using attribute based CSS selector
    await page.locator(`input[name='Name']`).fill(testAccountName); // enter Account name using attribute based CSS selector

    // 13. Click Save button using XPath 
    await page.locator(`//button[@name='SaveEdit']`).click(); 

    // 14. Verify the toast message displayed 
    await expect(page.locator(`.toastMessage`)).toBeVisible(); // verify the toast message displayed
    const accountToastMessageActual = await page.locator(`.toastMessage`).innerText(); // get the toast message

    console.log(`Account creation confirmation message displayed is: ${accountToastMessageActual}`); // print the toast message to the console

    expect(accountToastMessageActual).toEqual(accountToastMessageExpected); // verify the toast message displayed
})
