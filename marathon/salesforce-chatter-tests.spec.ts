import { expect, Page, Locator, test } from '@playwright/test'
// import dotenv from 'dotenv' 

// dotenv.config({ path: 'env/qa.env'}) 

const inputTestData = {
    login: {
        URL : 'https://login.salesforce.com/',
        USERNAME : 'haseenajubz@gmail.com',
        PASSWORD : 'SaleTest@2025'
    },
    services: {
        newCase: {
            subject : 'Product Return Request',
            description : 'Requesting a return for a defective product',
            feedUpdate : 'This is a feed update added from playwright'
        },
        newContact :{
            salutation : 'Mrs.',
            firstName : 'Purple',
            lastName : 'Happy'
        },
        newAccount : {
            accountName : 'Purple Inc',
            accountNumber : '1235'
        }
    }

}

const expectedValues = {
    login: {
        titleBeforeLogin: "Login | Salesforce",
        titleAfterLogin: ['Home | Salesforce', 'Lightning Experience' ], // expected title after login',
        urlAfterLogin: 'https://testleaf82-dev-ed.develop.lightning.force.com/lightning/setup/SetupOneHome/home' // expected url after login
    },
    home: {
        allAppsHeader : 'All Apps',
    },
    servicesDashboard: {
        newContactCreationNotification : `Contact "${inputTestData.services.newContact.salutation} ${inputTestData.services.newContact.firstName} ${inputTestData.services.newContact.lastName}" was created`,
        newAccountCreationNotification : `Account "${inputTestData.services.newAccount.accountName}" was created.`,
        shareUpdateNotification : `Your update was shared.`,
        chatterLikeNotification : `Post was liked.`
    }
//Account "TEst" was created. Press Control + F6 to navigate to the next toast notification or focusable region.
}

test('marathon: salesforce tests', async ( { page } ) => {
    await launchBrowser(page);
    await loadURL(page);
    await loginToSalesforce(page);
    await clickAppLauncher(page);
    await clickViewAllLink(page);
    await navigateToServiceDashboard(page);
    await navigateToCasesTab(page);
    await navigateToNewCaseForm(page);
    await clickSearchContactsInput(page);
    await clickNewContactLink(page);
    await fillNewContactInfo(page);
    await saveNewContact(page);
    await navigateToNewAccountForm(page);
    await fillNewAccountInfo(page);
    await selectRating(page);
    await saveNewAccount(page);
    await selectStatus(page);
    await selectPriority(page);
    await selectCaseOrigin(page);
    await fillSubjectAndDescription(page);
    await saveNewCase(page)
    await editAndSaveDetails(page)
    await shareUpdate(page)
    await likeChatter(page)
    await navigateToChatterTab(page)

})


// --------------STEP FUNCTIONS ---------

async function launchBrowser(page:Page) {    
    /* 
    1. Step: Launch the browser (Chrome / Edge / Firefox / Safari). 
    Expected Result: User should see the respective browser getting launched. 
    */

    if (page) {
        await logStep('01) Launch the browser', 'Verify if page is loaded', 'Passed' )
    } else {
        await logStep('01) Launch the browser', 'Verify if page is loaded', 'Failed' )
    }
}

async function loadURL(page:Page) {  
    /* 
    2. Step: Load the specified URL (https://login.salesforce.com/). 
    Expected Result: The Salesforce application’s login window should appear.   
    */

    await page.goto(inputTestData.login.URL)
    // const actualTitle = await page.title();
    await assertWithLog (
        '02) Load the specified URL',
        `Verify if the title is '${expectedValues.login.titleBeforeLogin}' `,
         async () => {
            await expect(page).toHaveTitle(expectedValues.login.titleBeforeLogin);
         }   
    )
}


