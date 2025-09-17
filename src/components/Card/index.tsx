import type { Product } from "@/types";
import CardBody from "./CardBody";
import CardDiscount from "./CardDiscount";
import CardImage from "./CardImage";
import CardPrice from "./CardPrice";
import CardTitle from "./CardTitle";
import Root from "./Root";

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
            showDiscount={shouldShowDiscount}
          />
        ) : (
          <CardPrice price={product.price} />
        )}
      </CardBody>
    </Root>
  );
}
