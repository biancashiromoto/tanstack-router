import { useNavigate } from "@tanstack/react-router";
import { CardContext } from "./context/CardContext";
import type { CardRootProps } from "./index.types";
import { Card as MUICard } from "@mui/material";

const CardRoot = ({
  product,
  shouldShowDiscount = false,
  children,
}: CardRootProps) => {
  const navigate = useNavigate();
  const handleClick = () =>
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
