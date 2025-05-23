const express = require("express");
const cors = require("cors");
const { connecttoDB } = require("./Utils/dbconnection");
const { userRouter } = require("./Routes/userRoutes");
const { msgRouter } = require("./Routes/messageRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

connecttoDB(); //connect to local db initially
app.use("/api/auth", userRouter);
app.use("/api/msg", msgRouter);

app.get("/api/status", (req, res) => {
  return res.end("Server Working");
});

app.listen(process.env.PORT, () => console.log("Server ✅"));
