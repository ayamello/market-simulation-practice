import Product_Cart from './Product_Cart';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity("carts")
export default class Cart {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @OneToMany(type => Product_Cart, product => product.cart, { onDelete: 'CASCADE' })
    products: Product_Cart[]

    @Column()
    createdOn: Date;

    @Column()
    updatedOn: Date;
}
