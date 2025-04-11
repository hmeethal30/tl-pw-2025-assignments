import {test, expect} from '@playwright/test';
import { log } from 'console';

test(`assignment1:create lead in salseforce`, async( {page} ) => {
    //     Assignment: 1 Create Lead 
    // Input Test Data
    const loginURL = 'https://login.salesforce.com/'; // login URL
    const username = 'haseenajubz@gmail.com'; // username
    const password = 'SaleTest@2025'; // password

    //Lead Test Data Input
    const salutation = 'Mr.'; // Salutation
    const lastName = 'Happiness'; // Last Name
    const companyName = 'Happiness Inc'; // Company Name

    // Assertion Teta Data
    const titleAfterLoginExpected = 'Home | Salesforce'; // expected title after login
    const urlAfterLoginExpected = 'https://testleaf82-dev-ed.develop.lightning.force.com/lightning/setup/SetupOneHome/home'; // expected url after login
    const leadCreation_ToastMessage_expected = `Lead "${salutation}  ${lastName}" was created.`; // expected toast message after lead creation
    const titleAfterLeadCreation_expected = 'New Lead | Salesforce'; // expected title after lead creation

   
    // 1. Login to https://login.salesforce.com
    await page.goto(loginURL);
    await page.getByLabel('username').fill(username);
    await page.getByLabel('Password').fill(password);
    await page.getByRole('button', { name: 'Log In'} ).click();

    // 2. Click on toggle menu button from the left corner 
    await page.getByTitle('App Launcher').click();

    // 3. Click view All and click Sales from App Launcher 
    await page.getByRole('button', { name: 'View All'} ).click();
    await page.getByPlaceholder('Search apps or items..').fill('Sales');
    await page.getByPlaceholder('Search apps or items..').press('Enter');
    await page.getByRole('link', { name: 'Sales', exact: true }).click();
    
    // 4. Click on Leads tab 
    await page.getByRole('link', { name: 'Leads' }).click();

    // 5. Click on New button 
    await page.getByRole('button', { name: 'New' }).click();

    // 6. Select Salutation dropdown
    await page.getByRole('combobox', { name: 'Salutation'}).click();
    await page.getByText(salutation).click();

    // 7. Enter the Last Name 
    await page.getByPlaceholder('Last Name').fill(lastName);

    // 8. Enter the Company Name 
    await page.getByLabel('*Company', { exact: true}).fill(companyName);

    // 9. Click Save and Verify Leads name created 
    await page.getByRole('button', { name: 'Save', exact: true }).click();


    await expect(page.locator('.toastMessage')).toBeVisible();

    const leadCreation_ToastMessage_actual = await page.locator('.toastMessage').textContent();
    expect(leadCreation_ToastMessage_actual).toEqual(leadCreation_ToastMessage_expected)

    const titleAfterLeadCreation = await page.title();
    // const urlAfterLeadCreation = page.url();sa
    console.log(`Title after lead creation: ${titleAfterLeadCreation}`);
    expect(titleAfterLeadCreation).toEqual(titleAfterLeadCreation_expected);

})

