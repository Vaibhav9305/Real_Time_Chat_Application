// const express = require('express');  //type-module
import express from "express"; //ES module
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoutes from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { server, app } from "./socket/socket.js";

dotenv.config({});

const PORT = process.env.PORT || 3000;

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: [
    "http://localhost:5173", // for local dev
    "https://chat-mern-khaki.vercel.app/", // deployed frontend
  ],
  credentials: true,
}));
app.options("*", cors());

//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/message", messageRoute);

server.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});