async function loginToSalesforce(page: Page) {
    /* 
    3. Step: Enter the Username, Password and click on the Login button. 
    Expected Result: The user should be logged into Salesforce CRM 
    */

    await page.locator('#username').fill('haseenajubz@gmail.com'); // enter username
    await page.locator('#password').fill('SaleTest@2025'); // enter password  
    await page.locator('#Login').click(); // click login button
    await page.waitForLoadState('load') ;
    await page.getByRole( 'heading', { name: 'Home'}).waitFor({state: 'visible'}) ;          
    // await page.waitForLoadState('networkidle');
    const actualTitle = await page.title();

    await assertWithLog(
        '03: Login to Salesforce' ,
        `Verify if the title after login is one of '${expectedValues.login.titleAfterLogin}' `,
        // actualTitle,
        async () => {
            expect(expectedValues.login.titleAfterLogin).toContain(actualTitle);
        }
    )

}


async function clickAppLauncher( page: Page) {
    /* 
    4. Step: Click on the App Launcher toggle button. 
    Expected Result: A list of apps should appear. 
    */
    await page.getByTitle('App Launcher').click();

    const appLauncherHeader = page.getByRole('heading', { name: 'App Launcher'});
    await isElementVisible(
        appLauncherHeader,
        '04) Click on the App Launcher',
        'Verify if header App Launcher is displayed '
    )
}

async function clickViewAllLink( page: Page) {
    /* 
    5. Step: Click on the View All link.  
    Expected Result: The link should direct the user to the App Launcher pop up window. 
    */
    await page.getByRole('button', { name: 'View All'} ).click();
    const ALL_APPS_HEADER = page.getByTitle('All Apps');
    await assertTextContent(ALL_APPS_HEADER, expectedValues.home.allAppsHeader, '05) Click on the View All link' , 'Verify if ALL APPS title is displayed')
}

async function navigateToServiceDashboard( page: Page ) {
    /* 
    6. Step: Type ‘Service’ in the search box and click on the Service link. 
    Expected Result: The link should direct the user to Service dashboard page.  
    */
     await page.getByPlaceholder('Search apps or items...').fill('Service');
     await page.getByPlaceholder('Search apps or items...').press('Enter'); // press Enter key to search for Service
 
     await page.locator(`(//mark[contains(text(), "Service")])[1]`).click(); // click Service using index based XPath

     //Assert if Service Page is loaded by looking for the header Service
     const SERVICE_DBOARD_HEADER = page.locator('h1').getByTitle('Service');
     await isElementVisible(SERVICE_DBOARD_HEADER, '6) Type ‘Service’ in the search box and click on the Service link', 'Verify if title Service is visbile on the page after clicking the link');
}

async function navigateToCasesTab(page: Page) {
    /* 
    7. Step: Navigate to the Cases tab from the Service dashboard. 
    Expected Result: User should see a list of existing leads (if any) and options to create a new case. 
    */
    await page.getByRole('link', { name: 'Cases'}).click();
    const CASES_TAB_HEADER = page.getByRole('heading', {name: 'Cases'})
    await isElementVisible(
        CASES_TAB_HEADER, 
        '7) Navigate to the Cases tab from the Service dashboard.',
        'Verify if the tab header Cases is visible'
    )
}

async function navigateToNewCaseForm(page:Page) {
    /* 
    8. Step: Click on the New button to create a new case. 
    Expected Result: A form to input details for the new case should appear. 
    */
    await page.getByRole('button', { name: 'New'}).click();
    const NEW_CASE_FORM_HEADER = page.getByRole('heading', {name: 'New Case'})
    await isElementVisible(NEW_CASE_FORM_HEADER, '8) Click on the New button to create a new case.', `Verify if form has title "New Case"`)
}

async function clickSearchContactsInput(page:Page) {
    /* 
    9. Step: Click on the Search Contacts input field in Contact Name 
    Expected Result: A list menu with New Contact link should be displayed. 
    */
   //Click on the 'Contact Name' comboxox
   await page.getByPlaceholder('Search Contacts...').click();

   //Verify if 'New Contact' option is displayed
   const contactNameListbox = page.getByRole('listbox').filter({hasText: 'New Contact'})
   isElementVisible(contactNameListbox, '9) Click on the Search Contacts input field in Contact Name ', `Verify if listbox with "New Contact" is displayed`)
}

