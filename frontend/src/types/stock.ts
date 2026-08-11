import type { float } from "@zxing/library/esm/customTypings";
import type { Meta } from "./common";
import type { Product } from "./product";
import type { User } from "./user";

export type Stock = {
  id: number;
  product?: Product;
  quantity: float;
  createdAt: string;
  createdBy: User;
  updatedAt: string;
  updatedBy: User;
};

export type Stocks = {
  data: Stock[];
  meta: Meta;
};

