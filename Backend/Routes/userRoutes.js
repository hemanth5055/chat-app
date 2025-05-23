const express = require("express");
const userRouter = express.Router();
const { protectRoute } = require("../Middleware/auth");
const {
  login,
  signup,
  checkAuth,
  getUsers,
} = require("../Controllers/userContoller");

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/check", protectRoute, checkAuth);
userRouter.get("/allusers", protectRoute, getUsers);
module.exports = { userRouter };
