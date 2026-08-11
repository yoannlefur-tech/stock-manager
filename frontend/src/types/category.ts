import type { Meta } from "./common";

export type Category = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type Categories = {
  data: Category[];
  meta: Meta;
};

