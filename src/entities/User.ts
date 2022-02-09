import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import Cart from "./Cart";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  isAdm: boolean;

  @OneToOne(type => Cart) @JoinColumn()
  cart: Cart

  @Column()
  createdOn: Date;

  @Column()
  updatedOn: Date;
}
