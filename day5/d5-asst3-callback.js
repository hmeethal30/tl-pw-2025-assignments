/* 
Assignment Steps: 
1. Declare a global variable browser and assign it the value "Chrome". 
o Example: let browser = "Chrome"; 
2. Create a function named checkBrowserVersion that accepts a callback function as an 
argument: 
o Use setTimeout to simulate a delay (like waiting for data from a server). 
o After the delay (2 seconds), invoke the callback function and pass the browser value to it. 
3. Write a callback function that logs the browser version to the console when invoked. 
4. Call checkBrowserVersion and pass the callback function to it. 
o The callback should print the browser version after the 2-second delay.
*/

let browser = 'Chrome'; // Gloabal variable to store the browser name

//Function to check the browser version after a delay
function checkBrowserVersion(callback){
    console.log('Checking browser version...'); // Simulate checking the browser version
    setTimeout(() => {
        callback(browser); // Invoke the callback function and pass the browser value to it
    }, 2000); // Simulate a delay of 2 seconds

}

function printBrowserVersion(browser){
    console.log(`The browser version is: ${browser}`); // Print the browser version to the console
}

checkBrowserVersion(printBrowserVersion)