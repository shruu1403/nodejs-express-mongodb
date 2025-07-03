const express=require("express")
const userRouter=express.Router()
const {userModel}=require("../models/userModel")
const jwt=require("jsonwebtoken")

userRouter.post("/register",async(req,res)=>{
    try {
        const user=new userModel(req.body)
        await user.save()
        res.status(200).send({"msg":"new user has been created"})
    } catch (error) {
        res.status(400).send({"msg":"error"})
        
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body
    try {
        const user=await userModel.findOne({email,pass})
        if(user){
            const token=jwt.sign({coure:"cap_backend"},"masai",{expiresIn:"1h"})
            res.status(200).send({"msg":"login successful","token":token})
        }
        else{
            res.status(200).send({"msg":"register first or wrong credentials"})
        }
    } catch (error) {
        res.status(400).send({"error":"error"})
    }
})
module.exports={userRouter}