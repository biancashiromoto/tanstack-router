import type { ICardContext } from "../index.types";

export interface CardProviderProps {
  product: ICardContext["product"];
  shouldShowDiscount?: boolean;
  children: React.ReactNode;
}