const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const { connection } = require("./db");
const { userRouter } = require("./routes/userRoutes");

app.use("/users", userRouter);//userRouter is basically helping to navigate from index file to userRoutes file

app.listen(8080, async () => {
  try {
    await connection;
    console.log(`server is running at port 8080`);
    console.log("db is also connected");
  } catch (error) {
    console.log(error);
  }
});
