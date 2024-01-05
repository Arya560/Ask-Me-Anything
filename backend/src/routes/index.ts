import { Router } from "express";
import userRouter from "./user-router.js";
import chatRoutes from "./chat-routes.js";

const appRouter = Router();
appRouter.use("/user", userRouter);
appRouter.use("/chat", chatRoutes);

export default appRouter;
