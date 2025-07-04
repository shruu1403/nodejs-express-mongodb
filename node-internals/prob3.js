// Prove the order of execution of event loop phases. using 
// process.nextTick(), Promise, setTimeout, setInterval, setImmediate, and file reading.
// (Prove means use all timers and show using console that which timer is running first, second and so on.)

const fs=require("fs")

process.nextTick(()=>{
    console.log('process.nextTick');
})

Promise.resolve().then(()=>{
    console.log('Promise.resolve');
})

setTimeout(() => {
    console.log('setTimeout(0ms)');
}, 0);

const intervalId=setInterval(()=>{
    console.log('setInterval (0ms)');
    clearInterval(intervalId)
},0)

setImmediate(()=>{
    console.log('setImmediate');
})

fs.readFile(__filename,()=>{
    console.log('fs.readFile callback');
})