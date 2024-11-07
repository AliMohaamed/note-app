import mongoose from "mongoose";

export const connectDB = async () =>
   await mongoose
    .connect("mongodb://127.0.0.1:27017/note_app")
    .then(() => console.log("Connection is successfully"))
    .catch((err) => console.log("Connection is faild!", err));
