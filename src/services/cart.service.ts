import { getCustomRepository } from "typeorm";
import AppError from "../errors/AppError";
import { v4 } from "uuid";
import { DataUser } from "../types/IUser";
import { INewProduct } from "../types/ICart";
import CartRepository from "../repositories/CartRepository";
import ProductCartRepository from "../repositories/ProductCartRepository";
import ProductRepository from "../repositories/ProductRepository";
import UserRepository from "../repositories/UserRepository";

export const addProduct = async (dataProduct: INewProduct, user: DataUser) => {
  const cartRepository = getCustomRepository(CartRepository);
  const userRepository = getCustomRepository(UserRepository);

  try {
    if (!user.cart) {
      const newCart = {
        id: v4(),
        products: [],
        createdOn: new Date(),
        updatedOn: new Date(),
      };

      const cart = cartRepository.create(newCart);

      await cartRepository.save(cart);

      user.cart = cart;

      await userRepository.save(user);
    }

    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findProductbyId(
      dataProduct.product_id
    );

    if (product) {
      const productCartRepository = getCustomRepository(ProductCartRepository);

      const newProductCart = {
        id: v4(),
        cart: user.cart,
        product_id: product.id,
        quantity: dataProduct.quantity,
        price: dataProduct.quantity * product.unit_value,
        createdOn: new Date(),
        updatedOn: new Date(),
      };

      const productCart = productCartRepository.create(newProductCart);

      await productCartRepository.save(productCart);

      user.cart.products = [...user.cart.products, productCart];

      await userRepository.save(user);
    }

    return user.cart;
  } catch (error) {
    throw new AppError((error as any).message, 400);
  }
};

export const cartById = async (id: string, user: DataUser) => {
  const cartRepository = getCustomRepository(CartRepository);

  try {
    if (user.isAdm !== true && user.cart.id !== id) {
      return "Unauthorized";
    }

    const cartFind = await cartRepository.findCartById(id);

    return cartFind;
  } catch (error) {
    throw new AppError((error as any).message, 400);
  }
};

export const listCarts = async () => {
  const cartRepository = getCustomRepository(CartRepository);

  try {
    const carts = await cartRepository.getCarts();

    return carts;
  } catch (error) {
    throw new AppError((error as any).message, 400);
  }
};
