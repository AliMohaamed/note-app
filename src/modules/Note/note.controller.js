import { Note } from "../../../DB/models/note.model.js";
import { User } from "../../../DB/models/user.model.js";
import { catchError } from "../../utils/catchError.js";
import ApiError from "../../utils/errors/ApiError.js";

// create note
export const createNote = catchError(async (req, res, next) => {
  const { content } = req.body;
  const userId = req.user._id;
  const note = await Note.create({ content, userId });
  return res
    .status(201)
    .json({ success: true, message: "Note is created", results: note });
});

// Update Note (using isCompleted)
export const updateNote = catchError(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;
  // Check if user exist
  const user = await User.findById(userId);
  if (!user) return next(new ApiError(404, "User is not found"));
  const updatedNote = await Note.findOneAndUpdate(
    { _id: id, userId },
    [{ $set: { isCompleted: { $eq: [false, "$isCompleted"] } } }],
    { new: true }
  );
  if (!updatedNote) return next(new ApiError(404, "Note is not found"));
  return res.status(200).json({ success: true, results: updatedNote });

});

// Delete Note
export const deleteNote = catchError(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;
  const user = await User.findById(userId);
  if (!user) return next(new ApiError(404, "User is not found"));
  const note = await Note.findOneAndDelete({ _id: id, userId });
  if (!note) return next(new ApiError(404, "Note is not found"));
  return res
    .status(200)
    .json({ success: true, message: "Note deleted successfully" });
});

// get all notes from specifiy user (user notes)
export const getUserNotes = catchError(async (req, res, next) => {
  const id = req.user._id;
  const notes = await Note.find({ userId: id });
  if (!notes.length) return next(new ApiError(404, "Notes is not found"));
  return res.status(200).json({ success: true, results: notes });
});