async function clickNewContactLink(page:Page) {
    /* 
    10. Step: Click on the New Contact link 
    Expected Result: A form to input details for the new contact should appear. 
    */
   const stepName = '10)S ervics | New Contact | Click on the New Contact link';

    //Click on the 'New Contact' list item
   await page.getByRole('option', { name: 'New Contact'}).click();

   //Verify the header of the new form opened
   const newContactHeader = page.getByRole('heading', {name: 'New Contact'})
   await isElementVisible(newContactHeader, stepName, `Verify if form with header 'New Contact' is displayed`)
}

async function fillNewContactInfo(page:Page) {
    /* 
        11. Step: Fill in all the mandatory fields (Salutation, First Name, Last Name) with a valid data. 
        Expected Result: All details should be filled in without any errors. 
    */
   const stepName = '11) Servics | New Contact | Fill in all the mandatory fields (Salutation, First Name, Last Name) with a valid data.'
   const salutation = inputTestData.services.newContact.salutation;
   const firstname = inputTestData.services.newContact.firstName;
   const lastname = inputTestData.services.newContact.lastName;

   //Select salutation
   const salutationInput = page.getByLabel('Salutation').locator('..')
   await salutationInput.getByRole('combobox').click();
   await salutationInput.getByRole('option', { name: salutation}).click();

   //Fill firstname
   const firstnameInput = page.getByPlaceholder('First Name');
   await firstnameInput.fill(firstname)
   await assertValue(firstnameInput, firstname, stepName, `Verify if the the first name input value is displayed correctly`)

   //fill lastname
   const lastnameInput = page.getByPlaceholder('Last Name');
   await lastnameInput.fill(lastname);
   await assertValue(lastnameInput, lastname, stepName, `Verify if the the last name input value is displayed correctly`)

}

async function saveNewContact(page: Page) {
    /* 
    12. Step: Click on the Save button. 
    Expected Result: A new contact should be created and a confirmation message ‘Contact was created’ 
    should also be displayed and verified. 
    */
    const stepName = '12) Services>NewCase>New Contact | Click on the Save button.';
    await page.getByRole('button', { name: 'Save', exact: true}).click();   //Click on the save button

    //Assert for toastmessage
    const expectedNotification = expectedValues.servicesDashboard.newContactCreationNotification;
    const successToast = page.locator('div .toastMessage');
    if (await isElementVisible(successToast,stepName , `Verify if the contact creation confirmation message was displayed`, false)){
        // TODO- verify if customer name is visible in the toast message
        await assertTextContent(successToast, expectedNotification, stepName, `Verify if confirmation message contains 'Account was created' and the username` )

        await page.locator('.slds-notify__close').getByRole('button', {name: 'Close'}).click()
    } 
}

async function navigateToNewAccountForm(page: Page){
    /* 
    13. Step: Click Search Accounts input field in Account Name and click on the New Account link 
    Expected Result: A list menu with New Account link should appear and a form to input details for the new 
    account should display. 
    */
   const stepName = `13) Services > New Case > New Account | Click Search Accounts input field in Account Name and click on the New Account link.`

   const accountNameComboGroup = page.getByLabel('Account Name').locator('..');
   const accountNameInput = accountNameComboGroup.getByPlaceholder('Search Accounts...')
   await accountNameInput.click();

   const newAccountOption = page.getByRole('option', { name: 'New Account'})
   await newAccountOption.scrollIntoViewIfNeeded();
   await newAccountOption.click();

   //Verify if form with title 'New Account' is displayed
   const newAccountFormTitle = page.getByRole('heading', {name: 'New Account'})
   await isElementVisible(newAccountFormTitle, stepName, `Verify if form with title 'New Account' is displayed`, true )
}

