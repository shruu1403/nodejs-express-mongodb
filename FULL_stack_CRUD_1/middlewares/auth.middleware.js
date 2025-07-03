const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]

    try {
        
        if(token){
            jwt.verify(token, 'masai', (err, decoded) => {
                if(decoded){
                    // console.log(decoded,token,err,next);
                    req.userID = decoded.userID;
                    req.user = decoded; 
                    next();
                    
                }else{
                    res.status(400).send({"msg":"Token is wrong or expired", "error": err})
                }
            })
        }else{
            res.status(400).send({"msg":"Please provide a token"})
        }
    } catch (error) {
        // console.log("err:",error);
        res.status(400).send({"msg":"Something went wrong while authenticating", "error": error})
        
    }
    
}

module.exports = {
    auth
}