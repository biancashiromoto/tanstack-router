import type { Product } from "@/types";
import CardBody from "./CardBody";
import CardDiscount from "./CardDiscount";
import CardImage from "./CardImage";
import CardPrice from "./CardPrice";
import CardTitle from "./CardTitle";
import Root from "./Root";
import { Box, Typography } from "@mui/material";
import Rating from "../Rating";

export interface CustomCardProps {
  product: Product;
  shouldShowDiscount?: boolean;
}

export default function CustomCard({
  product,
  shouldShowDiscount,
}: CustomCardProps) {
  return (
    <Root product={product}>
      <CardImage src={product.images[0]} alt={product.title} />
      <CardBody>
        <CardTitle title={product.title} />
        {shouldShowDiscount ? (
          <CardDiscount
            price={product.price}
            discountPercentage={product.discountPercentage ?? 0}
          />
        ) : (
          <CardPrice price={product.price} />
        )}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Rating value={product.rating ?? 0} />
          <Typography variant="body2" color="text.secondary" noWrap>
            {product.rating} / 5
          </Typography>
        </Box>
      </CardBody>
    </Root>
  );
}
