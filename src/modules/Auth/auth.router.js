import { login, signup } from "./auth.controller.js";
import { Router } from "express";


const router = Router();

// Sign Up
router.post("/signup", signup);
// Login
router.post("/login", login);

export default router;