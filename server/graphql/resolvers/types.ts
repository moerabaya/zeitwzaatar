// TODO: Replace with graphql-codegen

export enum Soldout {
  SOLDOUT,
  ONSALE,
}

type Store = string;

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  soldout: Soldout;
  stores: Store[];
  categories: [CategoryInput];
};

export type User = {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  avatar?: string;
};

export type LoginInput = {
  email: string;
  password: string;
};
export type ForgotPassword = {
  email: string;
  password: string;
  newPassword: string;
};

export type CartInput = {
  id: string;
  quantity: number;
};

export type CategoryInput = {
  id: string;
  name: string;
};

export type Status = "pending" | "cancelled" | "completed";

export type ProductOrder = {
  id: string;
  quantity: number;
};

export type OrderInput = {
  products: ProductOrder[];
  shippingAddress: string;
};

export type Order = {
  user: string;
  products: Product[];
  totalAmount: string;
  shippingAddress: string;
};
