import type { Product } from "@/types";
import { Card } from "@mui/material";
import { Link } from "@tanstack/react-router";

interface RootProps {
  children: React.ReactNode;
  product?: Product;
}

const Root = ({ children, product }: RootProps) => {
  if (!product) return null;

  return (
    <Link
      to="/$category/$productId"
      params={{
        category: product.category,
        productId: String(product.id),
      }}
      style={{ textDecoration: "none" }}
      preloadDelay={500}
    >
      <Card
        sx={{
          width: "100%",
          height: "100%",
          cursor: "pointer",
        }}
      >
        {children}
      </Card>
    </Link>
  );
};

export default Root;
