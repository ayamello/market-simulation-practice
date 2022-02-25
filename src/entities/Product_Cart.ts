import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import Cart from "./Cart";
import Product from "./Product";

@Entity("products_cart")
export default class Product_Cart {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(type => Cart, cart => cart.products, { onDelete: 'CASCADE' })
    cart: Cart | null

    @Column()
    productId: string;

    @Column()
    quantity: number;

    @Column("float")
    price: number;

    @Column()
    createdOn: Date;

    @Column()
    updatedOn: Date;
}
