import { Box, Typography } from "@mui/material";
import Price from "../Price";
import { useLoaderData } from "@tanstack/react-router";
import Reviews from "../Reviews";
import type { IProduct } from "@/types";

const Info = () => {
  const product = useLoaderData({
    from: "/_product/$category/$productId",
  }) as IProduct;

  return (
    <Box
      sx={{
        py: 1,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        gridRow: 1,
        gridColumn: 2,
      }}
    >
      <Price />
      <Typography className="product-description">
        {product.description}
      </Typography>
      {product.brand && (
        <Typography className="product-brand">
          Brand: {product.brand}
        </Typography>
      )}
      <Reviews />
    </Box>
  );
};

export default Info;
