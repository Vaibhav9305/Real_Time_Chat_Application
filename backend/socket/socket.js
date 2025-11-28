// import { Server } from "socket.io";
// import http from "http";
// import express from "express";
// import dotenv, { config } from "dotenv";
// import cors from 'cors';

// dotenv.config({});

// const app = express();

// app.use(cors({
//   origin: [
//     "http://localhost:5173",
//     "https://chat-mern-khaki.vercel.app"
//   ],
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
// }));

// app.options("*", cors());

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


//New code here

// socket.js
import { Server } from "socket.io";
import http from "http";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

// ✅ Create Express App (shared with index.js)
const app = express();

// ✅ CORS for Express (MUST match index.js & used only once)
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://chat-mern-khaki.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

// Preflight
app.options("*", cors());

// Create server
const server = http.createServer(app);

// ✅ Socket.io CORS
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

// Mapping for Online Users
const userSocketMap = {};

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

// SOCKET LOGIC
io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  const userId = socket.handshake.auth.userId;

  if (userId !== undefined) {
    userSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// Export
export { app, io, server };




