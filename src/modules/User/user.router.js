// APIs
import { Router } from "express";

import {
  deleteUser,
  updateUser,
  profile,
} from "./user.controller.js";
import { isAuthenticated } from "../../middleware/auth.middleware.js";

const router = Router();

// CRUD
// Profile
router.get("/profile", isAuthenticated, profile);
// Delete User
router.delete("/deleteUser", isAuthenticated, deleteUser);
// Update User
router.patch("/updateUser", isAuthenticated, updateUser);



export default router;
