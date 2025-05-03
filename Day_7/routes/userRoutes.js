const express=require("express")
const {UserModel}=require("../models/userModel")
const userRouter=express.Router()

userRouter.get("/", async (req, res) => {
    const q = req.query;
    try {
      const users = await UserModel.find(q);
      //get the data you only created from post req
      res.send(users);
    } catch (error) {
      res.send(error);
    }
  });
  userRouter.post("/add", async (req, res) => {
    console.log(req.body);
    try {
      res.send({ msg: "new user has been added" });
      const data = req.body;
      const user = new UserModel(data);
      await user.save();
    } catch (error) {
      res.send(error);
    }
  });
  userRouter.patch("/update/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const data = req.body;
      console.log(userId, data);
      await UserModel.findByIdAndUpdate({ _id: userId }, data);
      res.send("user has been updated");
    } catch (error) {
      res.send(error);
    }
  });
  userRouter.delete("/delete/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      await UserModel.findByIdAndDelete({ _id: userId });
      res.send("user has been deleted");
    } catch (error) {
      res.send(error);
    }
  });

  module.exports={userRouter}