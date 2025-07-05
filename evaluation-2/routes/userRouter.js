const express=require("express")
const {userModel}=require("../models/userModel")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const {passCheck}=require("../middlewares/passCheck.middleware")
const {blacklistModel}=require("../models/blacklistModel")

const userRouter=express.Router()

userRouter.post("/register",passCheck,async(req,res)=>{
    const {email,pass,age,city,name}=req.body
    try {
        const userExists=await userModel.findOne({email})
        if(userExists){
            res.send({"msg":"user already exists"})
        }else{
            bcrypt.hash(pass, 7 , async(err,hash)=>{
                if(err){
                    res.status(200).send({"error":"error while hashing the password"})

                }else{
                    const user=new userModel({email,pass:hash,age,city,name})
                    await user.save()
                    res.status(200).send({"msg":"new user has been registered","registeredUser":user})
                }
            })
        }
    } catch (error) {
        res.status(400).send({"error":error})
        
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body
    try {
        const user=await userModel.findOne({email})
        if(user){
            bcrypt.compare(pass,user.pass,(err,decoded)=>{
                if(decoded){
                    const token=jwt.sign({email},"masai",{expiresIn:2*60*1000})
                    const refreshtoken=jwt.sign({email},"masai",{expiresIn:5*60*1000})
                    res.status(200).send({"msg":"Login successful!","token":token,"refreshtoken":refreshtoken})

                }else{
                    res.status(200).send({"msg":"wrong password"})
                }
            })

        }else{
            res.status(200).send({"msg":"no user found"})
        }
    } catch (error) {
        res.status(400).send({"error":error})
    }
})

userRouter.get("/logout",async(req,res)=>{
    const token=req.headers.authorization
    try {
        const blacklistToken=new blacklistModel({token})
        await blacklistToken.save()
        res.status(200).send({"msg":"user has been logged out"})
    } catch (error) {
        res.status(400).send({"error":error})
    }
})

module.exports={userRouter}