async function fillNewAccountInfo(page:Page) {
    /* 
    Step: Fill in all the mandatory fields (Account Name, Account Number) with a valid data. 
    Expected Result: All details should be filled in without any errors. 
    */
    const stepName = `14) Services > New Case > New Account | Fill in all the mandatory fields with a valid data.`

    const accountName = inputTestData.services.newAccount.accountName;
    const accountNumber = inputTestData.services.newAccount.accountNumber

    const accountNameInput = page.getByLabel('Account Name').locator('..').getByRole('textbox', { name: 'Name'})
    const accountNumberInput = page.getByLabel('Account Number').locator('..').getByRole('textbox', { name: 'Account Number'}) //Name: "Account Number"


    await accountNameInput.fill(accountName)
    await accountNumberInput.fill(accountNumber)

    await assertValue(accountNameInput, accountName, stepName, 'Verify if Account name is filled with the provided value')
    await assertValue(accountNumberInput, accountNumber, stepName, 'Verify if Account number is filled with the provided value')
}

 async function selectRating(page:Page) {
    /* 
    15. Step: Select the Rating dropdown and choose the option ‘Hot’ 
    Expected Result: A list of different options to choose should be displayed. 
    */
    const stepName = `15) Services>New Case>New Account| Select Rating value 'Hot' `;
    const ratingOption = 'Hot'

    const ratingComboGroup = page.getByLabel('Rating').locator('..');
    const ratingCombo = ratingComboGroup.getByRole('combobox');
    const ratingOptionHot = ratingComboGroup.getByRole('option', { name: ratingOption});

    await ratingCombo.click();      //Click on the ratings combobox
    await ratingOptionHot.click();      // Select option Hot
    await assertAttributeValue(ratingCombo, 'data-value', ratingOption, stepName, 'Verify if the selected rating option is displayed')
    //data-value="Hot"
}

async function saveNewAccount(page:Page) {
    /* 
    16. Step: Click on the Save button. 
    Expected Result: A new account should be created and a confirmation message should also be displayed 
    and verified. 
    */
    const stepName = ` 16. Services > New Case > New Account | Click on the Save button.`
    await page.getByRole('button', {name : 'Save', exact: true}).click();

    const successToast = page.locator('div .toastMessage');
    const  expectedNotification  = expectedValues.servicesDashboard.newAccountCreationNotification;

    if (await isElementVisible(successToast,stepName , `Verify if the notification element appears`, false)){
        await assertTextContent(successToast, expectedNotification, stepName, `Verify if confirmation message 'Account was created' with user name was displayed` )
        await page.locator('.slds-notify__close').getByRole('button', {name: 'Close'}).click()
    } 
}

async function selectStatus(page:Page) {
    /* 
    17. Step: Select the Status dropdown icon and choose the value as New. 
    Expected Result: A list of values with New option should appear. 
    */
   const stepName = `17) Services>New Case| Select the Status 'New'`;   
   const statusToSelect = 'New';                                        // Define the option to select
   const statusComboGroup = page.getByLabel('Status').locator('..');    //Locator for status combobox parent
   const statusCombobox = statusComboGroup.getByRole('combobox');    //Locator for status combobox
   const statusListbox = statusComboGroup.getByRole('listbox')
   const statusOption = page.getByRole('option', { name: statusToSelect})
   
    await statusCombobox.click();
    //Verify if list of status is displayed. Select an option, if yes
    if (await isElementVisible(statusListbox, stepName, `Verify if a list of status is displayed`, true)) {
        await statusOption.click();

        //assert if selected option is displayed
        await assertAttributeValue(statusCombobox, 'data-value', statusToSelect, stepName, 'Verify if displayed value is the selected option')
    }    

}

