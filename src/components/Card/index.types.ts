import type { IProduct } from "@/types";

export interface ICardContext {
  product: IProduct;
  shouldShowDiscount: boolean;
}

export interface ICardRootProps {
  product: IProduct;
  shouldShowDiscount: boolean;
  children: React.ReactNode;
}

export interface ICardContentProps {
  children: React.ReactNode;
}