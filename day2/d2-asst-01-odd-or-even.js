/* 
Assignment Details:  
Write a JavaScript function named `isOddOrEven` that takes an integer as input and returns `Odd` if the number is odd and `"Even"` if the number is even. 
 
Assignment Requirements:  
1. Create a function named `isOddOrEven` that takes a number as a parameter   
2. Declare and initialize the variable   
3.  Use a conditional statement to check if the number is divisible by 2  
4. Call the function and print the result 
*/

function isOddOrEven(number) {
    let numberToCheck = number
    if (numberToCheck % 2 === 0) {
        return "Even";
    } else {
        return "Odd"
    }

}

let myNumber = 5; // Change this number to test with different values
console.log(`The number ${myNumber} is ${isOddOrEven(myNumber)}`)
console.log(`The number ${100} is ${isOddOrEven(100)}`)
console.log(`The number ${0} is ${isOddOrEven(0)}`)
console.log(`The number ${2235645} is ${isOddOrEven(2235645)}`)