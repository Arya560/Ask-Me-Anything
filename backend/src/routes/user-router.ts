import { Router } from "express";
import {
  userLoginValidator,
  userSignupValidator,
  validate,
} from "../libs/data-validators.js";
import {
  getAllUsers,
  userLogin,
  userLogout,
  userSignup,
  verifyUser,
} from "../controllers/user-controllers.js";
import { verifyToken } from "../libs/jwt-token-generator.js";

const userRouter = Router();
userRouter.get("/user", getAllUsers);

userRouter.post(
  "/signup",
  validate(userSignupValidator),
  userSignup
);

userRouter.post(
  "/login",
  validate(userLoginValidator),
  userLogin
);

userRouter.get("/auth-status", verifyToken, verifyUser);
userRouter.get("/logout", verifyToken, userLogout);

export default userRouter;
