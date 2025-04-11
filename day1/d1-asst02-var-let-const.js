/* 
Assignment Requirements:  
1. Declare a const name as browserVersion (global) 
2. Assign value as Chrome 
3. Create a function by name getBrowserVersion 
4. Create if condition inside function to check if browser is chrome, then 
5. Declare a local variable (browserVersion) and print that variable inside function (outside block) 
6. Call that function from the javascript
*/

var browserVersion = 'Chrome';

function getBrowserVersion() {

    if (browserVersion=='Chrome') {
        let browserVersion = 'Chrome new';
        console.log("Printing from inside function, and inside block => Browser version is " + browserVersion);
    }
    else {
        let browserVersion = 'Firefox';
        console.log("Printing from inside function, and inside block => Browser version is " + browserVersion);
    }
    console.log("Printing from inside function, but outside block => Browser version is " + browserVersion);
}

getBrowserVersion();