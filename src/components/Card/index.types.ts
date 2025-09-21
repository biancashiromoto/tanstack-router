import type { Product } from "@/types";

export interface CardContextType {
  product: Product;
  shouldShowDiscount: boolean;
}

export interface CardRootProps {
  product: Product;
  shouldShowDiscount: boolean;
  children: React.ReactNode;
}

export interface CardContentProps {
  children: React.ReactNode;
}