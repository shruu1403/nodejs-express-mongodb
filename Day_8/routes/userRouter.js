const express=require("express")
const userRouter=express.Router()
const userModel=require("../models/usermodel")
const jwt=require("jsonwebtoken")

userRouter.post("/register",async(req,res)=>{
    const {email,pass,username,age}=req.body
    try {
        bcrypt.hash(pass,5,async function(err,hash)  //5 is salt rounds here means no. of times password should hash
    {
        if(err){
            res.send({"msg":err})
        }else{
            const user=new userModel({email,pas:hash,username,age})
            await user.save()
            res.status(200).send({"msg":"new user has been created"})
        }
    })
        
    } catch (error) {
        res.status(400).send({"msg":"error"})
        
    }
})
userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body
    //find => [] of users
    //findOne => first matched document
    try {
        const user=await userModel.findOne({email})
        console.log(user);
        // console.log(username)
        if(user){
            bcrypt.compare(pass,user.pass,function(err,result){
                if(result){
                    const token=jwt.sign({username: user.username, age: user.age, email: user.email},"masai") // masai here is the secret key for decoding token and that course is a random payload
                    res.status(200).send({"msg":"login successfull" , "token":token})
                }else{
                    res.status(200).send({"msg":"register first or wrong credentials"})
                }
            })
            // console.log(user)
        }
    } catch (error) {
        res.status(400).send({"error":error})
        
    }
})




module.exports={
    userRouter
}