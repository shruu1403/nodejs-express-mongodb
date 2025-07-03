const {userModel}=require("../models/userModel")
const express=require("express")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

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
        res.status(400).send({"err":error})
    }
})
userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await userModel.findOne({email})
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    const token=jwt.sign({email},"myntra",{expiresIn:'1h'})
                    res.status(200).send({"msg":"login successful","token":token})
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
        res.status(400).send({"error":error})
    }
})


module.exports={userRouter}