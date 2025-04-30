const fs = require("fs");
const path = "./res.txt";

// make the validator function and export it.
const validateData = (req, res, next) => {
  const { body } = req;

  //checking if body is present
  if (
    !body.ID ||
    !body.Name ||
    !body.Cast ||
    !body.Genre ||
    !body.Rating ||
    !body.Description
  ) {
    return res.status(400).send("invalid request body.");
  }

  //validate ID
  if (typeof (body.ID) === "number") {
    fs.appendFileSync(path, "\nID is a number", "utf-8");
  } else {
    fs.appendFileSync(path, "\nbad request.some data is incorrect.");
    return res.status(400).send("bad request.some data is incorrect.");
  }

  //validate Name
  if (typeof (body.Name) === "string" && !/\d/.test(body.Name)) {
    fs.appendFileSync(path, "\nName is a string", "utf-8");
  } else {
    fs.appendFileSync(path, "\nbad request.some data is incorrect.");
    return res.status(400).send("bad request.some data is incorrect.");
  }

  //validate Description
  if (typeof (body.Description) === "string") {
    fs.appendFileSync(path, "\nDescription is a string", "utf-8");
  } else {
    fs.appendFileSync(path, "\nbad request.some data is incorrect.");
    return res.status(400).send("bad request.some data is incorrect.");
  }

  //validate Rating
  if (typeof (body.Rating) === "number") {
    fs.appendFileSync(path, "\nRating is a number", "utf-8");
  } else {
    fs.appendFileSync(path, "\nbad request.some data is incorrect.");
    return res.status(400).send("bad request.some data is incorrect.");
  }

  //validate Genre
  if(typeof (body.Genre)==="string"){
    fs.appendFileSync(path, "\nGenre is a string", "utf-8");
  }else {
    fs.appendFileSync(path, "\nbad request.some data is incorrect.");
    return res.status(400).send("bad request.some data is incorrect.");
  }
  
  //validate cast
  if(Array.isArray(body.Cast) && body.Cast.every(item=>typeof item=== "string")){
    fs.appendFileSync(path,"\nCast is a array of string")
  }
  else {
    fs.appendFileSync(path, "\nbad request.some data is incorrect.");
    return res.status(400).send("bad request.some data is incorrect.");
  }

  next() //function used to pass control to the next middleware function in request-response cycle
};

// module.exports = validatorfunction;
module.exports = validateData;
