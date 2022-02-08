import { Express } from "express";
import userRouter from "./user.router";
import loginRouter from "./login.router";

const initializerRouter = (app: Express) => {
  app.use("/user", userRouter());
  app.use("/login", loginRouter());
};

export default initializerRouter;
