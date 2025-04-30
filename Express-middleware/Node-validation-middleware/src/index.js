//  import required modules from nodejs and build the server
const express=require("express")
const PORT=8080
const app=express()
const validateData=require("./middlewares/validator")

app.use(express.json())
app.use(validateData)

app.post("/",(req,res)=>{
    res.status(200).send({message:"data received"})

})

app.listen(PORT,()=>{
    console.log(`express server is running at port ${PORT}`);
})
// export the server
module.exports=app
