import { createContext, useContext } from "react";
import type { ICardContext } from "../index.types";
import type { CardProviderProps } from "./CardContext.types";

export const CardContext = createContext<ICardContext>({
  product: {} as ICardContext["product"],
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
