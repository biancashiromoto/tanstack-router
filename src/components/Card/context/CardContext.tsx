import { createContext, useContext } from "react";
import type { CardContextType } from "../index.types";
import type { CardProviderProps } from "./CardContext.types";

export const CardContext = createContext<CardContextType>({
  product: {} as CardContextType["product"],
  shouldShowDiscount: false,
});

export const CardProvider = ({
  product,
  shouldShowDiscount = false,
  children,
}: CardProviderProps) => {
  return (
    <CardContext.Provider value={{ product, shouldShowDiscount }}>
      {children}
    </CardContext.Provider>
  );
};

export const useCardContext = () => {
  const context = useContext(CardContext);
  return context;
};
