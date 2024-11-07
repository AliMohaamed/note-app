import { User } from "../../DB/models/user.model.js";
import jwt from "jsonwebtoken";
import { catchError } from "../utils/catchError.js";
import ApiError from "../utils/errors/ApiError.js";


// Custom Error Class


export const isAuthenticated = catchError(async (req, res, next) => {
  // token >> header
  let { token } = req.headers;
  // Check if the token exists in blackklist

  // check token
  if (!token) return next(new ApiError(400, "Token is required!"));
  // check prefix
  if (!token.startsWith(process.env.BEARERKEY))
    return next(new ApiError(400, "Token is invalid!"));

  // reassign token
  token = token.split(process.env.BEARERKEY)[1];

  // decode >> verfify(token,secretkey)\
  let payload;
  try{
     payload = jwt.verify(token, process.env.TOKENKEY);
  }catch(err){
    return next(new ApiError(401, "Token is invalid!"));
  }

  // check user existence
  const user = await User.findById(payload.id).select("email");
  if (!user)
    return next(new ApiError(404, "User not found"));
  req.user = user;
  return next();
});
