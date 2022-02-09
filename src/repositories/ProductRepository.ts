import { EntityRepository, Repository } from "typeorm";
import Product from './../entities/Product';

@EntityRepository(Product) 
class ProductRepository extends Repository<Product> {
    public async getProducts(): Promise<Product[] | undefined> {
        const products = await this.find();

        return products;
    }

    public async findProductbyId(id: string): Promise<Product | undefined> {
        const product = await this.findOne({ id });
      
        return product;
    }

    public async productAlreadyExists(name: string): Promise<Product | undefined> {
        const product = await this.findOne({ name });

        if(product) {
            return product;
        }

        return product;
    }
}

export default ProductRepository;