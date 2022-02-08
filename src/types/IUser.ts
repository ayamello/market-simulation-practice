export interface DataUser {
    id: string
    name: string
    email: string
    isAdm: boolean
    password_hash: string
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