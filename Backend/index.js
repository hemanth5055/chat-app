const express = require("express");
const cors = require("cors");
const http = require("http");
const { connecttoDB } = require("./Utils/dbconnection");
const { userRouter } = require("./Routes/userRoutes");
const { msgRouter } = require("./Routes/messageRoutes");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
const httpServer = http.createServer(app);

// ✅ CORS Configuration
const corsOptions = {
  origin: "https://q-chat-three.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

app.use(cors(corsOptions));

app.use(express.json());

// ✅ Socket.io Setup
const io = new Server(httpServer, {
  cors: {
    origin: "https://q-chat-three.vercel.app",
    methods: ["GET", "POST"],
  },
});

const usermap = {};

io.on("connection", (socket) => {
  console.log("user-connected", socket.id);

  socket.on("communication", (load) => {
    const recieverSocket = usermap[load.recieverId];
    if (recieverSocket) {
      io.to(recieverSocket).emit("messageRecieved", load);
    }
  });

  socket.on("SuccessfullConnection", (userId) => {
    usermap[userId] = socket.id;
    io.emit("userOnline", Object.keys(usermap));
    console.log("Updated usermap:", usermap);
  });

  socket.on("disconnect", () => {
    for (const userId in usermap) {
      if (usermap[userId] === socket.id) {
        delete usermap[userId];
        console.log(`User ${userId} disconnected`);
        break;
      }
    }
    io.emit("userOffline", Object.keys(usermap));
  });
});

// ✅ Routes and DB Connection
connecttoDB();

app.use("/api/auth", userRouter);
app.use("/api/msg", msgRouter);

app.get("/api/status", (req, res) => {
  return res.end("Server Working");
});

// ✅ Start Server
httpServer.listen(process.env.PORT, () => console.log("Server ✅"));
