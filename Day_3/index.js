const express=require("express")
const fs=require("fs")
const app=express()
const port=4500

//middleware
app.use(express.json())

app.get("/",(req,res)=>{
    res.end("This is Homepage")
})
app.get("/cart",(req,res)=>{
    res.end("This is cartpage")
})
app.get("/about",(req,res)=>{
    res.end("This is about page")
})
app.get("/data",(req,res)=>{
    let data=JSON.parse(fs.readFileSync("./maindata.json","utf-8")) //json->object
    res.send(data)  //focus its send not end
})
app.post("/add-data",(req,res)=>{
    // console.log(req.body);
    const data=fs.readFileSync("./maindata.json","utf-8")
    let parsedData=JSON.parse(data)  //json string->js object  ..to push the data we convert
    parsedData.instructor.push(req.body)
    let jsonData=JSON.stringify(parsedData)  //again converting into JSON format bcoz that file wont support object it needs data in json 
    fs.writeFileSync("./maindata.json",jsonData) //overwriting/updating data
    res.send("saved the data")

})

app.listen(port,()=>{
    console.log(`express server is running at port ${port}`);
})