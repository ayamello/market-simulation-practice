import { addProductToCart, getCartById, list, removeProduct } from './../controllers/cart.controller';
import { Router } from "express";
import validation from "../middlewares/validation";
import isAuth from "../middlewares/isAuth";
import isUserAdm from "../middlewares/isUserAdm";
import productToCartSchema from "../schemas/productToCartSchema";

const router = Router();

const cartRouter = () => {
  router.post('/:product_id', isAuth, validation(productToCartSchema), addProductToCart);
  router.get('/:id', isAuth, getCartById);
  router.get('', isAuth, isUserAdm, list);
  router.delete('/:product_id', isAuth, removeProduct);
  
  return router;
};

export default cartRouter;