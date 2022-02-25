import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Product_Cart from "./Product_Cart";

@Entity("products")
export default class Product {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    name: string;
    
    @Column("float")
    unit_value: number;

    @Column()
    quantity: number;

    @Column()
    createdOn: Date;

    @Column()
    updatedOn: Date;
}
