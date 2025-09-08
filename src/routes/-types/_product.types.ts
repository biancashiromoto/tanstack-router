import type { Product } from "@/types";

export type LoaderData = {
  products: {
    products: Product[];
  };
  category: Product["category"];
};

export type LoaderParams = {
  params: {
    category: Product["category"];
  };
};