const timeTakenByServer=(req,res,next)=>{
    const startTime=new Date().getTime()
    console.log(startTime,"chunnu enters the school");
    next()
    const endTime=new Date().getTime()
    console.log(endTime,"chunnu left the school");
    console.log(`server took ${endTime-startTime} ms`)
}
module.exports={timeTakenByServer}