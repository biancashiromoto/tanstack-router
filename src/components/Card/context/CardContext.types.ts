import type { CardContextType } from "../index.types";

export interface CardProviderProps {
  product: CardContextType["product"];
  shouldShowDiscount?: boolean;
  children: React.ReactNode;
}