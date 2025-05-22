const express = require("express");
const userRouter = express.Router();
const { login, signup } = require("../Controllers/userContoller");

userRouter.post("/signup", signup);
userRouter.post("/login", login);
module.exports = { userRouter };
