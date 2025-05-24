const express = require("express");
const cors = require("cors");
const http = require("http");
const { connecttoDB } = require("./Utils/dbconnection");
const { userRouter } = require("./Routes/userRoutes");
const { msgRouter } = require("./Routes/messageRoutes");
const { Server } = require("socket.io");
const { disconnect } = require("process");
require("dotenv").config();

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

const usermap = {}; //userId-socketId

io.on("connection", (socket) => {
  console.log("user-connected", socket.id);
  socket.on("communication", (load) => {
    //senderId,recieverId,message
    let recieverSocket = usermap[load.recieverId];
    if (recieverSocket == null) return;
    io.to(recieverSocket).emit("messageRecieved", load);
  });
  socket.on("SuccessfullConnection", (msg) => {
    usermap[msg] = socket.id;
    console.log(usermap);
  });
  socket.on("disconnect", () => {
    Object.keys(usermap).forEach((userId) => {
      if (usermap[userId] === socket.id) {
        delete usermap[userId];
        console.log(`User ${userId} disconnected`);
      }
    });
  });
});

app.use(express.json());
app.use(cors({ origin: "*" }));

connecttoDB(); //connect to local db initially
app.use("/api/auth", userRouter);
app.use("/api/msg", msgRouter);

app.get("/api/status", (req, res) => {
  return res.end("Server Working");
});

httpServer.listen(process.env.PORT, () => console.log("Server ✅"));
