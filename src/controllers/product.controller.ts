import { Request, Response } from "express";
import {
  registerProduct,
  productById,
  listProducts,
} from "../services/product.service";

export const register = async (req: Request, res: Response) => {
  const data = req.validatedData;

  try {
    const productRegistered = await registerProduct(data);

    return res.status(201).json(productRegistered);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const productFind = await productById(id);

    res.status(200).json(productFind);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const list = async (req: Request, res: Response) => {
  try {
    const products = await listProducts();

    res.status(200).json(products);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};
