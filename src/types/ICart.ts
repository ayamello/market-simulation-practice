import { IProductCart } from "./IProductCart";

export interface ICart {
    id: string
    products: IProductCart[]
    createdOn: Date
    updatedOn: Date
}

export interface INewProduct {
    product_id: string
    quantity: number
}
