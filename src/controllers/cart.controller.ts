import { Request, Response } from "express";
import { addProduct, cartById, listCarts, removeProductFromCart } from "../services/cart.service";

export const addProductToCart = async (req: Request, res: Response) => {
  const { user } = req.user;
  const { quantity } = req.validatedData;
  const { product_id } = req.params

  try {
    const updatedCart = await addProduct(product_id, quantity, user);

    return res.status(200).json(updatedCart);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const getCartById = async (req: Request, res: Response) => {
  const { user } = req.user;
  const { id } = req.params;

  try {
    const cart = await cartById(id, user);

    return res.status(200).json(cart);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const list = async (req: Request, res: Response) => {
  try {
    const products = await listCarts();

    return res.status(200).json(products);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const removeProduct = async (req: Request, res: Response) => {
  const { product_id } = req.params;
  const { quantity } = req.body;

  try {
    await removeProductFromCart(product_id, quantity);

    return res.status(204).json();
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};
