export interface ICart {
    id: string
    products: []
    createdOn: Date
    updatedOn: Date
}

export interface INewProduct {
    product_id: string
    quantity: number
}
