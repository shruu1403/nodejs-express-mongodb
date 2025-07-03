const jwt=require("jsonwebtoken")
const {blacklist}=require("../blacklist")

const auth=(req,res,next)=>{
    const token = req.headers.authorization
    if(token){
        if(blacklist.includes(token)){
            res.send({"msg":"please login again"})
        }
    }
    // console.log(token);
    jwt.verify(token,"masai",(err,decoded)=>{
        if(decoded){
            next()
        }
        else{
            res.status(400).send({"error":err})
        }
    })
next()
}
module.exports={auth}