// const express = require('express');  //type-module
import express from 'express';        //ES module
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import userRoutes from './routes/userRoute.js';
import messageRoute from './routes/messageRoute.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { server, app} from './socket/socket.js';

dotenv.config({});


const PORT = process.env.PORT || 3000;

//middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cookieParser());
const corsOption = {
  origin: process.env.CLIENT_URL,
  credentials: true
};
app.use(cors(corsOption));

//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/message", messageRoute)

server.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});