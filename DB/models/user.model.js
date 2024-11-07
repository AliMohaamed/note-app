import mongoose, { model, Schema } from "mongoose";
import { Note } from "./note.model.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Schema
const userSchema = new Schema({
    name : {
        type: String,
        allowNull : false
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, 'Email address is required'],
        match: [emailRegex, 'Please provide a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password should be at least 6 characters'] 
    },
},{
    timestamps:true
});

// Middleware to delete all notes when user is deleted 
// userSchema.pre("findOneAndDelete", async function(next) {
//     const user = await this.model.findOne(this.getFilter()); 
//     if (user) {
//         await Note.deleteMany({ userId: user._id }); 
//     }
//     next();
// });

// Model
export const User = mongoose.models.User || model("User",userSchema);