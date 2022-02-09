import { Cart } from "./ICart";

export interface DataUser {
    id: string
    name: string
    email: string
    isAdm: boolean
    password_hash: string
    cart: Cart
    createdOn: Date
    updatedOn: Date
}

export interface UserBodySignUp {
    name: string
    email: string
    password: string
    isAdm: boolean
}

export interface UserLoginData {
    email: string,
    password: string
}