const jwt=require("jsonwebtoken")

const auth=(req,res,next)=>{
     const { token } = req.query;
       jwt.verify(token, "masai", (err, decoded) => {
        // console.log(decoded);
        if(decoded){
            // res.status(200).send({ msg: "series data..." });
            next()
        }
        else{
            res.status(400).send({"error":err})
        }
      });
}
module.exports={auth}