test(`assignment2:create and edit lead in leaftaps`, async ( {page} ) => {

//     Assignment: 2 Edit Lead 

// Input Test data
const loginURL = 'http://leaftaps.com/opentaps/control/main';
const username = 'Demosalesmanager';
const password = 'crmsfa';
const updatedCompanyName = 'Edited Purple Inc';


// 1. Launch the browser
await page.goto(loginURL);

// 2. Enter the username 
await page.getByRole('textbox', { name: 'Username'}).fill(username)

// 3. Enter the password 
await page.getByLabel('Password').fill(password)

// 4. Click Login 
await page.getByRole('button', { name: 'Login'}).click()

// 5. Click CRM/SFA link 
await page.getByRole('link', { name: 'CRM/SFA' }).click()

// 6. Click Leads link 
await page.getByRole('link', { name: 'Leads' }).click()

// 7. Click on Create Lead 
await page.locator(`//a[contains(text(), 'Create Lead')]`).click();

// 8. Enter company name 
await page.locator(`//input[@id='createLeadForm_companyName']`).fill(`Purple Inc`); // Fill the company name field with 'Purple Inc'

// 9. Enter first name 
await page.locator(`//input[@id='createLeadForm_firstName']`).fill(`Purple`); // Fill the first name field with 'Purple Inc'

// 10.Enter last name 
await page.locator(`//input[@id='createLeadForm_lastName']`).fill(`Happiness`); // Fill the last name field with 'Purple Inc'

// 11.Click on Create Lead button 
await page.locator(`//input[@class='smallSubmit']`).click(); // Click the submit button

// 12.Click Edit 
await page.getByRole('link', { name: 'Edit', exact: true }).click();

// 13.Change the company name 
await page.locator('#updateLeadForm_companyName').clear();
await page.locator('#updateLeadForm_companyName').fill(updatedCompanyName);

// 14.Click Update 
await page.getByRole('button', { name: 'Update'}).click();


})

test(`assignment3:create individual in salesforce`,  async( {page} ) => {

//     Assignment: 3 Create Individuals 

// Test Data: For logging in to salesforce
const loginURL = 'https://login.salesforce.com/'; // login URL
const username = 'haseenajubz@gmail.com'; // username
const password = 'SaleTest@2025'; // password

//Test Data: For Individual Creation
const lastName = 'Happiness Always'; // Last Name

// Assertion Teta Data
const individualCreation_toastMessage_expected = `Individual "${lastName}" was created.`; // expected toast message after lead creation
const titleAfterIndividualCreation_expected1 = `${lastName} | Salesforce`; // expected title pattern1 after individual creation
const titleAfterIndividualCreation_expected2 = `New Individual | Salesforce`; // expected title pattern2 after individual creation



// 1. Login to https://login.salesforce.com 
await page.goto(loginURL);
await page.getByRole('textbox', { name: 'Username'}).fill(username);
await page.getByLabel('Password').fill(password);
await page.getByRole('button', { name: 'Log In' }).click();

// 2. Click on the toggle menu button from the left corner
await page.getByTitle('App Launcher').click({delay: 1000});

// 3. Click View All and click Individuals from App Launcher 

await page.getByText('View All').waitFor({ state: 'visible'});
await page.getByText('View All').scrollIntoViewIfNeeded();
await page.getByText('View All').click();
await page.getByPlaceholder('Search apps or items..').fill('Individuals');
await page.getByPlaceholder('Search apps or items..').press('Enter');
await page.getByRole('link', {name: 'Individuals'} ).click({delay: 1000});

// 4. Click on the Dropdown icon in the Individuals tab 
const individualMenuBar = page.locator(`one-app-nav-bar-item-root`, {has: page.locator(`//a[@href='/lightning/o/Individual/home']`)}).locator('one-app-nav-bar-item-dropdown one-app-nav-bar-menu-button')
await individualMenuBar.waitFor({state: 'attached'});
await individualMenuBar.scrollIntoViewIfNeeded();
await individualMenuBar.hover();
await individualMenuBar.click({delay: 1000});


// 5. Click on New Individual
await page.getByText('New Individual').click();

// 6. Enter the Last Name
await page.getByRole('textbox', { name: 'Last Name *'} ).fill(lastName);

// 7. Click save and verify Individuals Name 
await page.getByRole('button', {name: 'Save', exact: true} ).click();

console.log(`Title after clicking save: ${await page.title()}`); //temp printing

// 8. Verify the Individuals created toast message
const individualCreation_toastMessage_locator = page.locator('.toastMessage');

//Grab the toast message and title after individual creation
const titleAfterIndividualCreation = await page.title(); // title after individual creation
const individualCreation_toastMessage_actual = await individualCreation_toastMessage_locator.textContent();     // toast message after individual creation
await expect(individualCreation_toastMessage_locator).toBeVisible();

console.log(`Title after toast message has appeared: ${await page.title()}`); //temp printing

//perform the assertions
expect(individualCreation_toastMessage_actual).toEqual(individualCreation_toastMessage_expected)
expect([titleAfterIndividualCreation_expected1, titleAfterIndividualCreation_expected2]).toContainEqual(titleAfterIndividualCreation);
console

console.log(`Toast message after individual creation: ${individualCreation_toastMessage_actual}`);

})

