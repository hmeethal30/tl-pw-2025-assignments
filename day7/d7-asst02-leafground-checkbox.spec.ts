/* 
Assignment Details: 
Develop a Playwright script to test interactions with checkboxes on the LeafGround "Checkbox" 
page, covering scenarios like multiple selections, checking default states, and handling disabled 
checkboxes. 
*/

import { expect, Page, test } from '@playwright/test'
test('Interact and assert Leafground Checkbox page', async ( {page} ) => {

    // 1. Navigate to https://leafground.com/checkbox.xhtml 
    await page.goto('https://leafground.com/checkbox.xhtml')

    // 2. Click on the "Basic Checkbox.”    
    await testBasicCheckbox(page)

    // 3. Click on the "Notification Checkbox." 
    await testNotificationCheckbox(page)

    // 5. Click on your favorite language (assuming it's related to checkboxes).
    await testFavLangCheckboxes(page)
  
    // 6. Click on the "Tri-State Checkbox." 
    await testTristateCheckbox(page)
    
    // 8. Click on the "Toggle Switch." 
    // 9. Verify that the expected message is displayed.
    await testToggleSwitch(page)

    // 10. Verify if the Checkbox is disabled. 
    await testDisabledCheckbox(page)

    // 11. Select multiple options on the page (details may be needed). 
    // 12. Perform any additional actions or verifications required. 
    await testMultipleOptionsCheckbox(page)

    // 13. Close the web browser when done.
    await page.close()
})

//=====Helper functions=====

async function testBasicCheckbox(page: Page) {
    // await page.locator('div').filter({ hasText: /^Basic$/ }).locator('div').nth(1).click();

    const basicCheckbox = page.locator('div.card', {has: page.getByRole('heading',{ name: 'Basic Checkbox'})}).locator('div', { hasText: /^Basic$/});
    await basicCheckbox.waitFor();
    await basicCheckbox.click();
}

async function testNotificationCheckbox( page: Page ){
    const notificationCheckbox = page.locator('div.card', {has: page.getByRole('heading',{ name: 'Notification'})}).locator('div', { hasText: /^Ajax$/});
    await notificationCheckbox.click();

    // 4. Verify that the expected message is displayed. 
    const notificationCheckedAlert = page.getByRole('alert').filter({ has: page.locator('.ui-growl-title')})
    await expect(notificationCheckedAlert).toBeVisible();

    const notificationCheckedAlertMsg = await notificationCheckedAlert.locator('.ui-growl-title').textContent();
    expect(notificationCheckedAlertMsg).toEqual('Checked');
}

async function testFavLangCheckboxes( page: Page ){
    const languageCard = page.locator('div.card', { has: page.getByRole('heading', { name: 'Choose your favorite language(s)' })});
    const languageLabels = languageCard.locator('label');   // Get all language checkbox labels
    const languageCount = await languageLabels.count();

    const languagesToSelect = ["Python", "Javascript", "Others"];   // define the checkboxes to be selected

    for( let i=0; i < languageCount; i++){
        const languageLabel = languageLabels.nth(i);
        const labelText = (await languageLabel.textContent())?.trim();

        if(labelText && languagesToSelect.includes(labelText)){
            //Locate the checkbox which is the preceding sibling of the language label
            const lngCheckbox = languageLabel.locator('..').locator('div.ui-chkbox-box');   // method1
            // const lngCheckbox = page.locator('td').filter({ hasText:labelText}).locator('div').nth(2);   //method 2
            await lngCheckbox.click();
        }
    }
}

async function testTristateCheckbox( page: Page ){
    const triStateCard = page.locator('h5', { hasText: 'Tri State Checkbox'}).locator('..');
    const triStateCheckbox = triStateCard.locator('div.ui-chkbox-box');
    await triStateCheckbox.click() // to select the checked state
    await triStateCheckbox.click()  // click again to select the crossed state
    await triStateCheckbox.click()    // click for the 3rd time to select the crossed state

    // 7. Verify which tri-state option has been chosen. 
    // Define the possible states
    enum checkboxStates { 
        CROSSED = 'ui-icon-closethick',
        CHECKED = 'ui-icon ui-icon-check',
        UNCHECKED = ''
    }

    // Grab the checkbox class and compare against the possible state values
    const triStateCheckboxSelected = await triStateCheckbox.locator('span').getAttribute('class');
    let checkboxurrentState = '';
    for (const state of Object.values(checkboxStates)) {
        if (triStateCheckboxSelected && state && triStateCheckboxSelected.includes(state)){
            checkboxurrentState = state;
            break;
        }  
    }

    await page.screenshot({path:'screenshot.png'})
    //Print the selected state
    switch (checkboxurrentState){
        case checkboxStates.CHECKED:
            console.log(`The option chosen on tri-state checkbox is: CHECKED`);
            break;
        case checkboxStates.CROSSED:
            console.log(`The option chosen on tri-state checkbox is: CROSSED`);
            break;
        default:
            console.log(`The option chosen on tri-state checkbox is: UNCHECKED`)

    }
}

async function testToggleSwitch( page: Page){
    // 8. Click on the "Toggle Switch." 
    await page.locator('.ui-toggleswitch-slider').click();

    // 9. Verify that the expected message is displayed.
    const toggleAlert = page.getByRole('alert').filter({ has: page.locator('.ui-growl-title')}).first()
    await expect(toggleAlert).toBeVisible();

    const toggleAlertMessge = await toggleAlert.locator('.ui-growl-title').textContent();
    expect(toggleAlertMessge).toEqual('Checked');
    console.log(`Alert message displayed after clicking toggle switch is: ${toggleAlertMessge}`)
}

async function testDisabledCheckbox(page: Page){
    const disabledCheckboxCard = page.locator('div.card').filter({
        has: page.getByRole('heading', { name: 'Verify if check box is disabled' }),
      });
    const disabledCheckbox = disabledCheckboxCard.locator('div.ui-chkbox-box').first();
    const classAttribute = await disabledCheckbox.getAttribute('class');

    expect(classAttribute).toContain('ui-state-disabled')

    const attributes = await disabledCheckbox.evaluate((el) => {
        const attrs: { [key: string]: string } = {};
        for (const attr of el.attributes) {
          attrs[attr.name] = attr.value;
        }
        return attrs;
      });
      
      console.log(`The attributes of the disabled checkbox are:`);
      console.log(attributes);

    try {
        // await expect.soft(disabledCheckbox).toBeDisabled({timeout: 1000});
        await expect.soft(disabledCheckbox).toBeVisible();
        await disabledCheckbox.click({ timeout: 2000});
        console.log(`The checkbox is clickable and so is not technically disabled!`)
    } catch (error){
        console.log(`The checkbox is not clickable and so is disabled. Error is: `, error.message)
    }

}

async function testMultipleOptionsCheckbox(page: Page){
    const citiesCombobox =  page.locator(`//ul[@data-label="Cities"]`);
    await citiesCombobox.click()

    const citiesToSelect = ["Berlin", "London", "Rome"]

    for(const city of citiesToSelect){
        await page.locator('li', { hasText: city}).locator('div.ui-chkbox-box').click()
        // await page.locator(cityXpath).locator('div.ui-chkbox-box').click();
    }
    await page.screenshot({ path: 'city-screenshot.png'})

    const citiesSelected = await citiesCombobox.locator('li').allTextContents();
    expect.soft(citiesSelected).toEqual(citiesToSelect);
    console.log(`Cities selected are:`)
    console.log(citiesSelected)

}
