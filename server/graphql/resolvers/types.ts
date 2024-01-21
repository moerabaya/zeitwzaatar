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
