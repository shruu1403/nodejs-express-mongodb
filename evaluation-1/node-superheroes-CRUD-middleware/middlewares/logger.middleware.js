
const fs=require("fs")
const logger = (req,res,next) => {
  const data=`URL: ${req.url}, Method: ${req.method}, Timestamp: ${Date()}\n`
  console.log(data);
  fs.appendFileSync("./logs.txt",data,"utf-8")
  next()
};

module.exports = {
  logger,
};

//+0.5
