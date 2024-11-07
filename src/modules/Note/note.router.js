import { Router } from "express";
import { createNote, updateNote,getUserNotes, deleteNote } from "./note.controller.js";
import { isAuthenticated } from "../../middleware/auth.middleware.js";

const router = Router();

// Create
router.post('/createNote', isAuthenticated,createNote);
// Update Note (using isCompleted)
router.patch('/updateNote/:id',isAuthenticated,updateNote);
// Delete Note
router.delete('/deleteNote/:id',isAuthenticated,deleteNote);
// get all notes from specifiy user (user notes)
router.get('/getUserNotes',isAuthenticated,getUserNotes)
export default router;