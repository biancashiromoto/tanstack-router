import type { IProduct } from "@/types";
import type { QueryClient } from "@tanstack/react-query";

export type LoaderData = {
  products: IProduct[];
  category: IProduct["category"];
  selectedProduct?: IProduct | null;
};

export type LoaderParams = {
  params: {
    category: IProduct["category"];
    productId?: IProduct["id"];
  };
  context: {
    queryClient?: QueryClient | undefined;
  }
};