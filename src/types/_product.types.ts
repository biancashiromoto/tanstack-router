import type { RouterContext } from "@/routes/__root";
import type { IProduct } from "@/types";

export interface ILoaderData {
  products: IProduct[];
  category: IProduct["category"];
  selectedProduct: IProduct | undefined;
};

export type LoaderParams = {
  params: {
    category: IProduct["category"];
    productId?: IProduct["id"];
  };
  context: RouterContext | undefined;
};