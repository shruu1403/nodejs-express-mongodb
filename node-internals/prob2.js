// Write a program that uses process.hrtime() to measure the time it takes to execute a function. 
// The function should calculate the sum of the numbers from 1 to 1000000,
//  and the program should print the time it takes to execute the function in nanoseconds.


function calculateSum(){
    let sum=0;
    for(let i=1;i<=1000000;i++){
        sum+=i
    }
    return sum
}

const start=process.hrtime()
calculateSum()
const endTime=process.hrtime(start)

console.log(`execution time: ${endTime[0] * 1e9 + endTime[1]} nanoseconds`);