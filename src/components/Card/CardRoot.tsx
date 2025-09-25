import { Card as MUICard } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { CardContext } from "./context/CardContext";
import type { ICardRootProps } from "./index.types";

const CardRoot = ({
  product,
  shouldShowDiscount = false,
  children,
}: ICardRootProps) => {
  return (
    <CardContext.Provider value={{ product, shouldShowDiscount }}>
      <Link
        to="/$category/$productId"
        params={{ category: product.category, productId: product.id }}
        style={{ textDecoration: "none" }}
        preload="intent"
        preloadDelay={200}
      >
        <MUICard sx={{ cursor: "pointer" }}>{children}</MUICard>
      </Link>
    </CardContext.Provider>
  );
};

export default CardRoot;
