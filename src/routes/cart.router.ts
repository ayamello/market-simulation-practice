import { addProductToCart, getCartById, list } from './../controllers/cart.controller';
import { Router } from "express";
import validation from "../middlewares/validation";
import isAuth from "../middlewares/isAuth";
import isUserAdm from "../middlewares/isUserAdm";
import productToCartSchema from "../schemas/ProductToCartSchema";

const router = Router();

const cartRouter = () => {
  router.post('', isAuth, validation(productToCartSchema), addProductToCart);
  router.get('/:id', isAuth, getCartById);
  router.get('', isAuth, isUserAdm, list);
  
  return router;
};

export default cartRouter;