import bcryptjs from "bcryptjs";
import { User } from "../../../DB/models/user.model.js";
import jwt from "jsonwebtoken";
import { catchError } from "../../utils/catchError.js";
import ApiError from "../../utils/errors/ApiError.js";
// Sign Up
export const signup = catchError( async (req, res, next) => {
    const { email, name, password, confirmPassword } = req.body;
    if (password !== confirmPassword)
      return next(new ApiError(400, "Password and Confirm Password not match!"));
    const check = await User.findOne({ email });
    // Check Email
    if (check)
      return next(new ApiError(409, "Email already exists!")); 
    // Hash Password
    const hashPassword = bcryptjs.hashSync(
      password,
      parseInt(process.env.SLATROUNDS)
    );
    // create user
    const user = await User.create({ email, name, password: hashPassword });
    // response
    return res
      .status(201)
      .json({ success: true, message: "User created successfully!", user });
  } 
);
// Login
export const login = catchError( async (req, res, next) => {

    // data
    const { email, password } = req.body;
    // Query
    const user = await User.findOne({ email });
    // Check Email or Password
    if (!user)
      return next(new ApiError(404, "email or password is not worng!"));
    // Check Password
    const match = bcryptjs.compareSync(password, user.password);

    if (!match)
      return next(new ApiError(404, "email or password is not worng!"));
    // create token
    const token = jwt.sign({ id: user.id, email }, process.env.TOKENKEY, {
      expiresIn: "1hr",
    });

    return res.status(200).json({ success: true, token });
  } 
);

