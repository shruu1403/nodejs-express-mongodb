const jwt=require("jsonwebtoken")
const cookieParser=require("cookie-parser")

const auth=async(req,res,next)=>{
    const token=req.cookies.accessToken

    if(!token){
        return res.status(400).send({"err":"no token provided"})

    }
    jwt.verify(token,"blogger",(err,decoded)=>{  //blogger here is the secret key to verify jwt token
        if(err){
            return res.status(400).send({"err":"invalid token"})
        }
        req.user=decoded
        next()
    })
}

module.exports={auth}