const express = require("express");
const userRouter = express.Router();
const { protectRoute } = require("../Middleware/auth");
const { login, signup,checkAuth } = require("../Controllers/userContoller");

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/check", protectRoute, checkAuth);
module.exports = { userRouter };
