import userRouter from "../modules/User/user.router.js";
import noteRouter from "../modules/Note/note.router.js";
import authRouter from "../modules/Auth/auth.router.js"; 

export const appRouter = (app, express) => {
  // Routes
  app.use(express.json());
  // auth
  app.use("/auth", authRouter);
  // user
  app.use("/user", userRouter);
  // note
  app.use("/note", noteRouter);
  // Global Error Handler
  app.use((err, req, res, next) => {
    return res
      .status(err.statusCode || 500)
      .json({ success: false, message: err.message, stack: err.stack });
  });
  // Not Found Page Handler
  app.all("*", (req, res, next) => {
    return res.status(404).json({ success: false, message: "page not found" });
  });
};
