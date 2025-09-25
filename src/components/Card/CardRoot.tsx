import { useNavigate } from "@tanstack/react-router";
import { CardContext } from "./context/CardContext";
import type { ICardRootProps } from "./index.types";
import { Card as MUICard } from "@mui/material";

const CardRoot = ({
  product,
  shouldShowDiscount = false,
  children,
}: ICardRootProps) => {
  const navigate = useNavigate();
  const handleClick = () =>
    /**
     * Navigate com rota e parâmetros tipados
     */
    navigate({
      to: "/$category/$productId",
      params: { category: product.category, productId: product.id },
    });

  return (
    <CardContext.Provider value={{ product, shouldShowDiscount }}>
      <MUICard onClick={handleClick} sx={{ cursor: "pointer" }}>
        {children}
      </MUICard>
    </CardContext.Provider>
  );
};

export default CardRoot;
