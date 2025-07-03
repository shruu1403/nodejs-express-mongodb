const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../models/userModel");

const userRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           description: The user name
 *         email:
 *           type: string
 *           description: The user email
 *         pass:
 *           type: string
 *           description: The user password (hashed)
 */

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: All the API routes related to User
 */

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - pass
 *               - username
 *             properties:
 *               email:
 *                 type: string
 *               pass:
 *                 type: string
 *               username:
 *                 type: string
 *     responses:
 *       200:
 *         description: New user has been created
 *       400:
 *         description: Some server error
 */
userRouter.post("/register", async (req, res) => {
  const { email, pass, username } = req.body;
  try {
    bcrypt.hash(pass, 5, async function (err, hash) {
      if (err) {
        res.status(400).send("Something went wrong while hashing");
      } else {
        const user = new userModel({ username, email, pass: hash });
        await user.save();
        res.status(200).send("New user has been created");
      }
    });
  } catch (error) {
    res.status(400).send("Error in registering the user");
  }
});

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login an existing user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - pass
 *             properties:
 *               email:
 *                 type: string
 *               pass:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials or server error
 */
userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      bcrypt.compare(pass, user.pass, function (err, result) {
        if (result) {
          const token = jwt.sign(
            { userID: user._id, user: user.username },
            "masai"
          );
          res
            .status(200)
            .send({ msg: "Login successful", token: token });
        } else {
          res.status(400).send("Wrong password");
        }
      });
    } else {
      res.status(400).send("User not found");
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = { userRouter };
