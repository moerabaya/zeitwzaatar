declare global {}

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
