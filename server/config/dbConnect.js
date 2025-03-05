import mongoose from "mongoose";

const connectDB = async () => {
    await mongoose.connect(`${process.env.MONGODB_URL}/incruiter-auth`);
    console.log("MongoDB connected");
}

export default connectDB;