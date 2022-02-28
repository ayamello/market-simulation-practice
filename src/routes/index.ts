import { Express } from "express";
import userRouter from "./user.router";
import loginRouter from "./login.router";
import productRouter from "./product.router";
import cartRouter from "./cart.router";
import EmailRouter from "./email.router";

const initializerRouter = (app: Express) => {
  app.use("/user", userRouter());
  app.use("/login", loginRouter());
  app.use("/product", productRouter());
  app.use("/cart", cartRouter());
  app.use("/send-email", EmailRouter());
};

export default initializerRouter;
