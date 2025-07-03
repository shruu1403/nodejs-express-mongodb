const jwt=require("jsonwebtoken")
const {blacklistModel}=require("../models/blacklistModel")

const auth=async (req,res,next)=>{
    const token=req.headers.authorization
    try {
        const found=await blacklistModel.findOne({token})
        if(found){
            res.status(200).send({"msg":"please login again"})
        }
        else{
            jwt.verify(token , "myntra",(error,decoded)=>{
                if(decoded){
                    next()
                }
            })
        }
    } catch (error) {
        res.status(400).send({"error":error})
    }
}
module.exports={auth}