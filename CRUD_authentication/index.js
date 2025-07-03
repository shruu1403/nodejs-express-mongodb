const express=require("express")
const app=express()
const {connection} =require("./db")
const dotenv=require("dotenv")
dotenv.config()
const PORT=process.env.PORT
const jwt=require("jsonwebtoken")
const {userRouter}=require("./routes/userRouter")
const {auth}=require("./middlewares/auth.middleware")
const {blacklist}=require("./blacklist")

app.use(express.json())
app.use("/users",userRouter)

app.get("/",(req,res)=>{
    res.send("homepage")
})

app.get("/about",(req,res)=>{
    res.send("about page")
})
app.get("/products",auth,(req,res)=>{
    res.status(200).send({"msg":"products data..."})
})
app.get("/logout",(req,res)=>{
    const token=req.headers.authorization
    try {
        blacklist.push(token)
        res.send({"msg":"user has been logout"})
    } catch (error) {
        res.send({"err":error})
    }
})
app.listen(PORT,async()=>{
    try {
        await connection
        console.log(`express server is running at PORT ${PORT} and db is also connected`);
    } catch (error) {
        console.log(error);
    }

})