const express=require("express")
const app=express()
const {connection} =require("./db")
const {bookRoutes}=require("./routes/bookRoutes")

app.use(express.json())
app.use("/books",bookRoutes)

app.get("/",(req,res)=>{
    res.send("WELCOME TO BOOK STORE MANAGEMENT SYSTEM")
})

app.use((req,res)=>{
    res.status(400).send("invalid endpoint")
})

app.listen(8080,async()=>{
    try {
        await connection
        console.log("server is running at port 8080");
        console.log("database connected successfully");
    } catch (error) {
        console.log(error);
    }
})