async function selectPriority(page:Page) {
    /* 
    18. Step: Select the Priority dropdown icon and choose the value as ‘High’. 
    Expected Result: A list of values with ‘High’ option should appear. 
    */
   const stepName = `18) Services>New Case| Select the Priority 'High'`;   
   const priorityToSelect = 'High';                                        // Define the option to select
   const priorityComboGroup = page.getByLabel('Priority').locator('..')
   const priorityCombobox = priorityComboGroup.getByRole('combobox');    //Locator for combobox
   const priorityListbox = priorityComboGroup.getByRole('listbox')      // Locator for list of options, to be used later for assertions

   const priorityOption = page.getByRole('option', { name: priorityToSelect })
   
    await priorityCombobox.click();
    //Verify if list of status is displayed. Select an option, if yes
    if (await isElementVisible(priorityListbox, stepName, `Verify if a list of status is displayed`, true)) {
        await priorityOption.click(); 
          
        //assert if selected option is displayed
        await assertAttributeValue(priorityCombobox, 'data-value', priorityToSelect, stepName, 'Verify if displayed value is the selected option')
    }    
}

async function selectCaseOrigin(page:Page) {
    /* 
    19. Step: Select the Case Origin dropdown icon and choose the value as ‘Email’. 
    Expected Result: A list of values with ‘Email’ option should appear.  
    */
   const stepName = `19) Services>New Case| Select the 'Case Origin' as 'Email'`;   
   const caseOriginToSelect = 'Email';                                        // Define the option to select
   const caseOriginComboGroup = page.getByLabel('Case Origin').locator('..');
   const caseOriginCombobox = caseOriginComboGroup.getByRole('combobox');    //Locator for combobox
   const caseOriginListbox = caseOriginComboGroup.getByRole('listbox');
   const caseOriginOption = page.getByRole('option', { name: caseOriginToSelect}); 
   
    await caseOriginCombobox.click();
    //Verify if list of values are displayed. Select given option
    if (await isElementVisible(caseOriginListbox, stepName, `Verify if a list of status is displayed`, true)) {
        await caseOriginOption.click();

        //assert if selected option is displayed
        await assertAttributeValue(caseOriginCombobox, 'data-value', caseOriginToSelect, stepName, 'Verify if displayed value is the selected option')
    }    
}

async function fillSubjectAndDescription(page:Page) {
    /* 
    20. Step: Fill in the Subject input field as ‘Product Return Request’ and Description input field as ‘Requesting a 
    return for a defective product’  
    Expected Result: The input fields should be filled with valid data. 
    */
   const stepName = '20) Services>New Case| Fill subject and description'

   const subject = inputTestData.services.newCase.subject;
   const description = inputTestData.services.newCase.description;

   const subjectInputGroup = page.getByLabel('Subject').locator('..');
   const subjectTextbox = subjectInputGroup.getByRole('textbox', {name: 'Subject'});

   const descriptionInputGroup = page.getByLabel('Description').locator('..');
   const descriptionTextarea = descriptionInputGroup.getByRole('textbox', { name: 'Description'});

   //Fill subject as ‘Product Return Request’ and assert
   await subjectTextbox.scrollIntoViewIfNeeded()
   await subjectTextbox.fill(subject);
   await assertValue(subjectTextbox, subject, stepName, `Verify if the value displaed in field 'Subject' is same as the filled value` )

    //Fill Description as ‘Requesting a return for a defective product’  and assert
    await descriptionTextarea.scrollIntoViewIfNeeded();
    await descriptionTextarea.fill(description);
    await assertValue(descriptionTextarea, description, stepName, `Verify if the value displaed in field 'Description' is same as the filled value` )

}

