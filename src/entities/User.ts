import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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

  @Column()
  createdOn: Date;

  @Column()
  updatedOn: Date;
}
