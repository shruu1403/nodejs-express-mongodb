// index.js

//  import the crypto module
const crypto=require('crypto')


//  get a commands using process.argv
const args = process.argv.slice(2)
const operation=args[0]
const numbers=args.slice(1).map(Number)  //converting remaining args to numbers
// complete the  function

function add(numbers){
  return numbers.reduce((a,b)=>a+b,0)
}

function sub(numbers){
  return numbers.reduce((a,b)=>a-b)
}

function prod(numbers){
  return numbers.reduce((a,b)=>a*b,1)
}
function div(numbers){
   if (numbers.includes(0)) {
    return "Cannot divide by zero.";
  }
  return numbers.reduce((a,b)=>a/b)
}
function sine(value){
  return Math.sin(value)
}
function cos(value){
  return Math.cos(value)
}
function tan(value){
  return Math.tan(value)
}
function generateRandom(length){
  if(isNaN(length)){
    return "Provide length for random number generation."
  }
  return crypto.randomBytes(length).toString("binary")


}

switch (operation) {
  case 'add':
    console.log(add(numbers));
    break
  case 'sub':
    console.log(sub(numbers)); 
    break
  case 'mult':
    console.log(prod(numbers));
    break
  case 'divide':
    console.log(div(numbers));
    break
  case 'sin':
    console.log(sine(numbers[0]));
    break
  case 'cos':
    console.log(cos(numbers[0]));
    break
  case 'tan':
    console.log(tan(numbers[0]));
    break
  case 'random':
    const length=parseInt(args[1])
    console.log(generateRandom(length));
    break
  
  default:
    console.log("Invalid operation");
}
