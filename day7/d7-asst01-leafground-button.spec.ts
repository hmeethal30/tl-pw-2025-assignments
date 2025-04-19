/* 

Assignment Details: 
Create a script using Playwright to interact with buttons on the LeafGround "Button" page, 
asserting their properties and behaviors like visibility, disablement status, position, and color 
change on actions.

Assignment Requirements: 
1. Navigate to https://leafground.com/button.xhtml 
2. Write a script to click the button and confirm a title change or any visible response. 
3. Assert the disabled state of a button. 
4. Click the Image button and click on any hidden button 
5. Check how many rounded buttons are present 
*/

import { expect, test } from '@playwright/test'

test('test to interact and assert leafground button page', async ( {page} ) => {
//  1. Navigate to https://leafground.com/button.xhtml 
    await page.goto('https://leafground.com/button.xhtml')
    const buttonPageTitleBefore = await page.title();
    console.log(`The page title before is: ${buttonPageTitleBefore}`)

// 2. Write a script to click the button and confirm a title change or any visible response. 
    //Click the 'Click' button
    await page.locator('div .card').filter({ has: page.getByRole('heading', {name:'Click and Confirm title.'})}).getByRole('button').click();
   
    //Assert that dashboard object is visbile
    await expect(page.locator('div .dashboard')).toBeVisible();
    await expect(page.locator('div .route-bar-breadcrumb', {hasText: 'Dashboard'})).toBeVisible();
    
    //Capture the new page title
    const buttonPageTitleAfter = await page.title();
    console.log(`The page title after clicking button is: ${buttonPageTitleAfter}`)

    //Assert that title after is different from before and has keyword 'Dashboard'
    expect(buttonPageTitleAfter != buttonPageTitleBefore);
    expect(buttonPageTitleAfter).toContain('Dashboard');

// 3. Assert the disabled state of a button. 
    //navigate back to the button screen
    await page.locator(`//form[@id='menuform']/ul/li[3]`).hover();
    await page.locator(`//form[@id='menuform']/ul/li[3]`).click();

    await page.locator('a:has-text("Button")').first().hover();
    await page.locator('a:has-text("Button")').first().click();

    // Click on the 'Disabled' button
    const disabledButton = page.getByRole('button').filter({hasText:'Disabled'});
    // await disabledButton.click();
    await expect(disabledButton).toBeDisabled();
    // xpath=>  //button/following::span[text()='Disabled']

// 4. Click the Image button and click on any hidden button 
    const imageButton = page.getByRole('button').filter({ hasText: 'Image'} );
    await imageButton.click()
    const ariaExpanded = await imageButton.getAttribute('aria-expanded')
    expect(ariaExpanded).toBeTruthy
    await imageButton.click()

// 5. Check how many rounded buttons are present 

    const roundedButtonsExpected = [
        'Primary',
        'Secondary',
        'Success',
        'Info'
    ]

    const roundedButtonsCard = page.locator('div.card').filter( {has:page.getByRole('heading', {name: `How many rounded buttons are there?`})})
    const roundedButtons = roundedButtonsCard.getByRole('button');
    const countOfRoundedButtons = await roundedButtons.count();

    // Method 1 to assert the lable names.
    const  roundedButtonsActual1 = await roundedButtons.allInnerTexts();
    const  roundedButtonsActual2 = await roundedButtons.allTextContents();

    expect.soft(roundedButtonsActual1).toEqual(roundedButtonsExpected)
    // expect.soft(await roundedButtons.allTextContents()).toEqual(roundedButtonsExpected)

    console.log(`There are ${countOfRoundedButtons} rounded buttons and they are : ${roundedButtonsActual1}`)
    // console.log(`All text content is : ${roundedButtonsActual2}`)

    //Method two to assert the label names, by looping
    for (const [index, buttonExpected] of roundedButtonsExpected.entries()){
        const buttonActual = await roundedButtons.nth(index).textContent();
        expect(buttonExpected).toEqual(buttonActual);
        console.log(`This is button ${index+1} and the name displayed '${buttonActual}' is same as aexpected '${buttonExpected}' `)
    }
})