/* 
    Assignment Steps:  
    Create a function called fetchDataFromDatabase() that returns a Promise.  
    • Inside the function, use setTimeout() to simulate a delay of 3 seconds.  
    • Use a simple condition like const data = true to simulate whether data is available.  
    • If data is true, resolve the Promise with the message "Data fetched successfully!".  
    If data is false, reject the Promise with the message "Data not found!".  
    Call the function fetchDataFromDatabase() and handle the Promise:  
    o Use .then() to print "Data fetched successfully!" if the 
    Promise is resolved. o  Use .catch() to print "Data not found!" if 
    the Promise is rejected.
*/

function fetchDataFromDatabase(data) {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            if (data) {
                resolve("Data fetched successfully!");
            } else {
                reject("Data not found!");
            }
        }, 3000)

        .then(() => {
            console.log("Data fetched successfully!");
        })
        .catch(() => {
            console.error("Data not found!");
        })
    })

}

// Call the function fetchDataFromDatabase() with data set to true
// to test the resolution case:
fetchDataFromDatabase(true)
    .then((message) => {
        console.log(message); // Data fetched successfully!
    })
    .catch((error) => {
        console.error(error); // Data not found!
    })

// Call the function fetchDataFromDatabase() with data set to false
// to test the rejection case:
fetchDataFromDatabase(false)
.then((message) => {
    console.log(message); // Data fetched successfully!
})
.catch((error) => {
    console.error(error); // Data not found!
})