async function saveNewCase(page:Page) {
    /* 
    21. Step: Click on the Save button.  
    Expected Result: A new case should be created and user should be redirected to the detailed view of the 
    newly created case. A confirmation message should also be displayed and verified. 
    */
    const stepName = ` 21. Services> New Case>| Click on the Save button.`
    await page.getByRole('button', {name : 'Save', exact: true}).click();

    const successToast = page.locator('div .toastMessage');
    const  expectedNotification  = `/^Case "\d+" was created\.$/`;
    const caseDashboardHeading = page.getByRole('heading', { name: 'Case'})
    const caseNumberTitle = page.getByTitle('Case Number');

    if (await isElementVisible(successToast,stepName , `Verify if the notification element appears`, false)){
        // const actualNotification = await successToast.textContent();
        await assertTextContent(successToast, expectedNotification, stepName, `Verify if confirmation message 'Case was created' with case Id was displayed` )
        await page.locator('.slds-notify__close').getByRole('button', {name: 'Close'}).click()
    } 

    //Assert if user is navigated to Case dashboard
    await isElementVisible(caseDashboardHeading, stepName, `Verify if 'Case' heading is present to confirm user is navigated to Case Dashbaord`, false)

    //Assert if title 'Case Number' is displayed on the dashboard
    await isElementVisible(caseNumberTitle, stepName, `Verify if 'Case Number' heading is present`, false)

}

async function editAndSaveDetails(page:Page) {
    /* 
    22. Step: Edit the Status under Details category and choose the ‘Escalated’ option from the dropdown. 
    Expected Result: A list of Status options to choose ‘Escalated’ should appear. 
 
    23. Step: Click on the Save button.  
    Expected Result: The Status should be updated under Details category. 
    */

    const stepName1 = `22) Service> New Case | Edit case status`;
    const stepName2 = ` 23() Services> New Case>| Save edited status`
    const newStatus = 'Escalated';                                        // Define the option to select

    //Locators
    const detailsTabPanel = page.getByRole('tabpanel', { name: 'Details'})
    const editStatusButton = detailsTabPanel.getByRole('button', { name: 'Edit Status', exact: true});
    const statusCombobox = detailsTabPanel.getByRole('combobox', { name: 'Status'})
    const statusListbox = detailsTabPanel.getByRole('listbox', { name: 'Status'})
    const statusOption = detailsTabPanel.getByRole('option', { name: newStatus})
    const savedStatusOptionText = detailsTabPanel.locator('records-record-layout-item[field-label="Status"]').locator('lightning-formatted-text')

    // click on edit status button
    await editStatusButton.click();
    
    //Click on the status combobox  
     await statusCombobox.click();

     //Verify if list of status is displayed. Select an option, if yes
     if (await isElementVisible(statusListbox, stepName1, `Verify if a list containing status options is displayed`, true)) {
           
        await statusOption.click();

         //assert if selected option is displayed
         await assertTextContent(statusCombobox, newStatus, stepName1, 'Verify if status combo box displays the new selected status by looking at the text content')
         await assertAttributeValue(statusCombobox, 'data-value', newStatus, stepName1, 'Verify if status combo box displays the new selected status by checking attribute value')
     } 

     // 23) save and assert
     await page.getByRole('button', {name : 'Save', exact: true}).click();
     await assertTextContent(savedStatusOptionText, newStatus, stepName2, 'Verify if the status displayed in the details tab panel after saving is same as the selected value',);
}


