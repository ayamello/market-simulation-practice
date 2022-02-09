import { getCustomRepository } from "typeorm";
import AppError from "../errors/AppError";
import ProductRepository from "../repositories/ProductRepository";
import { BodyProductRegister } from "../types/IProduct";

export const registerProduct = async (data: BodyProductRegister) => {
  const productRepository = getCustomRepository(ProductRepository);

  try {
    const productAlreadyExists = await productRepository.productAlreadyExists(
      data.name
    );

    if (productAlreadyExists) {
      productAlreadyExists.quantity += data.quantity;
      productAlreadyExists.updatedOn = new Date();

      await productRepository.save(productAlreadyExists);

      return productAlreadyExists;
    }

    const product = productRepository.create(data);

    await productRepository.save(product);

    return product;
  } catch (error) {
    throw new AppError((error as any).message, 400);
  }
};

export const productById = async (id: string) => {
  const productRepository = getCustomRepository(ProductRepository);

  try {
    const productFind = await productRepository.findProductbyId(id);

    return productFind;
  } catch (error) {
    throw new AppError((error as any).message, 404);
  }
};

export const listProducts = async () => {
  const productRepository = getCustomRepository(ProductRepository);

  const products = await productRepository.getProducts();

  return products;
};
