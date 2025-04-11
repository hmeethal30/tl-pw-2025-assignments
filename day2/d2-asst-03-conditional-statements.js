/* 
Assignment Details:  
Create and call two JavaScript functions: `launchBrowser` with `if-else` for browser launch messages, and 
`runTests` with `switch` for test type messages. 
 
Assignment Requirements:  
Create two functions : launchBrowser, runTests where, 
    a) launchBrowser need to take input as browserName (string) and do not return any 
        - use if-else (chrome or otherwise) 
        - Print the value 
    b) runTests need to take input as testType (string) and do not return any  
        - use switch case (smoke, sanity, regression, default (smoke)) 
        - Print the values 
Call that function from the javascript
*/

 function launchBrowser(browserName) {
    if ( browserName === "Chrome") {
        console.log(`Launching ${browserName} browser`);
    }
    else {
        console.log(`Launching default browser`);
    }
 }

 //Fucntion to run tests based on test type
function runTests(testType) {
    switch (testType) {
        case "smoke":
            console.log("Running smoke tests");
            break;
        case "sanity":
            console.log("Running sanity tests");
            break;
        case "regression":
            console.log("Running regression tests");
            break;
        default:
            console.log("Running smoke tests");
    }}

//Calling the functions
launchBrowser("Chrome");   
launchBrowser("Firefox");   

runTests("smoke");
runTests("sanity");
runTests("regression"); 
runTests("default");
runTests("other");