async function shareUpdate(page:Page) {
    /* 
    24. Step: Enter a valid data in the Share an Update input field and click on the Share button.  
    Expected Result: The update should appear under All Updates category. 
    */
   //Data declarations
    const stepName: string = `24) Service > New Case | Share an update`;
    const feedUpdate : string = inputTestData.services.newCase.feedUpdate;
    const expectedUpdateShareNotification = expectedValues.servicesDashboard.shareUpdateNotification;

    //Locator declarations
    // const shareUpdateButton = page.getByRole('button', { name: 'Share an update...'});
    const shareUpdateButton = page.getByRole('button', { name: 'Share', exact: true});
    const shareUpdateTextbox  = page.getByRole('textbox', {name: 'Share an update...'});
    const shareButton =  page.getByTitle('Click, or press Ctrl+Enter');

    const updateShareNotification = page.locator('span.toastMessage')
    const notificationCloseButton = page.getByRole('button', {name: 'Close'});
    const latestUpdateTextPosts = page.locator(`div[data-feed-type="Record"] article[data-type="TextPost"]`).first();

    await page.waitForLoadState('load');
    // await shareUpdateButton.scrollIntoViewIfNeeded();
    await shareUpdateButton.waitFor( {state: 'attached'});
    await shareUpdateButton.highlight();
    await shareUpdateButton.click()
    // await page.waitForTimeout(5000)
    await shareUpdateTextbox.waitFor({ state: 'attached'});
    await shareUpdateTextbox.highlight();
    await shareUpdateTextbox.click()
    await shareUpdateTextbox.fill(feedUpdate)
    await page.waitForTimeout(2000)
    await shareButton.waitFor({state: 'attached'})
    await shareButton.click();

    //Verify is success toast is displayed
   if (await isElementVisible(updateShareNotification, stepName, 'Verify if update share notitification pops up', false)) {
        // assert the text in the toast message
        await assertTextContent(updateShareNotification, expectedUpdateShareNotification, stepName, 'Verify if toast message is as expected');

        // close the notification
        await notificationCloseButton.click();
   }

   if ( await isElementVisible(latestUpdateTextPosts, stepName, 'Assert if there is at least one text update feed', true)) {
     assertTextContent(latestUpdateTextPosts, feedUpdate, stepName, ' Verify if the update text is what was typed earlier')
   }
}

  async function likeChatter(page:Page) {
     /* 
     25. Step: Click on the dropdown icon and choose the Like on Chatter option.  
     Expected Result: A confirmation message ‘Post was liked’ should appear and verify the same. 
     */
 
    //Data declarations
    const stepName: string = `25) Service > New Case | Like on Chatter option`;
    const expectedChatterLikeNotification = expectedValues.servicesDashboard.chatterLikeNotification
 
    //Locators
    const latestUpdateTextPosts = page.locator(`div[data-feed-type="Record"] article[data-type="TextPost"]`).first();
 
    const actionsDropdown = page.locator('a').filter({ hasText: 'Actions for this Feed Item' }).first();
    const likeOnChatterButton  = page.getByTitle('Like on Chatter').locator('a')
    const chatterLikeToast = page.locator('span.toastMessage')
    const notificationCloseButton = page.getByRole('button', {name: 'Close'});
 
    await latestUpdateTextPosts.scrollIntoViewIfNeeded();
    await actionsDropdown.click()
    await likeOnChatterButton.click()
 
     //Verify is liker toast is displayed
     if (await isElementVisible(chatterLikeToast, stepName, 'Verify if post was liked notitification pops up', false)) {
     // assert the text in the toast message
     await assertTextContent(chatterLikeToast, expectedChatterLikeNotification, stepName, 'Verify if toast message is as expected');
 
     // close the notification
     await notificationCloseButton.click();
     }
 }


 async function navigateToChatterTab(page:Page) {
    /* 
    26. Step: Navigate to the Chatter tab and verify the post liked by the user. 
    Expected Result: The liked post should appear under the Post category. 
    */
    const stepName: string = `26) Service > Chatter | Navigate to the Chatter tab and verify the post liked by the user.`;

    const likeIcon = page.locator('div[data-feed-type="Company"] article[data-type="TextPost"] footer span[title="Unlike"]').first();
    await page.getByRole('link', { name: 'Chatter' }).click();
    await likeIcon.scrollIntoViewIfNeeded();
    const likeStatus = await likeIcon.getAttribute('style')
    if ( likeStatus === 'display:inline-flex') {
        logStep(stepName, 'Verify if the status is Liked', 'The status is Liked as expected', 'Passed')
    } else {
        logStep(stepName, 'Verify if the status is Liked', 'The status is Liked as expected', 'Failed')
    }


}





// ----------- Assertion Helpers---

async function assertWithLog(
    stepName: string,
    description: string,
    // actual : string,
    assertionCallback: () => Promise<void>

) {
    try {
        await assertionCallback () ; 
        await logStep( stepName, description, 'Passed');
    } catch (error) {
        await logStep( stepName, description, 'Failed');
        throw error;
    }
}

