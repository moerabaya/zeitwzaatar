// TODO: Replace with graphql-codegen

export enum Soldout {
  SOLDOUT,
  ONSALE,
}

type Store = string

export interface Product {
  id: string
  name: string
  description: string
  price: number
  soldout: Soldout
  stores: Store[]
  categories: [CategoryInput]
}

export interface User {
  id: string
  firstname: string
  lastname: string
  username: string
  email: string
  password: string
  avatar?: string
}

export interface LoginInput {
  email: string
  password: string
}
export interface ForgotPassword {
  email: string
  password: string
  newPassword: string
}

export interface CartInput {
  id: string
  quantity: number
}

export interface CategoryInput {
  id: string
  name: string
}

export type Status = 'pending' | 'cancelled' | 'completed'

export interface ProductOrder {
  id: string
  quantity: number
}

export interface OrderInput {
  products: ProductOrder[]
  shippingAddress: string
}

export interface Order {
  user: string
  products: Product[]
  totalAmount: string
  shippingAddress: string
}
