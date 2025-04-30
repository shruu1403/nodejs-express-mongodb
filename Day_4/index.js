const express=require("express")
const app=express()
const PORT=8080
const fs=require("fs")

const {ramukaka}=require("./middleware/ramukaka")
const {timeTakenByServer}=require("./middleware/timelogger")
const {recordkeeper}=require("./middleware/recordkeeper")

app.use(recordkeeper)
// app.use(timeTakenByServer)
app.get("/data",timeTakenByServer,(req,res)=>{
    const data=fs.readFileSync("./db.json","utf-8")
    console.log("chunnu is in the school");
    res.send(data)
})


// app.use(ramukaka)
app.get("/school-english",ramukaka,(req,res)=>{
    console.log("chunnu entered engish class of school");
    res.send("You have entered the school")
})
app.get("/school-hindi",(req,res)=>{
    console.log("chunnu entered the hindi class of school");
    res.send("You have entered the school")
})



app.listen(PORT,()=>{
    console.log(`express server is running on port ${PORT}`);
})