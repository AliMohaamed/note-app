import mongoose, { Schema, Types,  model } from"mongoose";

// Schema 
const noteSchema = new Schema({
    content:{
        type: String,
        required: [true, 'Note content is required'],  
        trim: true 
    },
    isCompleted:{
        type: Boolean,
        default: false
    },
    userId:{
        // type: Types.ObjectId,
        type: Types.ObjectId,
        ref: "User",
        required: [true, 'User ID is required'], 
    }
});
// Model
export const Note = mongoose.models.Note || model("Note",noteSchema);