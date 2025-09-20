import type { Product } from "@/types";
import { Card } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";

interface RootProps {
  children: React.ReactNode;
  product?: Product;
}

const Root = ({ children, product }: RootProps) => {
  const navigate = useNavigate();

  if (!product) return null;

  const handleClick = () => {
    navigate({
      to: "/$category/$productId",
      params: {
        category: product.category,
        productId: String(product.id),
      },
      replace: false,
    });
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        width: "100%",
        height: "100%",
        cursor: "pointer",
        textDecoration: "none",
      }}
    >
      {children}
    </Card>
  );
};

export default Root;
