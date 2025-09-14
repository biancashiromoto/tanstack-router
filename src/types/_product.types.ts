import type { Product } from "@/types";
import type { QueryClient } from "@tanstack/react-query";

export type LoaderData = {
  products: Product[];
  category: Product["category"];
  selectedProduct?: Product | null;
};

export type LoaderParams = {
  params: {
    category: Product["category"];
    productId?: Product["id"];
  };
  context: {
    queryClient?: QueryClient | undefined;
  }
};