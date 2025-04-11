/* 

Assignment Details:  
Find the number of occurrences. 
Given the array, const nums = [2,4,5,2,1,2]; 
if const k = 2, then output >> 3 
 
Assignment Requirements:  
1. Initialize count to 0. 
2. Loop through the array `nums`. 
3. If the element equals `k`, increment count. 
4. Return the count of `k` in `nums`. 
*/


//Function to determine the number of occurrences of k in nums
function findOccurances(k, nums){
    let count = 0; // Initialize count to 0
    nums.forEach((num) => {
    if (num === k) {
        count++;
    }})
    return count; // Return the count of k in nums
}

//Validate the function with the given array and number
const nums = [2,4,5,2,1,2];
const k = 2; // The number to count occurrences of
console.log(`The number ${k} occurs ${findOccurances( k, nums)} times in given array ${nums}`); // Output the count

//Test the function with different values of k
console.log(`The number 4 occurs ${findOccurances(4, nums)} times in given array ${nums}`); // Output the count