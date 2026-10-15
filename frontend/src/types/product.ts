import type { Brand } from "./brand";
import type { Category } from "./category";
import type { Meta } from "./common";
import type { Stock } from "./stock";
import type { User } from "./user";

export type Product = {
  id: string;
  name: string;
  brands?: Brand[];
  barcode?: string | null;
  quantity: number;
  dlc: string | null;
  category: Category
  stock?: Stock
  createdAt: string;
  createdBy?: User | null
  updatedAt: string;
  updatedBy?: User | null
};

export type Products = {
  data: Product[];
  meta: Meta;
};

export type ScannedProduct = {
  barcode: string
  name: string
  brands: string[]
  image?: string
}