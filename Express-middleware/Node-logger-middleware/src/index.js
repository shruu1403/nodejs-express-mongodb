// import required modules
const express=require("express")
const fs=require("fs")
const morgan=require("morgan")
const PORT=8080

const app=express()
app.use(express.json())

//use morgan middleware to store logs of http requests
const accessLogStream = fs.createWriteStream('./src/access.log', { flags: 'a' });  //flags ensures no overwriting only append new logs

app.use(morgan(':method :status :res[content-length] :response-time ms :date[web] :http-version :url\n', { stream: accessLogStream })); //stream ensures to append in access.log file not console.log


app.get("/",(req,res)=>{
    res.status(200).send({ message: "welcome to server"})
})
app.get("/get-users",(req,res)=>{
    res.status(200).send({ message: "here is the list of all users"})
})

app.post("/add-user",(req,res)=>{
    res.status(201).send({message:"user added successfully"})  
})
app.put("/user/:id",(req,res)=>{
    const id=req.params.id
    res.status(201).send({message:`user ${id} updated successfylly`})
})
app.delete("/user/:id",(req,res)=>{
    const id=req.params.id
    res.status(200).send({message:`user ${id} deleted successfylly`})

})
app.listen(PORT,()=>{
    console.log(`express server is running at port ${PORT}`);
})
// export the server
// eg.module.exports = app;
module.exports=app
