import { EntityRepository, Repository } from "typeorm";
import Product_Cart from "../entities/Product_Cart";

@EntityRepository(Product_Cart)
class ProductCartRepository extends Repository<Product_Cart> {
    public async getCarts(): Promise<Product_Cart[] | undefined> {
        const carts = await this.find();

        return carts;
    }
    
    public async findProductCartById(id: string): Promise<Product_Cart | undefined> {
        const cart = await this.findOne({ id });
      
        return cart;
    }

    public async findProductFromCart(productId: string): Promise<Product_Cart | undefined> {
        const product = await this.findOne({ where: { productId } });
      
        return product;
    }

    public async deleteProductCart(productId: string): Promise<string | undefined> {
        const productCart = await this.findOne({ select: ["id"], where: { productId } });
    
        if(productCart){
            this.remove(productCart);
            return "Deleted product";
        }
        else {
            return "Product not found!"
        }
    }

}

export default ProductCartRepository;