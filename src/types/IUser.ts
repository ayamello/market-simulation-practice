import { ICart } from "./ICart";

export interface DataUser {
    id: string
    name: string
    email: string
    isAdm: boolean
    password_hash: string
    cart: ICart
    createdOn: Date
    updatedOn: Date
    token: string | null | ""
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