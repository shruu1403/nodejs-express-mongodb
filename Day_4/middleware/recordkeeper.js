const fs=require("fs")

const recordkeeper=(req,res,next)=>{
    let url=req.url
    let method=req.method
    let timestamp=Date()
    // console.log(url,method,timestamp);
    const content=`\nthe url is ${url} the method is ${method} the timestamp is ${timestamp}`
    console.log(content);
    fs.appendFileSync("./logs.txt",content)
    next() //use of next-  it will never go to api it will be stuck without it
}
module.exports={recordkeeper}