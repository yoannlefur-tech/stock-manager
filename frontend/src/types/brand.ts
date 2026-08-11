import type { Meta } from "./common";

export type Brand = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type Brands = {
  data: Brand[];
  meta: Meta;
};