test(`assignment4:edit individual in salesforce`, async ( {page} ) => {
    // Assignment: 4 Edit Individuals 

    // Test Data: For logging in to salesforce
    const loginURL = 'https://login.salesforce.com/'; // login URL
    const username = 'haseenajubz@gmail.com'; // username
    const password = 'SaleTest@2025'; // password

    //Test Data: For Individual Creation
    const lastName = 'Happiness Always'; // Last Name
    const salutation = 'Mr.'; // Salutation
    const firstName = 'HMeet'; // First Name

    // Assertion Teta Data
    const individualCreation_toastMessage_expected1 = `Individual "${firstName} ${lastName}" was saved.`; // expected toast message pattern1 after individual update

    // Test Steps: 
    // 1. Login to await page.goto('https://login.salesforce.com/');
    await page.goto(loginURL);
    await page.getByRole('textbox', { name: 'Username'}).fill(username);
    await page.getByLabel('Password').fill(password);
    await page.getByRole('button', { name: 'Log In' }).click();
    await page.waitForLoadState('load'); // wait for the page to load

    // 2. Click on the toggle menu button from the left corner 
    await page.getByTitle('App Launcher').waitFor({state: 'attached'});
    await page.getByTitle('App Launcher').click();

    // 3. Click View All and click Individuals from App Launcher  
    await page.waitForSelector('//button[text()="View All"]');
    await page.getByText('View All').click();
    await page.getByPlaceholder('Search apps or items..').fill('Individuals');
    await page.getByPlaceholder('Search apps or items..').press('Enter');
    await page.getByRole('link', {name: 'Individuals'} ).click();

    // 4. Click on the Individuals tab 
    await page.getByRole('link', { name: '* Recently Viewed' }).first().click();

    // 5. Search the Individuals last name 
    await page.getByRole('searchbox', { name: 'Search this list...' }).click();
    await page.getByRole('searchbox', { name: 'Search this list...' }).fill(lastName);
    await page.getByRole('searchbox', { name: 'Search this list...' }).press('Enter');
  
    // 6. Click on the Dropdown icon and Select Edit 

    const moreActionsButtonLocator = `(//div[@class='forceVirtualActionMarker forceVirtualAction']/a)[1]`;
    await page.waitForSelector(moreActionsButtonLocator);
    // await page.locator(`(//div[@class='forceVirtualActionMarker forceVirtualAction']/a)[1]`).click();

    await page.locator(moreActionsButtonLocator).hover();
    await page.mouse.down();
    await page.waitForTimeout(1000);
    await page.mouse.up();

    await page.waitForSelector(`//div[@title='Edit']`);
    await page.locator(`//div[@title='Edit']`).click();
    
    // 7. Select Salutation as 'Mr' 
    await page.getByRole('group', { name: '* Name' }).getByRole('combobox').click();
    await page.getByRole('option', { name: `${salutation}` }).click();

    // 8. Now enter the first name
    await page.getByRole('textbox', { name: 'First Name' }).fill(firstName);

    // 9. Click on Save and Verify the first name
    await page.getByRole('button', { name: 'Save', exact: true }).click();
    const individualCreation_toastMessage_locator = page.locator('.toastMessage');
    await expect(individualCreation_toastMessage_locator).toBeVisible();
    console.log(`Title after toast message has appeared: ${await page.title()}`); //temp printing

    //Grab the toast message after individual creation
    const individualCreation_toastMessage_actual = await individualCreation_toastMessage_locator.textContent();     // toast message after individual creation

    //perform the assertions
    expect([individualCreation_toastMessage_expected1]).toContain(individualCreation_toastMessage_actual)
    console.log(`Toast message after individual creation: ${individualCreation_toastMessage_actual}`);
})