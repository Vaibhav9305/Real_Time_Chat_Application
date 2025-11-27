// import { Server } from "socket.io";
// import http from "http";
// import express from "express";
// import dotenv, { config } from "dotenv";

// dotenv.config({});

// const app = express();

// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: [
//       "http://localhost:5173",
//       "https://chat-mern-khaki.vercel.app",
//     ],
//     credentials: true,
//     methods: ["GET", "POST"],
//   },
  
// });
// app.options("*", cors());

// export const getReceiverSocketId = (receiverId) => {
//   return userSocketMap[receiverId];
// };

// const userSocketMap = {};

// io.on("connection", (socket) => {
//   console.log("User connected", socket.id);

//   const userId = socket.handshake.auth.userId;
//   if (userId !== undefined) {
//     userSocketMap[userId] = socket.id;
//   }

//   io.emit("getOnlineUsers", Object.keys(userSocketMap));

//   socket.on("disconnect", () => {
//     console.log("User disconnected", socket.id);
//     delete userSocketMap[userId];
//     io.emit("getOnlineUsers", Object.keys(userSocketMap));
//   });
// });

// export { app, io, server };


// Chat gpt code is from here 

import { Server } from "socket.io";
import http from "http";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

// ✅ CORS FOR EXPRESS API
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://chat-mern-khaki.vercel.app",
    ],
    credentials: true,
  })
);

// Preflight
app.options("*", cors());

// JSON
app.use(express.json());

const server = http.createServer(app);

// ✅ CORS FOR SOCKET.IO
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://chat-mern-khaki.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST"],
  },
});

// Socket User Mapping
const userSocketMap = {};

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

// SOCKET.IO EVENTS
io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  const userId = socket.handshake.auth.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  // Send online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    delete userSocketMap[userId];

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
