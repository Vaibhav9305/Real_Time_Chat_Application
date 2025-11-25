import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    const mongoURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
    await mongoose.connect(mongoURI).then(() => {
        console.log("MongoDB connected successfully");
    }).catch((err) => {
        console.log("MongoDB connection failed:", err);
    });
}

export default connectDB;