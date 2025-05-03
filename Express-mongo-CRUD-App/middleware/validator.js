const validator=(req,res,next)=>{
    const data=req.body

    if(!data.title || !data.author || !data.price){
       return res.status(400).send("invalid book details")
    }
    next()
}
module.exports=validator