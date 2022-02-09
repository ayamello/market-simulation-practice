import { register, getProductById, list } from "./../controllers/product.controller";
import { Router } from "express";
import validation from "../middlewares/validation";
import isAuth from "../middlewares/isAuth";
import isUserAdm from "../middlewares/isUserAdm";
import productSchema from "../schemas/productSchema";

const router = Router();

const productRouter = () => {
  router.post("", isAuth, isUserAdm, validation(productSchema), register);
  router.get("/:id", getProductById);
  router.get("", list);
  
  return router;
};

export default productRouter;
