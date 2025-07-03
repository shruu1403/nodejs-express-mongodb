const express=require("express")
const {userModel}=require("../models/userModel")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const cookieParser=require("cookie-parser")

const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{
    const {email,password,age,username}=req.body
    try {
        bcrypt.hash(password,5,async(err,hash)=>{
            const user=new userModel({email,password:hash,age,username})
            await user.save()
            res.status(200).send({"msg":"new user has been created"})
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({"msg":"error"})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await userModel.findOne({email})
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    const token = jwt.sign({email},"blogger",{expiresIn:"1h"})  //blogger is the secret key
                    const refreshToken=jwt.sign({email},"blogger",{expiresIn: 60*60*24*7})

                    res.cookie("accessToken",token,{httpOnly:true})
                    res.cookie("refreshToken",refreshToken,{httpOnly:true})

                    res.status(200).send({"msg":"login successful", "token":token, "refreshToken":refreshToken})

                }
                else{
                    res.status(200).send({"msg":"wrong password"})
                }
            })
        }
        else{
            res.status(200).send({"msg":"no user found"})
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({"error":error})
    }
})

module.exports={userRouter}