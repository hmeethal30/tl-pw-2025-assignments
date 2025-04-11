/* 
Assignment Details:  
Write a function to sum all the values between 1 and n, and return the sum 
Take n = 5, print between 1 and 5, and keep adding the sum of values  
i.e., 1+2=3, 3+3 =6, 6+4=10, 10+5 =15 
 
Assignment Requirements:  
1. Define a function with parameter `n`. 
2. Initialize `sum` to 0. 
3. Iterate from 1 to `n`. 
4. Add `i` to `sum` in each iteration. 
5. Print `i` and the current `sum`. 
6. Return `sum` after the loop. 
7. Call the function with a specific value.
*/

//Function to sum all values between 1 and n
function sumOfValues(n){
    let sum = 0;
    for ( let i = 1; i<= n; i++){
        sum += i;
        console.log(`This is iteration ${i} and the current sum is: ${sum}`)
    }
    return sum; // Return the final sum after the loop
}

console.log(`The sum of all values between 1 and 5 is: ${sumOfValues(5)}`); // Call the function with n = 5
console.log(`The sum of all values between 1 and 10 is: ${sumOfValues(10)}`); // Call the function with n = 10