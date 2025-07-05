const jwt = require("jsonwebtoken");
const { blacklistModel } = require("../models/blacklistModel");

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]
  try {
    if (token) {
      const found = await blacklistModel.findOne({ token });
      if (found) {
        res.status(400).send({ "msg": "please login again" });
      } else {
        jwt.verify(token, "masai", (err, decoded) => {
          if (err) {
            res.status(400).send({ "msg": "please login again" });
          }else{
            next()
          }
        });
      }
    } else {
        res.status(400).send({"msg":"please login and provide token"})
    }
  } catch (error) {
    res.status(400).send({"error":error})
  }
};
module.exports = { auth };
