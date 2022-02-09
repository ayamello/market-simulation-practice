export interface Product {
    id: string
    name: string
    unit_value: number
    quantity: number 
    createdOn: Date
    updatedOn: Date
}

export interface BodyProductRegister {
    name: string
    unit_value: number 
    quantity: number
}