import { Currency } from "../enums/products";

interface Product {
  _id: string;
  name: string;
  price: number;
  expiration: string;
  [Currency.AUD]: number;
  [Currency.COP]: number;
  [Currency.CAD]: number;
  [Currency.EUR]: number;
  [Currency.KRW]: number;
}

export type { Product };
