import { EntityRepository, Repository } from "typeorm";
import Cart from "../entities/Cart";

@EntityRepository(Cart)
class CartRepository extends Repository<Cart> {
    public async getCarts(): Promise<Cart[] | undefined> {
        const carts = await this.find();

        return carts;
    }
    
    public async findCartById(id: string): Promise<Cart | undefined> {
        const cart = await this.findOne({ id });
      
        return cart;
    }

}

export default CartRepository;