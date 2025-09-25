import type { RouterContext } from "@/routes/__root";
import type { IProduct } from "@/types";

export interface ILoaderData extends RouterContext {
  products: IProduct[];
  category: IProduct["category"];
};

export type LoaderParams = {
  params: {
    category: IProduct["category"];
    productId?: IProduct["id"];
  };
  context: RouterContext | undefined;
};