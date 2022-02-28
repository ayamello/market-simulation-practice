import { getCustomRepository } from "typeorm";
import AppError from "../errors/AppError";
import { v4 } from "uuid";
import { DataUser } from "../types/IUser";
import CartRepository from "../repositories/CartRepository";
import ProductCartRepository from "../repositories/ProductCartRepository";
import ProductRepository from "../repositories/ProductRepository";
import UserRepository from "../repositories/UserRepository";
import { ICart } from "../types/ICart";

export const addProduct = async (
  product_id: string,
  quantity: number,
  user: DataUser
) => {
  const cartRepository = getCustomRepository(CartRepository);
  const userRepository = getCustomRepository(UserRepository);
  const productRepository = getCustomRepository(ProductRepository);
  const productCartRepository = getCustomRepository(ProductCartRepository);

  try {
    const product = await productRepository.findProductbyId(product_id);

    const userFind = await userRepository.findUserbyId(user.id);

    if (product && userFind) {
      if (userFind?.cart === null) {
        const newCart: ICart = {
          id: v4(),
          products: [],
          createdOn: new Date(),
          updatedOn: new Date(),
        };

        const cart = cartRepository.create(newCart);

        await cartRepository.save(cart);

        userFind.cart = cart;

        await userRepository.save(userFind);
      }

      let filterProduct;

      if (userFind.cart.products.length > 0) {
        filterProduct = userFind.cart.products.filter(
          (productFromCart) => productFromCart.productId === product.id
        );
      }
      
      if (filterProduct === undefined || filterProduct.length === 0) {
        const newProductCart = {
          id: v4(),
          cart: user.cart,
          productId: product.id,
          quantity: quantity,
          price: quantity * product.unit_value,
          createdOn: new Date(),
          updatedOn: new Date(),
        };

        const productCart = productCartRepository.create(newProductCart);

        await productCartRepository.save(productCart);

        userFind.cart.products.push(productCart);

        const cartToUpdate = await cartRepository.findCartById(
          userFind.cart.id
        );

        if (cartToUpdate) {
          cartToUpdate.products.push(productCart);

          await cartRepository.save(cartToUpdate);
        }
      } else {
        const indexProduct = userFind.cart.products.indexOf(filterProduct[0]);
        
        filterProduct[0] = {
          id: filterProduct[0].id,
          cart: filterProduct[0].cart,
          productId: filterProduct[0].productId,
          quantity: filterProduct[0].quantity + quantity,
          price: filterProduct[0].price + quantity * product.unit_value,
          createdOn: filterProduct[0].createdOn,
          updatedOn: filterProduct[0].updatedOn,
        };

        await productCartRepository.save(filterProduct[0]);

        userFind.cart.products[indexProduct] = filterProduct[0];
      }
    }

    const productsOutput = userFind?.cart.products.map(
      (product) =>
        (product = {
          id: product?.id,
          productId: product?.productId,
          quantity: product?.quantity,
          price: product?.price,
          createdOn: product?.createdOn,
          updatedOn: product?.updatedOn,
          cart: null,
        })
    );

    const output = {
      id: userFind?.id,
      name: userFind?.name,
      email: userFind?.email,
      cart: {
        id: userFind?.cart.id,
        createdOn: userFind?.cart.createdOn,
        updatedOn: userFind?.cart.updatedOn,
        products: productsOutput,
      },
    };

    return output;
  } catch (error) {
    throw new AppError((error as any).message, 400);
  }
};

export const cartById = async (id: string, user: DataUser) => {
  const cartRepository = getCustomRepository(CartRepository);

  try {
    if (!user.cart.id) {
      if (user.isAdm !== true && user.cart.id !== id) {
        return "Unauthorized";
      }
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

export const removeProductFromCart = async (
  productId: string,
  quantity: number
) => {
  const productCartRepository = getCustomRepository(ProductCartRepository);

  try {
    let product = await productCartRepository.findProductFromCart(productId);

    if (product) {
      if (product.quantity > quantity) {
        const updatedQuantity = product.quantity - quantity;
        product = { ...product, quantity: updatedQuantity };

        await productCartRepository.save(product);

        return product;
      } else {
        return await productCartRepository.deleteProductCart(
          productId
        );
      }
    }
  } catch (error) {
    throw new AppError((error as any).message, 400);
  }
};
