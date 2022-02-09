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

}

export default ProductCartRepository;