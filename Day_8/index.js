const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const PORT = process.env.PORT;
const { connection } = require("./db");
const { userRouter } = require("./routes/userRouter");
const jwt = require("jsonwebtoken");
const {auth}=require("./middlewares/auth.middleware")

app.use(express.json());
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("homepage");
});
app.get("/about", (req, res) => {
  res.send("about page");
});
app.get("/movies", auth, (req, res) => {
  //token is the idcard to visit moviespage for the user
        res.status(200).send({ msg: "movies data..." })
});
app.get("/series", auth,(req, res) => {
        res.status(200).send({ msg: "series data..." });
});

app.listen(PORT, async () => {
  try {
    await connection;
    console.log(
      `express server is running on ${PORT} and db is also connected`
    );
  } catch (error) {
    console.log(error);
  }
});
