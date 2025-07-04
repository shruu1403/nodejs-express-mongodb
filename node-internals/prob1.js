// Write a program that uses process.nextTick() to execute a function after the current event loop iteration completes. 
// The function should print a message to the console after a delay of 2 seconds.


function delayedMessage(){
    setTimeout(()=>{
        console.log("message after 2 seconds (inside process.nextTick)");
    },2000)

}

process.nextTick(delayedMessage)

console.log("message from main event loop");