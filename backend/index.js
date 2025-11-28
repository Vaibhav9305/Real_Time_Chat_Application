// // const express = require('express');  //type-module
// import express from "express"; //ES module
// import dotenv from "dotenv";
// import connectDB from "./config/database.js";
// import userRoutes from "./routes/userRoute.js";
// import messageRoute from "./routes/messageRoute.js";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import { server, app } from "./socket/socket.js";

// dotenv.config({});

// const PORT = process.env.PORT || 3000;

// app.use(cors({
//   origin: [
//     "http://localhost:5173",
//     "https://chat-mern-khaki.vercel.app"
//   ],
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   credentials: true,
// }));
// app.options("*", cors());

// //middleware
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cookieParser());


// //routes
// app.use("/api/v1/user", userRoutes);
// app.use("/api/v1/message", messageRoute);

// server.listen(PORT, () => {
//   connectDB();
//   console.log(`Server is running on port ${PORT}`);
// });


// New code here

// index.js
import express from "express"; 
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoutes from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { server, app } from "./socket/socket.js";   // using same app from socket.js

dotenv.config();

const PORT = process.env.PORT || 3000;

// ✅ CORS (MUST COME FIRST — ONLY ONCE)
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://chat-mern-khaki.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/message", messageRoute);

// Start server
server.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});

