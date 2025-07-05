const expressRateLimiter=require("express-rate-limit")

const rateLimit=expressRateLimiter.rateLimit({
    windowMs:10*60*1000,  //10 mins
    limit:100,
    standardHeaders:'draft-7',
    legacyHeaders:false
})
module.exports={rateLimit}