const fs=require("fs")

const addID = (req,res,next) => {
  try {
    const data=fs.readFileSync("./db.json","utf-8")
    console.log(data);
    const parsedData=JSON.parse(data)
    var currentId=parsedData.heroes.length
    req.body.id=currentId+1

    next()

    
  } catch (error) {
    console.log(error);
    
  }
};

module.exports = {
  addID,
};

//+1
