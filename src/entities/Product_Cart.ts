import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Cart from "./Cart";

@Entity("products_cart")
export default class Product_Cart {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(type => Cart, cart => cart.products, { onDelete: 'CASCADE' })
    cart: Cart

    @Column()
    product_id: string;

    @Column()
    quantity: number;

    @Column("float")
    price: number;

    @Column()
    createdOn: Date;

    @Column()
    updatedOn: Date;
}