async function assertTextContent(
    locator: Locator,
    expected: string | string[],
    stepName: string,
    assertionDetail: string
) {
    try {
        const actual = await locator.textContent();
        // case 1: If expected value is string
        if (typeof expected === 'string'){
            // await expect(locator).toHaveText(expected);
            if (actual === expected) {
            await logStep( stepName, assertionDetail, `Actual text '${actual}' is an exact match with the expected text '${expected}'`, 'Passed')
            } else if (actual?.includes(expected)) {
            await logStep( stepName, assertionDetail, `Actual text '${actual}' includes the expected text '${expected}'`)
            } else {
            await logStep( stepName, assertionDetail, `Actual text '${actual}' is not a match with expected text '${expected}'`, '❌ Failed')
            }
        }else if (Array.isArray(expected)) {
            if (actual && actual.includes(actual)) {
                await logStep( stepName, assertionDetail, `Actual text '${actual}' matched one of the item from the expected text array '${expected}'`)
            } else {
                await logStep( stepName, assertionDetail, `Actual text '${actual}' is not matched with any of the expected values '${expected}'`, '❌ Failed')
                }
        }
    } catch (error) {
        logStep(stepName, assertionDetail, 'Text content not retrieved', ' ❌ Failed');
        throw error;
    }
}


async function assertValue( 
    locator: Locator, 
    expected: string | string[],
    stepName: string, 
    assertionDetail?: string
    ) {
        const actualValue = await locator.inputValue();
        try {
            if (typeof expected === 'string') {
                await expect(locator).toHaveValue(expected);
                logStep(stepName, assertionDetail, `Value displayed in the input field "${actualValue}" was same as expected "${expected}"`,  'Passed');
            }

            if ( Array.isArray(expected)) {
                expect(expectedValues).toContain(actualValue)
                logStep(stepName, assertionDetail, `Value displayed in the input field "${actualValue}" was one of the expected "${expected}"`,  'Passed');
            }

        } catch (error) {
            logStep(stepName, assertionDetail, 'Expected element was not visible', ' ❌ Failed');
            throw error;
    }
}

async function assertAttributeValue( 
    locator: Locator, 
    attribute: string,
    expectedValue: string | string[],
    stepName: string, 
    assertionDetail?: string
    ) {
        const actualValue = await locator.getAttribute(attribute);
        try {
            if (typeof expectedValue === 'string') {
                expect(actualValue).toEqual(expectedValue);
                logStep(stepName, assertionDetail, `Value of attribute '${attribute}' displayed = "${actualValue}". This is same as expected "${expectedValue}"`,  'Passed');
            }

            if ( Array.isArray(expectedValue)) {
                expect(expectedValues).toContain(actualValue)
                logStep(stepName, assertionDetail, `Value of attribute '${attribute}' displayed = "${actualValue}".  This is matching with one of the expected "${expectedValue}"`,  'Passed');
            }

        } catch (error) {
            logStep(stepName, assertionDetail, 'Expected element was not visible', ' ❌ Failed');
            throw error;
    }
}

async function isElementVisible( locator: Locator, stepName: string, assertionDetail?: string, shouldThrow?:boolean) : Promise<boolean> {
    try {
        await expect(locator).toBeVisible();
        logStep(stepName, assertionDetail, 'Expected element was visible on the page',  'Passed');
        return true;
    } catch (error) {
        logStep(stepName, assertionDetail, 'Expected element was not visible', 'Failed');
       if (shouldThrow){ throw error;}
        return false;
    }
}

async function logStep(stepName:string,  description?: string, result? : string,  status?: string) {
    const line = '─'.repeat(50);
    console.log(`\n${line}`);
    console.log(`Step: ${stepName}`);
    if (description) {
        console.log(`Assertion: ${description}`);
      }

      if (description) {
        console.log(`Result: ${result}`);
      }

    if (status) {
        console.log(`Status: ${status}`);
      }
    // console.log(`${line}\n`);
}

