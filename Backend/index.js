const express = require("express");
const cors = require("cors");
const { connecttoDB } = require("./Utils/dbconnection");
const { userRouter } = require("./Routes/userRoutes");
require("dotenv").config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

connecttoDB(); //connect to local db initially
app.use("/api/auth", userRouter);
app.get("/api/status", (req, res) => {
  return res.end("Server Working");
});

app.listen(process.env.PORT, () => console.log("Server ✅"));
