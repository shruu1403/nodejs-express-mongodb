const auth = (req,res,next) => {
  console.log("yo");
  const {role,pass}=req.query
  if(role!=="admin" || pass!=="saveEarth"){
    res.send({message:"Not Authorized"})
    return
  }
  console.log("bye");
  next()
};

module.exports = {
  auth,
};

//+1
