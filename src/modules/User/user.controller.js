import { Note } from "../../../DB/models/note.model.js";
import { User } from "../../../DB/models/user.model.js";
import { catchError } from "../../utils/catchError.js";
import ApiError from "../../utils/errors/ApiError.js";

// profile
export const profile = catchError(async (req, res, next) => {
  const id = req.user._id;
  const user = await User.findById(id, { password: 0 });
  return res.status(200).json({ sucess: true, result: user });
});
// Delete User
export const deleteUser = catchError(async (req, res, next) => {
  const user = req.user; 
  if (!user) return next(new ApiError(404, "User not found"));
  await Note.deleteMany({ userId: user._id });
  await User.findByIdAndDelete(user._id);
  return res
    .status(200)
    .json({ success: true, message: "User deleted successfully" });
});

// Update User
export const updateUser = catchError(async (req, res, next) => {
  const id = req.user._id;
  const { name, email, password } = req.body;
  const user = await User.findByIdAndUpdate(id, { name, email, password });
  if (!user)
    return next(new ApiError(404, "User not found"));
  return res
    .status(200)
    .json({ success: true, message: "User Updated Successfully" });
});
