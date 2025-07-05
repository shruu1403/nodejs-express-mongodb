const express=require("express")
const app=express()
app.use(express.json())
const dotenv=require("dotenv").config()
const {connection}=require("./db")
const {userRouter}=require("./routes/userRouter")
const {bookRouter}=require("./routes/bookRouter")
const jwt=require("jsonwebtoken")

const PORT=process.env.PORT

app.use("/users",userRouter)
app.use("/books",bookRouter)

app.get("/",(req,res)=>{
    res.status(200).send("home page")
})

app.get("/refreshtoken",async(req,res)=>{
    const {email}=req.body
    try {
        const token=jwt.sign({email},"masai",{expiresIn:5*60*1000})
            res.send({"newToken":token})
    } catch (error) {
        res.status(400).send({"error":error})
        
    }

})

app.listen(PORT,async()=>{
    try {
        await connection
        console.log(`server is running at ${PORT} and db is also connected`);
    } catch (error) {
        console.log(error);
    }
})